import styles from './Input.module.css';

function Input({ type = 'text', className = '', ...rest }) {
  const inputClassName = [styles.input, className].filter(Boolean).join(' ');

  return <input type={type} className={inputClassName} {...rest} />;
}

export default Input;
