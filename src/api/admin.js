export { authApi } from './authApi';

// 기존 화면도 같은 서버 데이터를 사용하도록 한 진입점으로 연결합니다.
export {
  getDashboard,
  getInquiries,
  getInquiry,
  createInquiry,
  updateInquiry,
  deleteInquiry,
} from './inquiryApi';
