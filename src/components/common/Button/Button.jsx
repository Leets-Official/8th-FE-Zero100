import { cn } from '../../../utils/cn';

const VARIANT_CLASS = {
  primary:
    'border-primary bg-primary text-white enabled:hover:border-primary-hover enabled:hover:bg-primary-hover',
  secondary:
    'border-line bg-white text-[#555555] enabled:hover:border-[#c5c5c5] enabled:hover:bg-surface-hover',
  danger:
    'border-danger-line bg-white text-danger enabled:hover:border-[#f87171] enabled:hover:bg-danger-soft',
};

const SIZE_CLASS = {
  md: 'h-11 min-w-15 px-[22px] text-sm',
  // 할 일 카드 안의 수정/삭제/저장/취소 버튼
  item: 'h-11 min-w-15 px-5 text-base',
  sm: 'h-9 min-w-14 px-3.5 text-sm',
};

function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center rounded-md border font-semibold tracking-tight whitespace-nowrap transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        SIZE_CLASS[size],
        VARIANT_CLASS[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
