const variantClassNames = {
  default: 'h-11 border-[#ccc] px-3.5 py-2.5 text-base font-normal sm:min-w-[440px]',
  fluid: 'h-11 w-full min-w-0 flex-1 border-[#ccc] px-3.5 py-2.5 text-base font-normal',
  compact: 'h-[35px] min-w-0 flex-1 border-[#4f46e5] px-2.5 py-[5px] text-[15.2px] font-medium',
};

function Input({
  className = '',
  placeholder = 'Input Text',
  type = 'text',
  variant = 'default',
  ...props
}) {
  const variantClassName = variantClassNames[variant] ?? variantClassNames.default;

  return (
    <input
      className={`inline-flex min-w-0 rounded-[6px] border bg-white font-['Noto_Sans_KR',sans-serif] text-[#111] placeholder:text-[#111]/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4f46e5] ${variantClassName} ${className}`.trim()}
      type={type}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
