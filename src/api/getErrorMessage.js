const DEFAULT_MESSAGE = '요청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';

// 서버는 실패 시 { error: "메시지" } 형식으로 응답합니다.
export const getErrorMessage = (error, fallback = DEFAULT_MESSAGE) => {
  const serverMessage = error?.response?.data?.error;

  if (typeof serverMessage === 'string' && serverMessage) return serverMessage;
  if (error?.code === 'ECONNABORTED') return '요청 시간이 초과되었습니다. 다시 시도해주세요.';
  if (!error?.response) return '서버에 연결할 수 없습니다. 네트워크를 확인해주세요.';

  return fallback;
};
