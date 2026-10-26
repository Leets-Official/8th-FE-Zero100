const variants = {
  primary: 'border-brand bg-brand text-white hover:bg-[#343a40]',
  secondary: 'border-[#ced4da] bg-white text-brand hover:bg-page',
  ghost: 'border-transparent bg-transparent text-[#495057] hover:bg-[#f1f3f5]',
  danger: 'border-[#e03131] bg-[#e03131] text-white hover:bg-[#c92a2a]',
};

const sizes = {
  sm: 'min-h-9 px-3 text-xs',
  md: 'min-h-11 px-5 text-sm',
  lg: 'min-h-12 px-6 text-base',
};

export function getButtonClassName(variant, size, className = '') {
  return [
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-md border font-medium transition-colors disabled:opacity-40',
    variants[variant] ?? variants.primary,
    sizes[size] ?? sizes.md,
    className,
  ].join(' ');
}
