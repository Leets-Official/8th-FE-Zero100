import { twMerge } from 'tailwind-merge';

const BASE_CLASS_NAME =
  'box-border inline-flex items-center justify-center gap-[10px] m-0 rounded-[10px] font-[family-name:var(--font-family-base)] font-medium tracking-[0px]';

// Figma 공통 컴포넌트 Button=default(primary), Button=variant(secondary)
const VARIANT_CLASS_NAMES = {
  primary: 'border-0 bg-[#000000] text-[#ffffff]',
  secondary: 'border-[0.93px] border-solid border-[#e5e7eb] bg-transparent text-[#364153]',
};

// Figma 공통 컴포넌트 Button=default(medium), Button=small(small)
const SIZE_CLASS_NAMES = {
  medium: 'h-[44px] px-[24px] text-[16px] leading-[24px]',
  small: 'h-[40px] px-[20px] text-[14px] leading-[20px]',
};

// Dashboard 전용 버튼. onClick, disabled 등 나머지 button 속성은 그대로 전달
function Button({
  type = 'button',
  variant = 'primary',
  size = 'medium',
  className,
  children,
  ...props
}) {
  // 뒤에 오는 클래스가 우선하도록 충돌하는 Tailwind 클래스를 정리한다. (className > size > variant > base)
  const classNames = twMerge(
    BASE_CLASS_NAME,
    VARIANT_CLASS_NAMES[variant],
    SIZE_CLASS_NAMES[size],
    className,
  );

  return (
    <button type={type} className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
