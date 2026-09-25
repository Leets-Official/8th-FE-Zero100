import Button from '../../components/Button/Button.jsx';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import TodoList from '../../components/TodoList/TodoList.jsx';
import './TodoPage.css';

const INITIAL_TODOS = [
  { id: 1, title: '밥 먹기', completed: false },
  { id: 2, title: '잠자기', completed: false },
];

function TodoPage() {
  const todos = INITIAL_TODOS;
  const remainingCount = todos.filter((todo) => !todo.completed).length;

  return (
    <PageLayout>
      <PageHeader title="TodoMatic" navLabel="완료 목록 →" subtitle="할 일을 입력하세요" />
      <div className="todo-controls">
        <div className="todo-form">
          <input className="todo-input" type="text" placeholder="새 할 일 추가" />
          <Button variant="primary" size="medium">
            추가
          </Button>
        </div>
        <div className="todo-filter">
          <Button variant="primary" size="medium" className="todo-filter-button-selected">
            전체보기
          </Button>
          <Button variant="secondary" size="medium">
            진행 중
          </Button>
        </div>
      </div>
      <TodoList title={`남은 할 일 ${remainingCount}개`} todos={todos} />
    </PageLayout>
  );
}

export default TodoPage;
