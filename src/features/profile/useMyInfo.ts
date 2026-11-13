import { useRequest } from '../../hooks/useRequest.ts';
import { useAuth } from '../auth/context/AuthContext.ts';

// 페이지 진입 시 서버에서 내 정보를 다시 조회해 AuthContext의 user를 최신으로 맞춘다.
// 사용자 정보 자체는 AuthContext의 user 하나로 관리하고, 이 훅은 조회 상태(로딩·오류)만 다룬다.
// 401은 공통 인증 만료 처리가 로그인 페이지로 이동시킨다.
export function useMyInfo() {
  const { refreshUser } = useAuth();
  const { isLoading, errorMessage, reload } = useRequest(refreshUser);

  return { isLoading, errorMessage, reload };
}
