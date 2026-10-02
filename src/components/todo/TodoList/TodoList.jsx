import Text from '../../common/Text/Text';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, emptyMessage, onToggleTodo, onDeleteTodo, onEditTodo }) {
  if (todos.length === 0) {
    return (
      <Text variant="caption" className={styles.empty}>
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ul className={styles.list}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </ul>
  );
}

export default TodoList;
