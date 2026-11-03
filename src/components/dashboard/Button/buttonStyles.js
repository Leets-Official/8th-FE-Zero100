import { cn } from '../../../utils/cn';

// hover는 not-disabled로 걸어서, 비활성 버튼에는 적용되지 않고 링크(a)에는 그대로 적용되게 한다.
const VARIANT_CLASS = {
  primary: 'border-dash-black bg-dash-black text-white not-disabled:hover:opacity-85',
  secondary: 'border-dash-line bg-white text-dash-text not-disabled:hover:bg-dash-bg',
};

const SIZE_CLASS = {
  medium: 'px-6 text-base leading-6',
  small: 'px-5 text-sm leading-5',
};

/** Button과 ButtonLink가 같은 모양을 쓰도록 className을 한 곳에서 만든다. */
export const getButtonClassName = ({ variant = 'primary', size = 'medium', className = '' }) =>
  cn(
    'inline-flex shrink-0 items-center justify-center gap-2.5 rounded-[10px] border py-2.5 font-medium whitespace-nowrap transition',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted',
    'disabled:cursor-not-allowed disabled:opacity-50',
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    className,
  );
