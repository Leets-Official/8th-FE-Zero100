import './Button.css';

function Button({ children, variant = 'default', onClick, type = 'button', className = '' }) {
  return (
    <button
      type={type}
      className={`button button-${variant} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
