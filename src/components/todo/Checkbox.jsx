function Checkbox(props) {
  return (
    <input
      type="checkbox"
      className="size-5 cursor-pointer accent-indigo-600"
      checked={props.checked}
      onChange={props.onChange}
    />
  );
}

export default Checkbox;
