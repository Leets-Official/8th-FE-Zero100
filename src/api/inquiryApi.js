// 문의 데이터 접근의 단일 진입점. useInquiries는 이 파일의 함수만 사용한다.
// 실제 API 연동 시 같은 이름의 Promise 반환 함수를 axiosInstance로 구현해 아래 export를 교체한다.
export {
  createInquiry,
  deleteInquiry,
  fetchInquiries,
  fetchInquiry,
} from '../mocks/dashboard/inquiryMockApi.js';
