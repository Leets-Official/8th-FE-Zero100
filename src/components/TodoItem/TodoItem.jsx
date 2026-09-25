import Button from '../Button/Button.jsx';
import Checkbox from '../Checkbox/Checkbox.jsx';
import './TodoItem.css';

function TodoItem({ todo, onToggle, onDelete }) {
  const itemClassName = todo.completed ? 'todo-item todo-item-completed' : 'todo-item';

  return (
    <li className={itemClassName}>
      <div className="todo-content">
        <Checkbox checked={todo.completed} onChange={onToggle && (() => onToggle(todo.id))}>
          <span className="todo-title">{todo.title}</span>
        </Checkbox>
      </div>
      <div className="todo-actions">
        <Button variant="secondary" className="todo-action-button todo-edit-button">
          수정
        </Button>
        <Button
          variant="danger"
          className="todo-action-button"
          onClick={onDelete && (() => onDelete(todo.id))}
        >
          삭제
        </Button>
      </div>
    </li>
  );
}

export default TodoItem;
