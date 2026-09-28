import { twMerge } from 'tailwind-merge';

function Checkbox({ checked, onChange, children }) {
  return (
    <label className={twMerge('flex flex-row items-center gap-[var(--checkbox-gap)]')}>
      <input
        className={twMerge(
          'box-border flex-none appearance-none w-[var(--checkbox-size)] h-[var(--checkbox-size)] m-0 border-[1.18px] border-solid border-[#767676] rounded-[2.35px] bg-[#ffffff] checked:border-[color:var(--color-primary)] checked:bg-[var(--color-primary)] checked:bg-[image:var(--checkbox-checked-icon)] checked:bg-center checked:bg-[length:20px_20px] checked:bg-no-repeat checked:bg-origin-border',
        )}
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      {children}
    </label>
  );
}

export default Checkbox;
