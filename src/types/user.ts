// Swagger components.schemas.User (GET·PATCH /api/auth/me, 회원가입 응답)
export interface User {
  id: string;
  email: string;
  name: string;
  // 예: '2026년 3월 25일 17:11'
  created_at: string;
}

// API 연동 전 대시보드·마이페이지가 사용하는 Mock 사용자 (mocks/dashboard/user.ts)
export interface MockUser {
  name: string;
  email: string;
  joinedAt: string;
}
