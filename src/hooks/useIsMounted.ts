import { useCallback, useEffect, useRef } from 'react';

// 비동기 작업이 끝났을 때 컴포넌트가 아직 화면에 있는지 확인한다.
// 요청 중 다른 페이지로 이동했다면, 완료 후 화면 이동처럼 현재 화면을 바꾸는 처리를 하지 않기 위해 사용
export function useIsMounted() {
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return useCallback(() => isMountedRef.current, []);
}
