import { useState } from 'react'
import Button from '../common/Button.jsx'
import Checkbox from '../common/Checkbox.jsx'
import Input from '../common/Input.jsx'
import Text from '../common/Text.jsx'

function TodoItem({ todo, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftTitle, setDraftTitle] = useState(todo.title)
  const trimmedTitle = draftTitle.trim()

  function startEditing() {
    setDraftTitle(todo.title)
    setIsEditing(true)
  }

  function cancelEditing() {
    setDraftTitle(todo.title)
    setIsEditing(false)
  }

  function saveEditing(event) {
    event.preventDefault()
    if (!trimmedTitle) return

    onUpdate(trimmedTitle)
    setIsEditing(false)
  }

  function handleEditKeyDown(event) {
    if (
      event.key === 'Enter' &&
      (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
    ) {
      event.preventDefault()
      return
    }
    if (event.key === 'Escape') cancelEditing()
  }

  return (
    <li className={`todo-card${todo.completed ? ' todo-card--completed' : ''}`}>
      {isEditing ? (
        <form className="todo-edit-form" onSubmit={saveEditing}>
          <label className="visually-hidden" htmlFor={`edit-${todo.id}`}>
            {todo.title} 수정
          </label>
          <Input
            id={`edit-${todo.id}`}
            value={draftTitle}
            onChange={(event) => setDraftTitle(event.target.value)}
            onKeyDown={handleEditKeyDown}
            autoFocus
            autoComplete="off"
          />
          <div className="todo-actions">
            <Button variant="primary" type="submit" disabled={!trimmedTitle}>
              저장
            </Button>
            <Button onClick={cancelEditing}>취소</Button>
          </div>
        </form>
      ) : (
        <>
          <div className="todo-card__main">
            <Checkbox
              checked={todo.completed}
              onChange={onToggle}
              aria-label={`${todo.title} 완료 상태`}
            />
            <Text
              as="span"
              variant="todo"
              className={todo.completed ? 'todo-card__title--completed' : ''}
            >
              {todo.title}
            </Text>
          </div>
          <div className="todo-actions">
            <Button onClick={startEditing} aria-label={`${todo.title} 수정`}>
              수정
            </Button>
            <Button
              variant="danger"
              onClick={onDelete}
              aria-label={`${todo.title} 삭제`}
            >
              삭제
            </Button>
          </div>
        </>
      )}
    </li>
  )
}

export default TodoItem
