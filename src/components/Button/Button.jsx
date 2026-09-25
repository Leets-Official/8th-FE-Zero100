import './Button.css';

function Button({ variant = 'primary', size, className, children, ...props }) {
  const classNames = ['button', `button-${variant}`, size && `button-${size}`, className]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
}

export default Button;
