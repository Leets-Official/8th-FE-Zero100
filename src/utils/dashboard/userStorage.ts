import { MOCK_USER } from '../../mocks/dashboard/user.ts';
import type { MockUser } from '../../types/user.ts';
import { isRecord } from '../typeGuards.ts';

const STORAGE_KEY = 'user';

function getStringOrDefault(value: unknown, defaultValue: string): string {
  return typeof value === 'string' ? value : defaultValue;
}

// 저장된 값이 없거나 올바른 사용자 정보가 아니면 Mock 데이터로 시작
export function loadUser(): MockUser {
  try {
    const savedValue = localStorage.getItem(STORAGE_KEY);
    const savedUser: unknown = savedValue === null ? null : JSON.parse(savedValue);
    if (!isRecord(savedUser) || typeof savedUser.name !== 'string' || !savedUser.name) {
      return MOCK_USER;
    }

    return {
      name: savedUser.name,
      email: getStringOrDefault(savedUser.email, MOCK_USER.email),
      joinedAt: getStringOrDefault(savedUser.joinedAt, MOCK_USER.joinedAt),
    };
  } catch {
    return MOCK_USER;
  }
}

// 저장 공간 부족 등으로 저장에 실패해도 앱은 현재 state로 계속 동작
export function saveUser(user: MockUser) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // 저장 실패는 무시함
  }
}
