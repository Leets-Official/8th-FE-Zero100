/** 토스트 등에 쓰는 체크 아이콘. 글자 옆에 붙는 꾸밈용이라 스크린리더가 읽지 않게 숨긴다. */
function CheckCircleIcon({ size = 20, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.81a.75.75 0 0 0-1.21-.88l-3.49 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.14-.09l4-5.5Z"
      />
    </svg>
  );
}

export default CheckCircleIcon;
