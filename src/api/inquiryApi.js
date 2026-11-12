import { axiosInstance } from './axiosInstance';

/** 문의 목록 (최신순): [{ id, user_id, title, name, email, content, created_at }] */
export const getInquiries = async () => {
  const response = await axiosInstance.get('/inquiries');
  return response.data.data;
};

/** 문의 등록: 성공하면 만들어진 문의를 돌려준다. */
export const createInquiry = async ({ title, name, email, content }) => {
  const response = await axiosInstance.post('/inquiries', { title, name, email, content });
  return response.data.data;
};

/** 문의 삭제: 본인이 쓴 문의만 지울 수 있다. (남의 문의면 403) */
export const deleteInquiry = async (inquiryId) => {
  await axiosInstance.delete(`/inquiries/${inquiryId}`);
};
