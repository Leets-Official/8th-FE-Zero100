// 응답 지연·순서 역전을 재현해 오래된 응답이 최신 상태를 덮어쓰지 않는지 확인한다.
// 실행: npm test (Node 내장 테스트 러너, 별도 라이브러리 없음)
import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { createRequestSequencer } from '../src/utils/requestSequencer.ts';

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T) => void;
  reject: (reason: unknown) => void;
}

// 응답 도착 시점을 테스트에서 직접 정하기 위한 지연 응답
function deferred<T>(): Deferred<T> {
  let resolve!: (value: T) => void;
  let reject!: (reason: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

interface TestUser {
  id: string;
  name: string;
}

// AuthProvider의 refreshUser·updateName·login·logout과 같은 규칙(세션 검사 + 요청 순서 검사)으로
// user를 갱신하는 테스트용 저장소. API 응답은 deferred로 대신한다.
function createUserStore(initialUser: TestUser | null) {
  let user = initialUser;
  let sessionId = 0;
  const requests = createRequestSequencer();

  return {
    getUser: () => user,
    login(nextUser: TestUser) {
      sessionId += 1;
      user = nextUser;
    },
    logout() {
      sessionId += 1;
      user = null;
    },
    async refresh(response: Promise<TestUser>) {
      const startedSessionId = sessionId;
      const ticket = requests.startRead();
      const me = await response;
      if (startedSessionId === sessionId && ticket.commit()) user = me;
    },
    async update(response: Promise<TestUser>) {
      const startedSessionId = sessionId;
      const ticket = requests.startWrite();
      const updated = await response;
      if (startedSessionId === sessionId && ticket.commit()) user = updated;
    },
  };
}

const OLD = { id: 'a', name: '이전이름' };
const NEW = { id: 'a', name: '새이름' };

describe('사용자 정보 조회·수정 순서 역전', () => {
  test('조회 중 이름 수정 성공 후 이전 조회 응답이 도착해도 수정 결과를 유지한다 (리뷰 시나리오)', async () => {
    const store = createUserStore(OLD);
    const get = deferred<TestUser>();
    const patch = deferred<TestUser>();

    const refreshing = store.refresh(get.promise);
    const updating = store.update(patch.promise);

    patch.resolve(NEW);
    await updating;
    assert.equal(store.getUser()?.name, '새이름');

    get.resolve(OLD);
    await refreshing;
    assert.equal(store.getUser()?.name, '새이름');
  });

  test('조회 응답이 수정 응답보다 먼저 와도 최종 값은 수정 결과다', async () => {
    const store = createUserStore(OLD);
    const get = deferred<TestUser>();
    const patch = deferred<TestUser>();

    const refreshing = store.refresh(get.promise);
    const updating = store.update(patch.promise);

    get.resolve(OLD);
    await refreshing;
    patch.resolve(NEW);
    await updating;
    assert.equal(store.getUser()?.name, '새이름');
  });

  test('수정 요청 뒤에 시작한 조회가 먼저 반영돼도 수정 성공 응답이 우선한다', async () => {
    const store = createUserStore(OLD);
    const patch = deferred<TestUser>();
    const get = deferred<TestUser>();

    const updating = store.update(patch.promise);
    // 서버가 조회를 수정보다 먼저 처리해 이전 이름을 돌려준 경우
    const refreshing = store.refresh(get.promise);

    get.resolve(OLD);
    await refreshing;
    patch.resolve(NEW);
    await updating;
    assert.equal(store.getUser()?.name, '새이름');
  });

  test('수정 실패 시에는 진행 중이던 조회 응답을 그대로 반영한다', async () => {
    const store = createUserStore(OLD);
    const get = deferred<TestUser>();
    const patch = deferred<TestUser>();

    const refreshing = store.refresh(get.promise);
    const updating = store.update(patch.promise);

    patch.reject(new Error('400'));
    await assert.rejects(updating);
    get.resolve({ id: 'a', name: '서버값' });
    await refreshing;
    assert.equal(store.getUser()?.name, '서버값');
  });

  test('수정 반영 이후에 시작한 조회는 정상 반영된다', async () => {
    const store = createUserStore(OLD);
    const patch = deferred<TestUser>();
    const updating = store.update(patch.promise);
    patch.resolve(NEW);
    await updating;

    const get = deferred<TestUser>();
    const refreshing = store.refresh(get.promise);
    get.resolve({ id: 'a', name: '다른기기수정' });
    await refreshing;
    assert.equal(store.getUser()?.name, '다른기기수정');
  });

  test('나중에 시작한 조회가 먼저 반영되면 먼저 시작한 조회의 늦은 응답은 버린다', async () => {
    const store = createUserStore(OLD);
    const first = deferred<TestUser>();
    const second = deferred<TestUser>();

    const firstRefresh = store.refresh(first.promise);
    const secondRefresh = store.refresh(second.promise);

    second.resolve(NEW);
    await secondRefresh;
    first.resolve(OLD);
    await firstRefresh;
    assert.equal(store.getUser()?.name, '새이름');
  });

  test('수정 요청이 연속으로 발생하면 마지막에 요청한 값만 남는다', async () => {
    const store = createUserStore(OLD);
    const firstPatch = deferred<TestUser>();
    const secondPatch = deferred<TestUser>();

    const first = store.update(firstPatch.promise);
    const second = store.update(secondPatch.promise);

    secondPatch.resolve({ id: 'a', name: '두번째' });
    await second;
    firstPatch.resolve({ id: 'a', name: '첫번째' });
    await first;
    assert.equal(store.getUser()?.name, '두번째');
  });
});

describe('세션 전환 중 늦게 도착한 응답', () => {
  test('로그인 직후 로그아웃하면 이전 내 정보 조회 응답을 반영하지 않는다', async () => {
    const store = createUserStore(null);
    store.login(OLD);
    const get = deferred<TestUser>();
    const refreshing = store.refresh(get.promise);

    store.logout();
    get.resolve(OLD);
    await refreshing;
    assert.equal(store.getUser(), null);
  });

  test('A 로그아웃 후 B 로그인하면 A의 늦은 조회·수정 응답을 반영하지 않는다', async () => {
    const store = createUserStore(null);
    store.login({ id: 'a', name: 'A' });
    const getA = deferred<TestUser>();
    const patchA = deferred<TestUser>();
    const refreshingA = store.refresh(getA.promise);
    const updatingA = store.update(patchA.promise);

    store.logout();
    store.login({ id: 'b', name: 'B' });

    getA.resolve({ id: 'a', name: 'A' });
    patchA.resolve({ id: 'a', name: 'A수정' });
    await Promise.all([refreshingA, updatingA]);
    assert.deepEqual(store.getUser(), { id: 'b', name: 'B' });
  });
});
