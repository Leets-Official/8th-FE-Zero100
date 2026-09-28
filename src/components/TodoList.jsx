import TodoItem from './TodoItem.jsx';

function TodoList({ title, todos, onToggleTodo, onEditTodo, onDeleteTodo }) {
  return (
    <div className="flex flex-col self-stretch gap-[8px]">
      <h2 className="flex flex-col w-[520px] h-[27px] m-0 font-[family-name:var(--font-family-base)] font-bold text-[17.6px] leading-[26.4px] tracking-[0px] text-[color:var(--color-text-secondary)]">
        {title}
      </h2>
      <ul className="flex flex-col gap-[8px] w-max m-0 p-0 list-none">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
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
