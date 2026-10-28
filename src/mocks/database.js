import { hashPassword } from './password';

export const DATABASE_KEY = 'zero100-admin-demo-v1';
export const DEMO_EMAIL = 'demo@zero100.dev';
export const DEMO_PASSWORD = 'Demo1234!';

export class DemoApiError extends Error {
  constructor(message, status = 400, errors = {}) {
    super(message);
    this.status = status;
    this.errors = errors;
  }
}
async function createDatabase() {
  const credential = await hashPassword(DEMO_PASSWORD);
  const titles = [
    '서비스 이용 관련 문의드립니다',
    '결제 시스템에 대해 질문이 있습니다',
    '회원가입이 되지 않습니다',
    '대시보드 기능 개선 요청',
    'API 연동 방법 문의',
  ];
  return {
    version: 1,
    accounts: [
      {
        id: 'demo-user',
        name: '홍길동',
        email: DEMO_EMAIL,
        credential,
        createdAt: '2024-01-15T00:00:00.000Z',
      },
    ],
    sessions: {},
    inquiries: titles.map((title, index) => ({
      id: String(index + 1),
      userId: 'demo-user',
      name: '홍길동',
      email: DEMO_EMAIL,
      title,
      content:
        index === 0
          ? '안녕하세요. 서비스 이용 중 몇 가지 궁금한 사항이 있어 문의드립니다.\n\n1. API 연동 시 인증 방법은 어떻게 되나요?\n2. 데이터 백업 주기는 어떻게 되나요?\n3. 사용자 권한 관리는 어떻게 설정하나요?\n\n자세한 답변 부탁드립니다. 감사합니다.'
          : `${title}에 대한 안내를 부탁드립니다.\n확인 후 답변해 주시면 감사하겠습니다.`,
      createdAt: `2026-03-${25 - index}T08:11:00.000Z`,
    })),
  };
}
function isValidDatabase(data) {
  return (
    data?.version === 1 &&
    Array.isArray(data.accounts) &&
    Array.isArray(data.inquiries) &&
    data.sessions &&
    typeof data.sessions === 'object' &&
    !Array.isArray(data.sessions) &&
    data.accounts.every(
      (a) =>
        typeof a.id === 'string' &&
        typeof a.name === 'string' &&
        typeof a.email === 'string' &&
        /^[a-f0-9]{32}$/.test(a.credential?.salt) &&
        /^[a-f0-9]{64}$/.test(a.credential?.hash) &&
        !Number.isNaN(Date.parse(a.createdAt)),
    ) &&
    data.inquiries.every(
      (item) =>
        ['id', 'userId', 'name', 'email', 'title', 'content'].every(
          (key) => typeof item[key] === 'string',
        ) && !Number.isNaN(Date.parse(item.createdAt)),
    ) &&
    new Set(data.accounts.map((a) => a.id)).size === data.accounts.length &&
    new Set(data.inquiries.map((i) => i.id)).size === data.inquiries.length
  );
}
export async function readDatabase() {
  let saved;
  try {
    saved = localStorage.getItem(DATABASE_KEY);
  } catch {
    throw new DemoApiError('브라우저 저장소를 읽을 수 없습니다. 저장소 사용을 허용해 주세요.', 503);
  }
  if (saved === null) {
    const initial = await createDatabase();
    writeDatabase(initial);
    return initial;
  }
  try {
    const data = JSON.parse(saved);
    if (!isValidDatabase(data)) throw new Error('Invalid data');
    return data;
  } catch {
    throw new DemoApiError(
      '저장된 데모 데이터가 손상되었습니다. 기존 데이터는 덮어쓰지 않았습니다.',
      503,
    );
  }
}
export function writeDatabase(data) {
  try {
    localStorage.setItem(DATABASE_KEY, JSON.stringify(data));
  } catch {
    throw new DemoApiError(
      '브라우저에 저장하지 못했습니다. 저장 공간이나 브라우저 설정을 확인해 주세요.',
      503,
    );
  }
}
export function publicUser(account) {
  return { id: account.id, name: account.name, email: account.email, createdAt: account.createdAt };
}
