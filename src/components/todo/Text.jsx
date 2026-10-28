function Text(props) {
  const stateStyle = props.done ? 'text-[#999] line-through' : 'text-[#111]';

  return <span className={`text-base leading-[1.425] ${stateStyle}`}>{props.children}</span>;
}

export default Text;
