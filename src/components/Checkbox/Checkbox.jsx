import './Checkbox.css';

function Checkbox({ checked, onChange, label, className = '' }) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkbox-box">
        <svg className="checkbox-icon" viewBox="0 0 24 24">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </span>
      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
}

export default Checkbox;
