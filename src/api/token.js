const TOKEN_KEY = 'accessToken';

export function getToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setToken(token) {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch {
    // 저장소를 쓸 수 없는 환경에서는 저장하지 않음
  }
}

export function removeToken() {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // 저장소를 쓸 수 없는 환경에서는 지울 것도 없음
  }
}
