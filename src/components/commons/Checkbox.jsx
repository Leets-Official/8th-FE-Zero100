export default function Checkbox({ id, label, checked, onChange, className = '' }) {
  return (
    <div className={`checkbox-field ${className}`}>
      <input id={id} type="checkbox" checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}
