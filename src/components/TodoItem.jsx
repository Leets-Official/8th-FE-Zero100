function TodoItem({ todo }) {
  const itemClassName = todo.completed ? 'todo-item todo-item-completed' : 'todo-item';

  return (
    <li className={itemClassName}>
      <div className="todo-content">
        <label className="todo-checkbox">
          <input className="todo-checkbox-input" type="checkbox" defaultChecked={todo.completed} />
          <span className="todo-title">{todo.title}</span>
        </label>
      </div>
      <div className="todo-actions">
        <button className="todo-edit-button" type="button">
          수정
        </button>
        <button className="todo-delete-button" type="button">
          삭제
        </button>
      </div>
    </li>
  );
}

export default TodoItem;
