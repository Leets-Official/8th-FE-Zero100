import type { MessageResponse } from '../../types/api.ts';

// Swagger components.schemas.Inquiry (GET·POST /api/inquiries)
// 답변·처리 상태 필드는 명세에 없다.
export interface Inquiry {
  // uuid
  id: string;
  // 작성자 id (uuid). 로그인 사용자 id와 비교해 내가 쓴 문의를 구분한다.
  user_id: string;
  title: string;
  name: string;
  email: string;
  content: string;
  // 서버가 표시용으로 만든 문자열. 예: '2026년 3월 25일 17:11'
  created_at: string;
}

// GET /api/inquiries 200의 data (최신순, 페이지네이션 없음)
export type InquiryListResponse = Inquiry[];

// POST /api/inquiries
// title 2~50자, name 2~20자, email 형식, 모두 필수
export interface CreateInquiryRequest {
  title: string;
  name: string;
  email: string;
  content: string;
}

// POST /api/inquiries 201의 data
export type CreateInquiryResponse = Inquiry;

// DELETE /api/inquiries/{id} 200의 data. 예: { message: '문의가 삭제되었습니다' }
export type DeleteInquiryResponse = MessageResponse;
