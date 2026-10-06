import { twMerge } from 'tailwind-merge';
import Button from './Button.jsx';

// 입력값과 추가 처리는 상위 페이지에서 관리하고, TodoForm은 입력 UI만 담당
function TodoForm({ value, onChange, onSubmit }) {
  return (
    <form className={twMerge('flex flex-row gap-[8px] w-max')} onSubmit={onSubmit}>
      <input
        className={twMerge(
          'box-border min-w-[440px] h-[44px] py-[10px] px-[14px] border-[1px] border-solid border-[#cccccc] rounded-[var(--radius-control)] bg-[#ffffff]',
        )}
        type="text"
        placeholder="새 할 일 추가"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <Button type="submit" variant="primary" size="medium">
        추가
      </Button>
    </form>
  );
}

export default TodoForm;
