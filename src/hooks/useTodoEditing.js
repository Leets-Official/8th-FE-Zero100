import { useState } from 'react';

function useTodoEditing(onEdit) {
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');

  const handleEditingTextChange = (e) => {
    setEditingText(e.target.value);
  };

  const handleStartEdit = (todo) => {
    setEditingId(todo.id);
    setEditingText(todo.text);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingText('');
  };

  const handleSaveEdit = (id) => {
    const trimmedText = editingText.trim();
    if (!trimmedText) return;

    onEdit(id, trimmedText);
    handleCancelEdit();
  };

  const handleEditKeyDown = (e, id) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Enter') {
      handleSaveEdit(id);
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return {
    editingId,
    editingText,
    handleEditingTextChange,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleEditKeyDown,
  };
}

export default useTodoEditing;
