import { cn } from '../../../utils/cn';

const VARIANT_CLASS = {
  primary: 'border-dash-black bg-dash-black text-white enabled:hover:opacity-85',
  secondary: 'border-dash-line bg-white text-dash-text enabled:hover:bg-dash-bg',
};

const SIZE_CLASS = {
  medium: 'px-6 text-base leading-6',
  small: 'px-5 text-sm leading-5',
};

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[10px] border py-2.5 font-medium whitespace-nowrap transition',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted',
        'disabled:cursor-not-allowed disabled:opacity-50',
        VARIANT_CLASS[variant],
        SIZE_CLASS[size],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
