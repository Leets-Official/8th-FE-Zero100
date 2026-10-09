import useTodoEditing from '../../hooks/useTodoEditing';
import TodoItem from '../TodoItem/TodoItem';
import './TodoList.css';

function TodoList({ todos, emptyMessage, onToggle, onDelete, onEdit }) {
  const {
    editingId,
    editingText,
    handleEditingTextChange,
    handleStartEdit,
    handleSaveEdit,
    handleCancelEdit,
    handleEditKeyDown,
  } = useTodoEditing(onEdit);

  return (
    <div className="todo-list-frame">
      {todos.length === 0 ? (
        <p className="empty-state">{emptyMessage}</p>
      ) : (
        todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isEditing={editingId === todo.id}
            editingText={editingText}
            onEditingTextChange={handleEditingTextChange}
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
  );
}

export default TodoList;
