import { cn } from '../../../utils/cn';

/** 카카오 말풍선 아이콘. 버튼 글자와 같은 뜻이라 스크린리더가 읽지 않게 숨긴다. */
function KakaoIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
      <path d="M9 1.5C4.58 1.5 1 4.32 1 7.8c0 2.25 1.5 4.22 3.75 5.33l-.76 2.8c-.07.25.21.45.43.3l3.34-2.21c.4.04.81.07 1.24.07 4.42 0 8-2.82 8-6.3S13.42 1.5 9 1.5Z" />
    </svg>
  );
}

function KakaoLoginButton({ className = '', ...rest }) {
  return (
    <button
      type="button"
      className={cn(
        'inline-flex w-full items-center justify-center gap-2 rounded-[10px] bg-kakao py-3 text-base leading-6 font-medium text-kakao-text transition enabled:hover:brightness-95',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted',
        className,
      )}
      {...rest}
    >
      <KakaoIcon />
      카카오 로그인
    </button>
  );
}

export default KakaoLoginButton;
