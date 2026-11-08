export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'https://leetszero100-fe.kro.kr'
).replace(/\/$/, '');

export async function apiRequest(path, { token, body, ...options } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers: {
        ...(body ? { 'Content-Type': 'application/json' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error('서버에 연결하지 못했습니다. 잠시 후 다시 시도해주세요.');
  }
  const result = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(result?.error || '요청 처리에 실패했습니다. 다시 시도해주세요.');
    error.status = response.status;
    error.kakaoId = result?.kakaoId;
    throw error;
  }
  if (!result || !('data' in result)) throw new Error('서버 응답을 확인할 수 없습니다.');
  return result.data;
}
