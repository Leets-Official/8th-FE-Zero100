import { useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/Button/Button';
import Input from '../components/Input/Input';
import Text from '../components/Text/Text';
import TodoItem from '../components/TodoItem/TodoItem';

import '../App.css';

function TodoPage({ todos, onAdd, onToggle, onDelete, onEdit }) {
  const [inputText, setInputText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  // Todo 추가
  const handleAddTodo = () => {
    const trimmedText = inputText.trim();

    if (!trimmedText) return;

    onAdd(trimmedText);
    setInputText('');
  };

  // Enter로 Todo 추가
  const handleKeyDown = (e) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleAddTodo();
    }
  };

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

  // 진행 중인 Todo만 가져오기
  const activeTodos = todos.filter((todo) => !todo.completed);

  return (
    <div className="todo-app">
      <div className="header-container">
        <h1 className="logo-title">TodoMatic</h1>

        <div className="input-section">
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
        </div>

        <div className="button-container">
          <Link to="/all">
            <Button variant="secondary">전체보기</Button>
          </Link>

          <Button variant="default">진행 중</Button>

          <Link to="/completed">
            <Button variant="secondary">완료됨</Button>
          </Link>
        </div>
      </div>

      <div className="list-container">
        <Text as="h2">남은 할 일 {activeTodos.length}개</Text>

        <div className="todo-list-frame">
          {activeTodos.map((todo) => (
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

export default TodoPage;
