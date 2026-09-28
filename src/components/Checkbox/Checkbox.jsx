import './Checkbox.css';

function Checkbox({ checked, onChange, label, disabled = false }) {
  return (
    <input
      className="todo-checkbox"
      type="checkbox"
      checked={checked}
      onChange={onChange}
      aria-label={label}
      disabled={disabled}
    />
  );
}

export default Checkbox;
