import './TodoText.css';

function TodoText({ children, completed = false, htmlFor }) {
  const textClassName = completed ? 'todo-text todo-text--completed' : 'todo-text';

  return (
    <label className={textClassName} htmlFor={htmlFor}>
      {children}
    </label>
  );
}

export default TodoText;
