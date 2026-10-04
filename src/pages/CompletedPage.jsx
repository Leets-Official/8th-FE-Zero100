import { useState } from 'react';
import { Link } from 'react-router-dom';

import Text from '../components/Text/Text';
import TodoItem from '../components/TodoItem/TodoItem';

import '../App.css';

function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

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

  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <main className="todo-app">
      <header className="page-header">
        <div className="header-top">
          <h1 className="logo-title">완료된 작업</h1>

          <Link to="/" className="link-completed">
            ← 진행 중 목록
          </Link>
        </div>
      </header>

      <section className="list-container">
        <Text as="h2" className="section-heading">
          완료된 목록 {completedTodos.length}개
        </Text>

        <div className="todo-list-frame">
          {completedTodos.length === 0 ? (
            <p className="empty-state">완료한 할 일이 아직 없어요.</p>
          ) : (
            completedTodos.map((todo) => (
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

export default CompletedPage;
