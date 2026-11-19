import axiosInstance from './axiosInstance';

// 문의 목록 조회 (최신순)
// 항목: { id(uuid), user_id, title, name, email, content, created_at }
export const getInquiries = async () => {
  const response = await axiosInstance.get('/api/inquiries');
  return response.data.data;
};

// 문의 등록 (title, name, email, content 모두 필수)
export const createInquiry = async ({ title, name, email, content }) => {
  const response = await axiosInstance.post('/api/inquiries', { title, name, email, content });
  return response.data.data;
};

// 문의 삭제 (본인 문의만 가능, 아니면 403)
export const deleteInquiry = async (id) => {
  const response = await axiosInstance.delete(`/api/inquiries/${id}`);
  return response.data.data;
};
