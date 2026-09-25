import TodoItem from '../components/TodoItem.jsx';

const COMPLETED_TODOS = [{ id: 3, title: '리츠 출석하기', completed: true }];

function CompletedTodoPage() {
  const todos = COMPLETED_TODOS;
  const completedCount = todos.filter((todo) => todo.completed).length;

  return (
    <div className="app">
      <div className="frame-4">
        <header className="header-container">
          <div className="heading1-margin">
            <h1 className="heading1">완료된 작업</h1>
            <button className="active-list-link" type="button">
              ← 진행 중 목록
            </button>
          </div>
        </header>
        <div className="list-container">
          <h2 className="list-heading">완료된 목록 {completedCount}개</h2>
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CompletedTodoPage;
