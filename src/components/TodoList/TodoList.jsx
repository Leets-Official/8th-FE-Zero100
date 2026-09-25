import TodoItem from '../TodoItem/TodoItem.jsx';
import './TodoList.css';

function TodoList({ title, todos, onToggleTodo, onDeleteTodo }) {
  return (
    <div className="todo-list-section">
      <h2 className="todo-list-title">{title}</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onToggle={onToggleTodo} onDelete={onDeleteTodo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
