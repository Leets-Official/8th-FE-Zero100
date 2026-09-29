import { useState } from 'react'
import Button from '../common/Button.jsx'
import Input from '../common/Input.jsx'

function TodoForm({ onAddTodo }) {
  const [title, setTitle] = useState('')
  const trimmedTitle = title.trim()

  function handleSubmit(event) {
    event.preventDefault()
    if (!trimmedTitle) return

    onAddTodo(trimmedTitle)
    setTitle('')
  }

  function handleKeyDown(event) {
    if (
      event.key === 'Enter' &&
      (event.nativeEvent.isComposing || event.nativeEvent.keyCode === 229)
    ) {
      event.preventDefault()
    }
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="visually-hidden" htmlFor="new-todo">
        새 할 일
      </label>
      <Input
        id="new-todo"
        placeholder="새 할 일 추가"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      <Button variant="primary" type="submit" disabled={!trimmedTitle}>
        추가
      </Button>
    </form>
  )
}

export default TodoForm
