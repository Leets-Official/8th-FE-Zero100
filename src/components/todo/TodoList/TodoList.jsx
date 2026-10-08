import Text from '../../common/Text/Text';
import TodoItem from '../TodoItem/TodoItem';

function TodoList({ todos, emptyMessage }) {
  if (todos.length === 0) {
    return (
      <Text variant="caption" className="py-8 text-center">
        {emptyMessage}
      </Text>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
