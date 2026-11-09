import api from './axios';
import { normalizeApiDate } from '../utils/normalizeApiDate';

export function normalizeInquiry(inquiry) {
  return {
    id: inquiry.id,
    userId: inquiry.user_id,
    title: inquiry.title,
    author: inquiry.name,
    email: inquiry.email,
    content: inquiry.content,
    createdAt: normalizeApiDate(inquiry.created_at),
  };
}

export async function getInquiries({ signal } = {}) {
  const response = await api.get('/api/inquiries', {
    signal,
  });

  const inquiries = response.data.data;

  if (!Array.isArray(inquiries)) {
    throw new Error('문의 목록 응답 형식이 올바르지 않습니다.');
  }

  return inquiries.map(normalizeInquiry);
}

export async function createInquiry({ name, email, title, content }) {
  const response = await api.post('/api/inquiries', {
    name: name.trim(),
    email: email.trim(),
    title: title.trim(),
    content: content.trim(),
  });

  return normalizeInquiry(response.data.data);
}
