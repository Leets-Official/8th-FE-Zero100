import { useState } from 'react';
import Text from '../Text';
import Button from '../Button';
import Checkbox from '../Checkbox';

function TodoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(props.task.text);

  const startEdit = () => {
    setDraft(props.task.text);
    setIsEditing(true);
  };

  const saveEdit = () => {
    if (draft.trim() === '') return;
    props.onUpdate(props.task.id, draft.trim());
    setIsEditing(false);
  };

  const cancelEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="rounded-lg border border-[#eee] bg-white px-4 py-3.5">
      <div className="flex items-center gap-2.5">
        <Checkbox checked={props.task.done} onChange={() => props.onToggle(props.task.id)} />

        {isEditing ? (
          <input
            type="text"
            className="h-11 flex-1 rounded-md border border-[#ccc] bg-white px-3.5 text-base text-[#111] focus:border-indigo-600 focus:outline-none"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            autoFocus
          />
        ) : (
          <Text done={props.task.done}>{props.task.text}</Text>
        )}
      </div>

      <div className="mt-2 flex gap-1.5 pl-[27px]">
        {isEditing ? (
          <>
            <Button onClick={saveEdit}>저장</Button>
            <Button onClick={cancelEdit}>취소</Button>
          </>
        ) : (
          <>
            <Button onClick={startEdit}>수정</Button>
            <Button variant="delete" onClick={() => props.onDelete(props.task.id)}>
              삭제
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default TodoItem;
