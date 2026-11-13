import { useRequest } from '../../hooks/useRequest.ts';
import { fetchInquiries } from './inquiryApi.ts';
import type { Inquiry } from './types.ts';

const EMPTY_INQUIRIES: Inquiry[] = [];

// 서버의 문의 목록을 조회한다.
// 목록·상세·대시보드가 각각 마운트될 때 조회하므로 등록·삭제 후 이동하면 항상 최신 데이터를 받는다.
export function useInquiries() {
  const { data, isLoading, errorMessage, reload } = useRequest(fetchInquiries);

  return { inquiries: data ?? EMPTY_INQUIRIES, isLoading, errorMessage, reload };
}
