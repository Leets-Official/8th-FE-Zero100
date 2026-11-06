import axiosInstance from './axiosInstance.js';

// 문의 API (모두 인증 필요). 문의 객체: { id, user_id, title, name, email, content, created_at }
// Swagger에 문의 상세 조회 API는 없다.

// 문의 목록 조회 (최신순)
export function fetchInquiries() {
  return axiosInstance.get('/api/inquiries');
}

// 문의 등록. 반환: 등록된 문의
export function createInquiry({ title, name, email, content }) {
  return axiosInstance.post('/api/inquiries', { title, name, email, content });
}

// 문의 삭제 (본인 문의만). 반환: { message }
export function deleteInquiry(id) {
  return axiosInstance.delete(`/api/inquiries/${id}`);
}
