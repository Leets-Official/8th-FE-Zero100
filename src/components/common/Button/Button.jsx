import styles from './Button.module.css';

function Button({ children, variant = 'primary', type = 'button', className = '', ...rest }) {
  const buttonClassName = [styles.button, styles[variant], className].filter(Boolean).join(' ');

  return (
    <button type={type} className={buttonClassName} {...rest}>
      {children}
    </button>
  );
}

export default Button;
