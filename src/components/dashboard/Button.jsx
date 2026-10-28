const variants = {
  primary: 'bg-[#000000] text-[#ffffff]',
  secondary: 'bg-[#ffffff] text-[#374151] shadow-[inset_0_0_0_0.93px_#e5e7eb]',
};

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  ...props
}) {
  const sizeClass =
    size === 'small' ? 'px-[20px] text-[14px] leading-[20px]' : 'text-[16px] leading-[24px]';

  const paddingClass = size === 'small' ? '' : variant === 'secondary' ? 'px-[25px]' : 'px-[24px]';

  return (
    <button
      {...props}
      type={type}
      className={`inline-flex shrink-0 items-center justify-center gap-[10px] rounded-[10px] py-[10px] font-medium whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#222222] enabled:cursor-pointer enabled:hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizeClass} ${paddingClass} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
