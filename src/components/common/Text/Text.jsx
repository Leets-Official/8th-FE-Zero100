import { cn } from '../../../utils/cn';

const VARIANT_CLASS = {
  title: 'text-[40px] leading-tight font-extrabold',
  heading: 'text-xl font-medium text-ink-sub',
  body: 'text-base font-medium',
  caption: 'text-sm text-placeholder',
};

function Text({
  as = 'p',
  variant = 'body',
  isStrikethrough = false,
  className = '',
  children,
  ...rest
}) {
  const Component = as;

  return (
    <Component
      className={cn(
        'tracking-tight wrap-anywhere text-ink',
        VARIANT_CLASS[variant],
        isStrikethrough && 'text-placeholder line-through',
        className,
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

export default Text;
