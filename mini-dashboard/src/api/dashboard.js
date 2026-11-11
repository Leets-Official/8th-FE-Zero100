import { apiClient } from './client.js';

export const mapProfile = (user) => ({
  id: user.id,
  email: user.email,
  name: user.name || '',
  joinedAt: user.created_at || '',
});
export const mapInquiry = (inquiry) => ({
  id: inquiry.id,
  title: inquiry.title,
  content: inquiry.content,
  authorId: inquiry.user_id,
  authorName: inquiry.name,
  authorEmail: inquiry.email,
  createdAt: inquiry.created_at,
});

export async function getDashboard({ signal } = {}) {
  const [profile, inquiries] = await Promise.all([
    apiClient.get('/api/auth/me', { signal }),
    apiClient.get('/api/inquiries', { signal }),
  ]);
  if (!profile.data?.data?.id || !Array.isArray(inquiries.data?.data))
    throw new Error('대시보드 데이터 형식이 올바르지 않습니다.');
  return { profile: mapProfile(profile.data.data), inquiries: inquiries.data.data.map(mapInquiry) };
}

export async function createInquiry(values) {
  const { data } = await apiClient.post('/api/inquiries', values);
  return mapInquiry(data.data);
}
export async function deleteInquiry(id) {
  await apiClient.delete(`/api/inquiries/${encodeURIComponent(id)}`);
}
export async function updateName(name) {
  const { data } = await apiClient.patch('/api/auth/me', { name });
  return mapProfile(data.data);
}
export async function updatePassword(currentPassword, newPassword) {
  await apiClient.patch('/api/auth/me/password', { currentPassword, newPassword });
}
