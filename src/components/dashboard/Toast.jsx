function Toast({ message }) {
  return (
    <div
      role="status"
      aria-atomic="true"
      className="pointer-events-none fixed right-[24px] bottom-[24px] z-50 w-[320px] max-w-[calc(100%-48px)]"
    >
      {message && (
        <div className="flex min-h-[53px] items-center gap-[12px] rounded-[8px] bg-[#ffffff] px-[16px] py-[12px] shadow-[inset_0_0_0_0.93px_#ededed,0_4px_12px_0_rgb(0_0_0/0.1)]">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="shrink-0"
          >
            <circle cx="8" cy="8" r="8" fill="#171717" />
            <path
              d="M4.5 8L7 10.5L11.5 5.5"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <p className="text-[14px] leading-[20px] text-[#171717]">{message}</p>
        </div>
      )}
    </div>
  );
}

export default Toast;
