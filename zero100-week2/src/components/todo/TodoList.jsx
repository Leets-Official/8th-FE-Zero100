import './TodoList.css';
import Text from '../commons/Text';
import TodoItem from './TodoItem';
import { EMPTY_MESSAGES } from '../../constants/todos';

export default function TodoList({ todos, filter, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <Text className="empty-message" role="status">
        {EMPTY_MESSAGES[filter]}
      </Text>
    );
  }
  return (
    <ul className="todo-list" aria-label="할 일 목록">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}
