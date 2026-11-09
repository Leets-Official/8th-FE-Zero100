function StatusMessage(props) {
  return (
    <p
      role={props.role}
      className="rounded=[10px] bg-white py-12 text-center text-sm leading-5 text-gray-500 outline -outline-offset-1 outline-gray-200"
    >
      {props.children}
    </p>
  );
}

export default StatusMessage;
