import TodoItem from '../TodoItem/TodoItem.jsx';
import './TodoList.css';

function TodoList({ title, todos }) {
  return (
    <div className="todo-list-section">
      <h2 className="todo-list-title">{title}</h2>
      <ul className="todo-list">
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
