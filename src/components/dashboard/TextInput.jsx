// Dashboard 전용 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
function TextInput({ type = 'text', className, ...props }) {
  return <input type={type} className={className} {...props} />;
}

export default TextInput;
