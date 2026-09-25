import { useState } from 'react';
import Button from '../../components/Button/Button.jsx';
import PageHeader from '../../components/PageHeader/PageHeader.jsx';
import PageLayout from '../../components/PageLayout/PageLayout.jsx';
import TodoList from '../../components/TodoList/TodoList.jsx';
import './TodoPage.css';

const FILTER_ALL = 'all';
const FILTER_ACTIVE = 'active';

function TodoPage({ todos, onAddTodo, onToggleTodo, onEditTodo, onDeleteTodo }) {
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState(FILTER_ALL);

  const remainingCount = todos.filter((todo) => !todo.completed).length;
  const visibleTodos = filter === FILTER_ACTIVE ? todos.filter((todo) => !todo.completed) : todos;

  const handleAddTodo = (event) => {
    event.preventDefault();

    const title = inputValue.trim();
    if (!title) return;

    onAddTodo(title);
    setInputValue('');
  };

  const getFilterButtonProps = (buttonFilter) =>
    filter === buttonFilter
      ? { variant: 'primary', className: 'todo-filter-button-selected' }
      : { variant: 'secondary' };

  return (
    <PageLayout>
      <PageHeader
        title="TodoMatic"
        navLabel="완료 목록 →"
        navTo="/completed"
        subtitle="할 일을 입력하세요"
      />
      <div className="todo-controls">
        <form className="todo-form" onSubmit={handleAddTodo}>
          <input
            className="todo-input"
            type="text"
            placeholder="새 할 일 추가"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
          <Button type="submit" variant="primary" size="medium">
            추가
          </Button>
        </form>
        <div className="todo-filter">
          <Button
            size="medium"
            {...getFilterButtonProps(FILTER_ALL)}
            onClick={() => setFilter(FILTER_ALL)}
          >
            전체보기
          </Button>
          <Button
            size="medium"
            {...getFilterButtonProps(FILTER_ACTIVE)}
            onClick={() => setFilter(FILTER_ACTIVE)}
          >
            진행 중
          </Button>
        </div>
      </div>
      <TodoList
        title={`남은 할 일 ${remainingCount}개`}
        todos={visibleTodos}
        onToggleTodo={onToggleTodo}
        onEditTodo={onEditTodo}
        onDeleteTodo={onDeleteTodo}
      />
    </PageLayout>
  );
}

export default TodoPage;
