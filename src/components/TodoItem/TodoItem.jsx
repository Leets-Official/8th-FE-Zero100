import Checkbox from '../Checkbox/Checkbox';
import Text from '../Text/Text';
import Button from '../Button/Button';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className="todo-item">
      <div className="todo-item__content">
        <Checkbox
          label={`${todo.text} 완료`}
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
        />

        <Text completed={todo.completed}>{todo.text}</Text>
      </div>

      <div className="todo-item__actions" role="group" aria-label={`${todo.text} 관리`}>
        <Button variant="secondary">수정</Button>

        <Button variant="danger" onClick={() => onDelete(todo.id)}>
          삭제
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
