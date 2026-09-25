import './Checkbox.css';

function Checkbox({ defaultChecked, children }) {
  return (
    <label className="checkbox">
      <input className="checkbox-input" type="checkbox" defaultChecked={defaultChecked} />
      {children}
    </label>
  );
}

export default Checkbox;
