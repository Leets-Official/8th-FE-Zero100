import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Navigation from '../components/Navigation/Navigation';
import Text from '../components/Text/Text';
import TodoItem from '../components/TodoItem/TodoItem';

import '../App.css';

function TodoPage({ todos, onAdd, onToggle, onDelete, onEdit }) {
  const navigate = useNavigate();

  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleSaveEdit = (id) => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;

    onEdit(id, trimmedText);
    setEditingId(null);
    setEditingText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleEditKeyDown = (e, id) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <main className="todo-app">
      <header className="page-header">
        <div className="header-top">
          <h1 className="logo-title">TodoMatic</h1>

          <Link to="/completed" className="link-completed">
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
          <Button variant="secondary" onClick={() => navigate('/all')}>
            전체보기
          </Button>

          <Button variant="default" onClick={() => navigate('/')}>
            진행 중
          </Button>
        </nav>
      </header>

      <section className="list-container">
        <Text as="h2" className="section-heading">
          남은 할 일 {activeTodos.length}개
        </Text>

        <div className="todo-list-frame">
          {activeTodos.length === 0 ? (
            <p className="empty-state">진행 중인 할 일이 없어요.</p>
          ) : (
            activeTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                isEditing={editingId === todo.id}
                editingText={editingText}
                onEditingTextChange={(e) => setEditingText(e.target.value)}
                onToggle={onToggle}
                onDelete={onDelete}
                onStartEdit={handleStartEdit}
                onSaveEdit={handleSaveEdit}
                onCancelEdit={handleCancelEdit}
                onEditKeyDown={handleEditKeyDown}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default TodoPage;
