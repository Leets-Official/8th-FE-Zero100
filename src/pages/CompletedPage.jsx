import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button/Button';
import Text from '../components/Text/Text';
import TodoItem from '../components/TodoItem/TodoItem';

import '../App.css';

function CompletedPage({ todos, onToggle, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // 수정 시작
  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  // 수정 저장
  const handleSaveEdit = (id) => {
    const trimmedText = editingText.trim();

    if (!trimmedText) return;

    onEdit(id, trimmedText);
    setEditingId(null);
    setEditingText('');
  };

  // 수정 취소
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  // 수정 중 Enter / Escape
  const handleEditKeyDown = (e, id) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  // 완료된 Todo만 가져오기
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="todo-app">
      <div className="header-container">
        <h1 className="logo-title">TodoMatic</h1>

        <div className="button-container">
          <Link to="/all">
            <Button variant="secondary">전체보기</Button>
          </Link>

          <Link to="/">
            <Button variant="secondary">진행 중</Button>
          </Link>

          <Button variant="default">완료됨</Button>
        </div>
      </div>

      <div className="list-container">
        <Text as="h2">완료된 할 일 {completedTodos.length}개</Text>

        <div className="todo-list-frame">
          {completedTodos.map((todo) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}

export default CompletedPage;
