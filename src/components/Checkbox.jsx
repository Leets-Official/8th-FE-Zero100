function Checkbox({ children, className = '', ...props }) {
  return (
    <label
      className={`relative inline-flex w-fit cursor-pointer items-center gap-2.5 font-['Noto_Sans_KR',sans-serif] text-base leading-[22.8px] font-medium text-[#111] ${className}`.trim()}
    >
      <input className="peer sr-only" type="checkbox" {...props} />
      <span
        aria-hidden="true"
        className="flex size-5 shrink-0 items-center justify-center rounded-[2.35px] border border-[#767676] bg-white peer-checked:border-[#4f46e5] peer-checked:bg-[#4f46e5] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#4f46e5]"
      >
        <svg className="size-3.5 text-white" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="m3 8 3.2 3.2L13 4.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      {children}
    </label>
  );
}

export default Checkbox;
