import './Checkbox.css';

function Checkbox({ checked, onChange, label, disabled = false, readOnly = false }) {
  return (
    <input
      className="todo-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      disabled={disabled}
      readOnly={readOnly}
    />
  );
}

export default Checkbox;
