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
// 기존 화면도 같은 서버 데이터를 사용하도록 한 진입점으로 연결합니다.
export {
  getDashboard,
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from './inquiryApi';
