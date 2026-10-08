import { cn } from '../../../utils/cn';

const VARIANT_CLASS = {
  primary:
    'border-primary bg-primary text-white enabled:hover:border-primary-hover enabled:hover:bg-primary-hover',
  secondary:
    'border-line bg-white text-[#555555] enabled:hover:border-[#c5c5c5] enabled:hover:bg-surface-hover',
  danger:
    'border-danger-line bg-white text-danger enabled:hover:border-[#f87171] enabled:hover:bg-danger-soft',
};

function Button({ children, variant = 'primary', type = 'button', className = '', ...rest }) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex h-11 min-w-15 items-center justify-center rounded-md border px-[18px] text-base font-semibold tracking-tight whitespace-nowrap transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
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
