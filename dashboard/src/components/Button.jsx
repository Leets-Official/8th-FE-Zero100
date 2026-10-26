const VARIANT_STYLES = {
  primary: 'bg-black text-white',
  secondary: 'bg-transparent text-[#364153] border border-[#E5E7EB]',
};

const SIZE_STYLES = {
  medium: 'h-11 px-6 text-base',
  small: 'h-10 px-5 text-sm',
};

const Button = ({
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-[10px] ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
