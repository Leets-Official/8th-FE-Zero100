import { cn } from '../../../utils/cn';

function Input({ type = 'text', className = '', ...rest }) {
  return (
    <input
      type={type}
      className={cn(
        'h-11 w-full min-w-0 flex-1 rounded-md border border-[#cccccc] bg-white px-3.5 text-base text-ink transition-colors outline-none placeholder:text-placeholder focus:border-primary',
        className,
      )}
      {...rest}
    />
  );
}

export default Input;
