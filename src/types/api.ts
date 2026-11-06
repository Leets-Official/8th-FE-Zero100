// Swagger의 모든 성공 응답은 { data } 형식
export interface ApiSuccessResponse<T> {
  data: T;
}

// Swagger components.schemas.Error
export interface ApiErrorResponse {
  error: string;
}

// 삭제·비밀번호 변경 등 안내 문구만 반환하는 응답의 data
export interface MessageResponse {
  message: string;
}
