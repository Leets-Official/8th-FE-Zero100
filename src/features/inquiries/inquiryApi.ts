import type { ApiSuccessResponse } from '../../types/api.ts';
import type {
  CreateInquiryRequest,
  CreateInquiryResponse,
  DeleteInquiryResponse,
  Inquiry,
  InquiryListResponse,
} from './types.ts';
import { isRecord } from '../../utils/typeGuards.ts';
import axiosInstance, { unwrapData } from '../../services/axiosInstance.ts';

// 문의 API (모두 인증 필요). Swagger에 문의 상세 조회·수정 API는 없다.

const INVALID_LIST_MESSAGE = '문의 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.';

// 서버 응답은 구조를 보장할 수 없어 화면에서 쓰는 필드가 모두 있는지 확인
function isInquiry(value: unknown): value is Inquiry {
  return (
    isRecord(value) &&
    typeof value.id === 'string' &&
    typeof value.user_id === 'string' &&
    typeof value.title === 'string' &&
    typeof value.name === 'string' &&
    typeof value.email === 'string' &&
    typeof value.content === 'string' &&
    typeof value.created_at === 'string'
  );
}

// 문의 목록 조회 (최신순). 형식이 맞지 않는 항목은 화면 오류를 막기 위해 제외
// signal로 요청을 취소할 수 있다.
export function fetchInquiries(signal?: AbortSignal): Promise<InquiryListResponse> {
  return axiosInstance
    .get<ApiSuccessResponse<unknown>>('/api/inquiries', { signal })
    .then(unwrapData)
    .then((data) => {
      if (!Array.isArray(data)) throw new Error(INVALID_LIST_MESSAGE);
      return data.filter(isInquiry);
    });
}

// 문의 등록
export function createInquiry({
  title,
  name,
  email,
  content,
}: CreateInquiryRequest): Promise<CreateInquiryResponse> {
  return axiosInstance
    .post<ApiSuccessResponse<CreateInquiryResponse>>('/api/inquiries', {
      title,
      name,
      email,
      content,
    })
    .then(unwrapData);
}

// 문의 삭제 (본인 문의만, 아니면 403)
export function deleteInquiry(id: Inquiry['id']): Promise<DeleteInquiryResponse> {
  return axiosInstance
    .delete<ApiSuccessResponse<DeleteInquiryResponse>>(`/api/inquiries/${encodeURIComponent(id)}`)
    .then(unwrapData);
}
