const variantClassNames = {
  primary: 'border-0 bg-[#4f46e5] text-white',
  secondary: 'border border-[#ddd] bg-white text-gray-900',
  danger: 'border border-[#fca5a5] bg-white text-red-600',
}; // 스타일지정

function Button({ children, className = '', type = 'button', variant = 'primary', ...props }) {
  const variantClassName = variantClassNames[variant] ?? variantClassNames.primary;

  return (
    <button
      className={`inline-flex h-11 cursor-pointer flex-col items-center justify-center rounded-[6px] px-[22px] py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 ${variantClassName} ${className}`.trim()}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
