import TodoItem from './TodoItem.jsx';
import { useTodos } from '../context/useTodos.js';

function TodoList({ todos }) {
  const { updateTodo, deleteTodo } = useTodos();

  if (todos.length === 0) {
    return <p className="py-4 text-[#767676]">표시할 할 일이 없습니다.</p>;
  }

  return (
    <ul className="flex flex-col gap-2">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          text={todo.text}
          completed={todo.completed}
          onToggle={(completed) => updateTodo(todo.id, { completed })}
          onUpdate={(text) => updateTodo(todo.id, { text })}
          onDelete={() => deleteTodo(todo.id)}
        />
      ))}
    </ul>
  );
}

export default TodoList;
