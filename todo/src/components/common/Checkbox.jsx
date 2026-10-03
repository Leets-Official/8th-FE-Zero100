const Checkbox = ({ checked, onChange, label }) => {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className={checked ? 'checkbox__label--done' : ''}>{label}</span>
    </label>
  );
};

export default Checkbox;
