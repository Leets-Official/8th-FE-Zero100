function Checkbox({ className = '', ...checkboxProps }) {
  return (
    <input className={`todo-checkbox ${className}`.trim()} type="checkbox" {...checkboxProps} />
  );
}

export default Checkbox;
