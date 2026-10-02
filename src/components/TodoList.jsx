import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import TodoItem from './TodoItem.jsx';

function TodoList({ title, todos, onToggleTodo, onEditTodo, onDeleteTodo }) {
  const [editingId, setEditingId] = useState(null);

  const editingTodo = todos.find((todo) => todo.id === editingId);
  const orderedTodos = editingTodo
    ? [editingTodo, ...todos.filter((todo) => todo.id !== editingId)]
    : todos;

  return (
    <div className={twMerge('flex flex-col self-stretch gap-[8px]')}>
      <h2
        className={twMerge(
          'flex flex-col w-[520px] h-[27px] m-0 font-[family-name:var(--font-family-base)] font-bold text-[17.6px] leading-[26.4px] tracking-[0px] text-[color:var(--color-text-secondary)]',
        )}
      >
        {title}
      </h2>
      <ul className={twMerge('flex flex-col gap-[8px] w-max m-0 p-0 list-none')}>
        {orderedTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={todo.id === editingId}
            onStartEdit={() => setEditingId(todo.id)}
            onEndEdit={() => setEditingId(null)}
            onToggle={onToggleTodo}
            onEdit={onEditTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
