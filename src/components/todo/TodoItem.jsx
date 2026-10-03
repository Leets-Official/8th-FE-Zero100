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
    <div className="taskCard">
      <div className="taskCheck">
        <Checkbox checked={props.task.done} onChange={() => props.onToggle(props.task.id)} />

        {isEditing ? (
          <input type="text" value={draft} onChange={(event) => setDraft(event.target.value)} />
        ) : (
          <Text done={props.task.done}>{props.task.text}</Text>
        )}
      </div>
      <div className="taskButtons">
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
