import dashboardUrl from '../assets/dashboard.json?url';
import { apiClient } from './client.js';

export async function getDashboard({ signal } = {}) {
  const { data } = await apiClient.get(dashboardUrl, { signal });
  if (!data?.profile || !Array.isArray(data.inquiries))
    throw new Error('대시보드 데이터 형식이 올바르지 않습니다.');
  return data;
}
