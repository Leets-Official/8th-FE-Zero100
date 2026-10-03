import styles from './Checkbox.module.css';

function Checkbox(props) {
  return (
    <input
      type="checkbox"
      className={styles.checkbox}
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

export default Checkbox;
