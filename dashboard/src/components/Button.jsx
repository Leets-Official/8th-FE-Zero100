const VARIANT_STYLES = {
  primary: 'h-11 px-6 text-base bg-black text-white',
  secondary: 'h-11 px-[25px] text-base bg-transparent text-[#364153] border border-[#E5E7EB]',
  small: 'h-10 px-5 text-sm bg-black text-white',
};

const Button = ({ variant = 'primary', type = 'button', className = '', children, ...rest }) => {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-[10px] ${VARIANT_STYLES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
