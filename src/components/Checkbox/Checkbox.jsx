import './Checkbox.css';

function Checkbox({ checked, onChange, children }) {
  return (
    <label className="checkbox">
      <input
        className="checkbox-input"
        type="checkbox"
        checked={checked}
        onChange={onChange}
        readOnly={!onChange}
      />
      {children}
    </label>
  );
}

export default Checkbox;
