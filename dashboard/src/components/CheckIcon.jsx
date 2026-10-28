const CheckIcon = ({ size = 16, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={`text-[#171717] ${className}`}
    >
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M4.5 8.2L6.9 10.5L11.5 5.8"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CheckIcon;
