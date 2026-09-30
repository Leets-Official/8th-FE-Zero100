import Text from '../common/Text.jsx';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, emptyMessage, onToggleTodo, onUpdateTodo, onDeleteTodo }) {
  if (todos.length === 0) {
    return (
      <Text as="p" variant="empty" role="status">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ul className="todo-list" aria-label="할 일 목록">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={() => onToggleTodo(todo.id)}
          onUpdate={(title) => onUpdateTodo(todo.id, title)}
          onDelete={() => onDeleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
