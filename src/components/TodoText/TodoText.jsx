import './TodoText.css';

function TodoText({ children, completed = false }) {
  const textClassName = completed ? 'todo-text todo-text--completed' : 'todo-text';

  return <p className={textClassName}>{children}</p>;
}

export default TodoText;
