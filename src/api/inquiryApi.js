import { axiosInstance } from './axiosInstance';

/** 문의 목록 (최신순): [{ id, user_id, title, name, email, content, created_at }] */
export const getInquiries = async () => {
  const response = await axiosInstance.get('/inquiries');
  return response.data.data;
};
