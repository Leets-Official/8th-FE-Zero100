const BASE_CLASS_NAME = 'box-border m-0 rounded-[var(--radius-control)]';

const VARIANT_CLASS_NAMES = {
  primary: 'border-none border-current bg-[var(--color-primary)] text-[#ffffff]',
  secondary: 'border-[1px] border-solid border-[color:var(--color-border)] bg-[#ffffff]',
  danger: 'border-[1px] border-solid border-[#ffaaaa] bg-[#ffffff] text-[#e53935]',
};

const SIZE_CLASS_NAMES = {
  medium: 'h-[44.8px] px-[22px] py-[10px]',
};

function Button({ variant = 'primary', size, className, children, ...props }) {
  const classNames = [
    BASE_CLASS_NAME,
    VARIANT_CLASS_NAMES[variant],
    SIZE_CLASS_NAMES[size],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
