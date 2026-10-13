import { adminClient, saveSession, clearSession } from './adminClient';

export const authApi = {
  async login(values) {
    const { data } = await adminClient.post('/auth/login', values);
    saveSession(data.token);
    return data.user;
  },
  async signup(values) {
    const { data } = await adminClient.post('/auth/signup', values);
    return data;
  },
  async me(options) {
    const { data } = await adminClient.get('/me', options);
    return data;
  },
  async logout() {
    await adminClient.post('/auth/logout');
    clearSession();
  },
  async updateName(values) {
    const { data } = await adminClient.patch('/me/name', values);
    return data;
  },
  async updatePassword(values) {
    await adminClient.patch('/me/password', values);
    clearSession();
  },
};
export async function getDashboard(options) {
  return (await adminClient.get('/dashboard', options)).data;
}
export async function getInquiries(options) {
  return (await adminClient.get('/inquiries', options)).data;
}
export async function getInquiry(id, options) {
  return (await adminClient.get(`/inquiries/${encodeURIComponent(id)}`, options)).data;
}
export async function createInquiry(values) {
  return (await adminClient.post('/inquiries', values)).data;
}
export async function deleteInquiry(id) {
  await adminClient.delete(`/inquiries/${encodeURIComponent(id)}`);
}
