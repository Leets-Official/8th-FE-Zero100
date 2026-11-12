const ACCESS_TOKEN_KEY = 'zero100-access-token';

/** 로그인 후 받은 accessToken을 꺼낸다. 저장소를 못 쓰는 환경이면 로그인 안 한 상태로 본다. */
export const getAccessToken = () => {
  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  } catch {
    return null;
  }
};

/** 토큰을 저장하고 성공 여부를 돌려준다. 저장이 막힌 환경이면 false라서 로그인 화면이 안내를 보여준다. */
export const saveAccessToken = (accessToken) => {
  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    return true;
  } catch {
    return false;
  }
};

/** 토큰을 저장하지 못했을 때 로그인 화면에 보여줄 안내 */
export const TOKEN_SAVE_ERROR =
  '브라우저 저장소를 사용할 수 없어 로그인 상태를 유지할 수 없어요. 시크릿 모드나 쿠키·사이트 데이터 차단 설정을 확인해 주세요.';

export const removeAccessToken = () => {
  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  } catch {
    // 지울 수 없어도 화면은 로그인 페이지로 이동하므로 조용히 넘어간다.
  }
};
