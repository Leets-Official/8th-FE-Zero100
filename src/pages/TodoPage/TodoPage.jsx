import { useState } from 'react';
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
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [inputValue, setInputValue] = useState('');

  const remainingCount = todos.filter((todo) => !todo.completed).length;

  const handleAddTodo = (event) => {
    event.preventDefault();

    const title = inputValue.trim();
    if (!title) return;

    const newTodo = { id: crypto.randomUUID(), title, completed: false };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <PageLayout>
      <PageHeader title="TodoMatic" navLabel="완료 목록 →" subtitle="할 일을 입력하세요" />
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
          <Button variant="primary" size="medium" className="todo-filter-button-selected">
            전체보기
          </Button>
          <Button variant="secondary" size="medium">
            진행 중
          </Button>
        </div>
      </div>
      <TodoList
        title={`남은 할 일 ${remainingCount}개`}
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </PageLayout>
  );
}

export default TodoPage;
