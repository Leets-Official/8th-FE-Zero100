// Swagger components.schemas.User (GET·PATCH /api/auth/me, 회원가입 응답)
export interface User {
  id: string;
  email: string;
  name: string;
  // 예: '2026년 3월 25일 17:11'
  created_at: string;
}
