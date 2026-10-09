// Dashboard 전용 여러 줄 입력창. value/onChange(controlled)와 defaultValue(uncontrolled) 모두 그대로 전달
function TextArea({ className, ...props }) {
  return <textarea className={className} {...props} />;
}

export default TextArea;
