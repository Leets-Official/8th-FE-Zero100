import './Checkbox.css';

function Checkbox({ checked, onChange, label, className = '' }) {
  return (
    <label className={`checkbox ${className}`.trim()}>
      <input type="checkbox" checked={checked} onChange={onChange} />

      <span className="checkbox-box">
        <svg
          className="checkbox-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M3.08838 8.75L6.69132 12.3529L13.3825 4.11765"
            stroke="white"
            strokeWidth="2.05882"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>

      {label && <span className="checkbox-text">{label}</span>}
    </label>
  );
}

export default Checkbox;
