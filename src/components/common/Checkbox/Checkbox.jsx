import styles from './Checkbox.module.css';

function Checkbox({ checked, onChange, children, className = '', ...rest }) {
  const checkboxClassName = [styles.checkbox, className].filter(Boolean).join(' ');

  return (
    <label className={checkboxClassName}>
      <input
        type="checkbox"
        className={styles.nativeInput}
        checked={checked}
        onChange={onChange}
        {...rest}
      />
      <span className={styles.box} aria-hidden="true">
        <svg className={styles.icon} viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {children}
    </label>
  );
}

export default Checkbox;
