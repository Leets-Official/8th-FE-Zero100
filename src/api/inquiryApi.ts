import type { ApiSuccessResponse, MessageResponse } from '../types/api.ts';
import type { CreateInquiryRequest, Inquiry } from '../types/inquiry.ts';
import axiosInstance, { unwrapData } from './axiosInstance.ts';

// 문의 API (모두 인증 필요). Swagger에 문의 상세 조회 API는 없다.

// 문의 목록 조회 (최신순)
export function fetchInquiries(): Promise<Inquiry[]> {
  return axiosInstance.get<ApiSuccessResponse<Inquiry[]>>('/api/inquiries').then(unwrapData);
}

// 문의 등록
export function createInquiry({
  title,
  name,
  email,
  content,
}: CreateInquiryRequest): Promise<Inquiry> {
  return axiosInstance
    .post<ApiSuccessResponse<Inquiry>>('/api/inquiries', { title, name, email, content })
    .then(unwrapData);
}

// 문의 삭제 (본인 문의만)
export function deleteInquiry(id: string): Promise<MessageResponse> {
  return axiosInstance
    .delete<ApiSuccessResponse<MessageResponse>>(`/api/inquiries/${id}`)
    .then(unwrapData);
}
