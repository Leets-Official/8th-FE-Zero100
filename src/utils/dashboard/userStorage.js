import { MOCK_USER } from '../../mocks/dashboard/user.js';

const STORAGE_KEY = 'user';

// 저장된 값이 없거나 올바른 사용자 정보가 아니면 Mock 데이터로 시작
export function loadUser() {
  try {
    const savedUser = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return savedUser?.name ? { ...MOCK_USER, ...savedUser } : MOCK_USER;
  } catch {
    return MOCK_USER;
  }
}

// 저장 공간 부족 등으로 저장에 실패해도 앱은 현재 state로 계속 동작
export function saveUser(user) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  } catch {
    // 저장 실패는 무시함
  }
}
