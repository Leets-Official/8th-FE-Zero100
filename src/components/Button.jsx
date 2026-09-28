import { twMerge } from 'tailwind-merge';

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
  // 뒤에 오는 클래스가 우선하도록 충돌하는 Tailwind 클래스를 정리한다. (className > size > variant > base)
  const classNames = twMerge(
    BASE_CLASS_NAME,
    VARIANT_CLASS_NAMES[variant],
    SIZE_CLASS_NAMES[size],
    className,
  );

  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
