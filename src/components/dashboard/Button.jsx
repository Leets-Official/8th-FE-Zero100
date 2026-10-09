// Dashboard 전용 버튼. onClick, disabled 등 나머지 button 속성은 그대로 전달
function Button({ type = 'button', className, children, ...props }) {
  return (
    <button type={type} className={className} {...props}>
      {children}
    </button>
  );
}

export default Button;
