/**
 * axios 에러에서 화면에 보여줄 문구를 꺼낸다.
 * 서버는 실패하면 { error: "메시지" }를 보내고, 응답 자체가 없으면 네트워크 문제로 본다.
 */
export const getErrorMessage = (
  error,
  fallbackMessage = '요청을 처리하지 못했어요. 잠시 후 다시 시도해 주세요.',
) => {
  if (!error.response) return '서버에 연결하지 못했어요. 인터넷 연결을 확인해 주세요.';
  return error.response.data?.error || fallbackMessage;
};
