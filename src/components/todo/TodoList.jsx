import { useModal } from '../../hooks/useModal.js';
import { useTodos } from '../../hooks/useTodos.js';
import Text from '../common/Text.jsx';
import TodoItem from './TodoItem.jsx';

function TodoList({ todos, emptyMessage }) {
  const { toggleTodo, updateTodo } = useTodos();
  const { openDeleteModal } = useModal();

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
          onToggle={() => toggleTodo(todo.id)}
          onUpdate={(title) => updateTodo(todo.id, title)}
          onDelete={() => openDeleteModal(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
