import { MOCK_INQUIRIES } from '../../mocks/dashboard/inquiries.js';

const STORAGE_KEY = 'inquiries';
const LAST_ID_STORAGE_KEY = 'inquiryLastId';

// 저장된 값이 없거나 올바른 배열이 아니면 Mock 데이터로 시작
// Mock에 필드가 추가되기 전에 저장된 문의도 상세 조회가 되도록 같은 id의 Mock 값을 채운다.
export function loadInquiries() {
  try {
    const savedInquiries = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!Array.isArray(savedInquiries)) return MOCK_INQUIRIES;

    return savedInquiries.map((inquiry) => ({
      ...MOCK_INQUIRIES.find((mockInquiry) => mockInquiry.id === inquiry.id),
      ...inquiry,
    }));
  } catch {
    return MOCK_INQUIRIES;
  }
}

// 저장 공간 부족 등으로 저장에 실패해도 앱은 현재 state로 계속 동작
export function saveInquiries(inquiries) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(inquiries));
  } catch {
    // 저장 실패는 무시함
  }
}

export function loadLastInquiryId() {
  try {
    return Number(localStorage.getItem(LAST_ID_STORAGE_KEY)) || 0;
  } catch {
    return 0;
  }
}

export function saveLastInquiryId(id) {
  try {
    localStorage.setItem(LAST_ID_STORAGE_KEY, String(id));
  } catch {
    // 저장 실패는 무시함
  }
}
