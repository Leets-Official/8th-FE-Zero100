import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import Navigation from '../../components/Navigation/Navigation';
import Text from '../../components/Text/Text';
import TodoList from '../../components/TodoList/TodoList';
import { ROUTES } from '../../constants/routes';

import '../../App.css';

function TodoPage({ todos, onAdd, onToggle, onDelete, onEdit }) {
  const [inputText, setInputText] = useState('');

  const handleAddTodo = () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;

    onAdd(trimmedText);
    setInputText('');
  };

  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;
    if (e.key === 'Enter') handleAddTodo();
  };

  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <main className="todo-app">
      <header className="page-header">
        <div className="header-top">
          <h1 className="logo-title">TodoMatic</h1>

          <Link to={ROUTES.TODO_COMPLETED} className="link-completed">
            완료 목록 →
          </Link>
        </div>

        <Navigation active="todo" />

        <section className="input-section">
          <Text as="h2">할 일을 입력하세요</Text>

          <div className="input-container">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="새 할 일 추가"
            />

            <Button variant="default" onClick={handleAddTodo}>
              추가
            </Button>
          </div>
        </section>

        <nav className="button-container" aria-label="할 일 필터">
          <Link to={ROUTES.TODO_ALL} className="button button-secondary">
            전체보기
          </Link>

          <Link to={ROUTES.TODO} className="button button-default" aria-current="page">
            진행 중
          </Link>
        </nav>
      </header>

      <section className="list-container">
        <Text as="h2" className="section-heading">
          남은 할 일 {activeTodos.length}개
        </Text>

        <TodoList
          todos={activeTodos}
          emptyMessage="진행 중인 할 일이 없어요."
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      </section>
    </main>
  );
}

export default TodoPage;
