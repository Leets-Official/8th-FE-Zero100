import './Button.css';

function Button({ children, variant = 'default', onClick, type = 'button' }) {
  return (
    <button type={type} className={`button button-${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
