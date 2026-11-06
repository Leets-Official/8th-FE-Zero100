// Swagger components.schemas.Inquiry (GET·POST /api/inquiries)
export interface Inquiry {
  id: string;
  user_id: string;
  title: string;
  name: string;
  email: string;
  content: string;
  // 예: '2026년 3월 25일 17:11'
  created_at: string;
}

// POST /api/inquiries
export interface CreateInquiryRequest {
  title: string;
  name: string;
  email: string;
  content: string;
}

// API 연동 전 문의 화면이 사용하는 Mock·localStorage 문의 (mocks/dashboard/inquiries.ts)
export interface MockInquiry {
  id: number;
  title: string;
  createdAt: string;
  name: string;
  email: string;
  content: string;
}

// 문의 등록 폼에서 입력받는 값. id와 createdAt은 등록 시 발급
export type NewMockInquiry = Omit<MockInquiry, 'id' | 'createdAt'>;
