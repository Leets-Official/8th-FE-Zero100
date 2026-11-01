import axios from 'axios';

export const inquiryClient = axios.create({
  baseURL: import.meta.env.VITE_INQUIRY_API_BASE_URL || '/api',
  timeout: 10000,
});

export function inquiryErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 404)
      return '문의를 찾을 수 없습니다. 이미 삭제되었을 수 있습니다.';
    if (!error.response)
      return '문의 서버에 연결할 수 없습니다. 연결 상태를 확인하고 다시 시도해 주세요.';
    return '문의 요청을 처리하지 못했습니다. 잠시 후 다시 시도해 주세요.';
  }
  return error instanceof Error ? error.message : '문의를 불러오지 못했습니다.';
}
