// API 연동 전까지 Figma 시안의 예시 데이터를 사용. 추후 API 응답 데이터로 교체
// 1번의 상세 내용만 Figma 시안 기준이고, 2~5번의 name, email, content는 화면 확인용 예시
export const MOCK_INQUIRIES = [
  {
    id: 1,
    title: '서비스 이용 관련 문의드립니다',
    createdAt: '2026년 3월 25일 17:11',
    name: '홍길동',
    email: 'hong@example.com',
    content:
      '안녕하세요. 서비스 이용 중 몇 가지 궁금한 사항이 있어 문의드립니다.\n\n1. API 연동 시 인증 방법은 어떻게 되나요?\n2. 데이터 백업 주기는 어떻게 되나요?\n3. 사용자 권한 관리는 어떻게 설정하나요?\n\n자세한 답변 부탁드립니다. 감사합니다.',
  },
  {
    id: 2,
    title: '결제 시스템에 대해 질문이 있습니다',
    createdAt: '2026년 3월 24일 14:30',
    name: '홍길동',
    email: 'hong@example.com',
    content: '결제 수단 변경 방법이 궁금합니다.\n\n안내 부탁드립니다.',
  },
  {
    id: 3,
    title: '회원가입이 되지 않습니다',
    createdAt: '2026년 3월 23일 09:15',
    name: '홍길동',
    email: 'hong@example.com',
    content: '회원가입 버튼을 눌러도 다음 단계로 넘어가지 않습니다.\n\n확인 부탁드립니다.',
  },
  {
    id: 4,
    title: '대시보드 기능 개선 요청',
    createdAt: '2026년 3월 22일 16:45',
    name: '홍길동',
    email: 'hong@example.com',
    content: '대시보드에서 문의 현황을 기간별로 볼 수 있으면 좋겠습니다.',
  },
  {
    id: 5,
    title: 'API 연동 방법 문의',
    createdAt: '2026년 3월 21일 11:20',
    name: '홍길동',
    email: 'hong@example.com',
    content: 'API 연동 절차와 필요한 준비 사항을 알고 싶습니다.',
  },
];
