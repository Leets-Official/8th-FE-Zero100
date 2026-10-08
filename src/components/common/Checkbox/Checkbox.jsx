import { cn } from '../../../utils/cn';

function Checkbox({ checked, onChange, children, className = '', ...rest }) {
  return (
    <label
      className={cn(
        'group inline-flex min-w-0 cursor-pointer items-center gap-2.5 select-none',
        className,
      )}
    >
      {/* 진짜 체크박스는 숨기고(키보드/스크린리더용으로 유지) 옆의 네모를 직접 그린다. */}
      <input
        type="checkbox"
        className="peer sr-only"
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={cn(
          'flex size-5 shrink-0 items-center justify-center rounded border-[1.5px] border-[#d1d5db] bg-white transition-colors',
          'group-hover:border-primary peer-checked:border-primary peer-checked:bg-primary',
          'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-primary',
          '[&>svg]:hidden peer-checked:[&>svg]:block',
        )}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-3 fill-none stroke-white stroke-3 [stroke-linecap:round] [stroke-linejoin:round]"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children}
    </label>
  );
}

export default Checkbox;
