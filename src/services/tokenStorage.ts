// Swagger의 bearerAuth(JWT) 인증에 쓰는 accessToken 저장소
// 로그인 응답(data.accessToken)을 저장하고, axiosInstance가 요청마다 읽어 Authorization 헤더에 담는다.
const STORAGE_KEY = 'accessToken';

export function loadAccessToken(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function saveAccessToken(token: string) {
  try {
    localStorage.setItem(STORAGE_KEY, token);
  } catch {
    // 저장 실패는 무시함
  }
}

// 다른 탭에서 토큰을 저장·삭제했을 때 발생한 storage 이벤트인지 확인 (key가 null이면 저장소 전체 삭제)
export function isAccessTokenStorageEvent(event: StorageEvent): boolean {
  return event.key === null || event.key === STORAGE_KEY;
}

export function removeAccessToken() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // 삭제 실패는 무시함
  }
}
