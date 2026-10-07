import TodoItem from '../components/TodoItem/TodoItem';

function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <>
      <section aria-labelledby="completed-count">
        <h2 id="completed-count" className="todo-tasks__count" aria-live="polite">
          완료된 목록 {completedTodos.length}개
        </h2>

        {completedTodos.length === 0 ? (
          <p className="todo-tasks__empty">완료된 할 일이 없습니다.</p>
        ) : (
          <ul className="todo-list">
            {completedTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </ul>
        )}
      </section>
    </>
  );
}

export default CompletedPage;
