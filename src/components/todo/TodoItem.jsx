import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { useModal } from '../../contexts/todo/ModalContext.js';
import Button from './Button.jsx';
import Checkbox from './Checkbox.jsx';

function TodoItem({ todo, isEditing, onStartEdit, onEndEdit, onToggle, onEdit }) {
  const { openModal } = useModal();
  const [editValue, setEditValue] = useState('');

  const titleStateClassName = todo.completed
    ? 'text-[#999999] line-through'
    : 'text-[color:var(--color-text-primary)] no-underline';

  const handleStartEdit = () => {
    setEditValue(todo.title);
    onStartEdit();
  };

  const handleSaveEdit = (event) => {
    event.preventDefault();

    const title = editValue.trim();
    if (!title) return;

    onEdit(todo.id, title);
    onEndEdit();
  };

  const handleCancelEdit = () => {
    setEditValue(todo.title);
    onEndEdit();
  };


  const ContentWrapper = isEditing ? 'form' : 'div';

  return (
    <li
      className={twMerge(
        'box-border flex flex-col gap-[8px] w-[520px] py-[14px] px-[16px] border-[1px] border-solid border-[#eeeeee] rounded-[8px] bg-[#ffffff]',
        isEditing && 'gap-[6px] p-[12px] mb-[112px] last:mb-0',
      )}
    >
      <ContentWrapper className="contents" onSubmit={isEditing ? handleSaveEdit : undefined}>
        <div className="flex flex-row self-stretch items-center gap-[10px]">
          <Checkbox checked={todo.completed} onChange={() => onToggle(todo.id)}>
            {!isEditing && (
              <span
                className={twMerge(
                  'font-[family-name:var(--font-family-base)] font-medium text-[16px] leading-[22.8px] tracking-[0px] min-w-0 wrap-anywhere',
                  titleStateClassName,
                )}
              >
                {todo.title}
              </span>
            )}
          </Checkbox>
          {isEditing && (
            <input
              className="box-border flex-[1_1_0] min-w-0 h-[36.8px] py-[6px] px-[8px] m-0 border-[1px] border-solid border-[color:var(--color-primary)] shadow-[0_0_0_0.25px_var(--color-primary)] rounded-[4px] bg-[#ffffff] font-[family-name:var(--font-family-base)] font-medium text-[16px] leading-[22.8px] tracking-[0px] text-[color:var(--color-text-primary)] outline-none"
              type="text"
              value={editValue}
              onChange={(event) => setEditValue(event.target.value)}
              autoFocus
            />
          )}
        </div>
        <div className="flex flex-row justify-start items-center gap-[8px] pl-[calc(var(--checkbox-size)_+_var(--checkbox-gap))]">
          {isEditing ? (
            <>
              <Button
                type="submit"
                variant="secondary"
                className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0] text-[#555555]"
              >
                저장
              </Button>
              <Button
                type="button"
                variant="secondary"
                className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0] text-[#555555]"
                onClick={handleCancelEdit}
              >
                취소
              </Button>
            </>
          ) : (
            <Button
              variant="secondary"
              className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0] text-[#555555]"
              onClick={handleStartEdit}
            >
              수정
            </Button>
          )}

          {!isEditing && (
            <Button
              variant="danger"
              className="inline-flex items-center justify-center min-w-[74px] h-[44px] px-[20px] py-[0px] font-[family-name:var(--font-family-base)] font-semibold text-[16px] leading-none tracking-[0]"
              onClick={() => openModal(todo.id)}
            >
              삭제
            </Button>
          )}
        </div>
      </ContentWrapper>
    </li>
  );
}

export default TodoItem;
