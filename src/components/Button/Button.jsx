import './Button.css';

function Button({ children, variant = 'primary', type = 'button', onClick, disabled = false }) {
  const buttonClassName = `todo-button todo-button--${variant}`;

  return (
    <button className={buttonClassName} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
