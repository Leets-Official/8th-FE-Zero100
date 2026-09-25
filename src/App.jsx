import './App.css';

const INITIAL_TODOS = [
  { id: 1, title: '밥 먹기', completed: false },
  { id: 2, title: '잠자기', completed: false },
];

function App() {
  const todos = INITIAL_TODOS;
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div className="app">
      <div className="frame-4">
        <header className="header-container">
          <div className="heading1-margin">
            <h1 className="heading1">TodoMatic</h1>
            <span className="completed-link">완료 목록 →</span>
          </div>
          <div className="heading2-margin">
            <h2 className="heading2">할 일을 입력하세요</h2>
          </div>
        </header>
        <div className="button-container">
          <div className="input-container">
            <input className="todo-input" type="text" placeholder="새 할 일 추가" />
            <button className="add-button" type="button">
              추가
            </button>
          </div>
          <div className="filter-container">
            <button className="filter-all-button" type="button">
              전체보기
            </button>
            <button className="filter-active-button" type="button">
              진행 중
            </button>
          </div>
        </div>
        <div className="list-container">
          <h2 className="list-heading">남은 할 일 {remainingCount}개</h2>
          <ul className="todo-list">
            {todos.map((todo) => (
              <li key={todo.id} className="todo-item">
                <div>
                  <input id={`todo-${todo.id}`} type="checkbox" defaultChecked={todo.completed} />
                  <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
                </div>
                <div className="todo-actions">
                  <button className="todo-edit-button" type="button">
                    수정
                  </button>
                  <button className="todo-delete-button" type="button">
                    삭제
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
