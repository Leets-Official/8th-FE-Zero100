import styles from './Button.module.css';

function Button(props) {
  let buttonClass = styles.button;
  if (props.variant === 'primary') {
    buttonClass = `${styles.button} ${styles.primary}`;
  } else if (props.variant === 'delete') {
    buttonClass = `${styles.button} ${styles.delete}`;
  }

  return (
    <button className={buttonClass} onClick={props.onClick}>
      {props.children}
    </button>
  );
}

export default Button;
