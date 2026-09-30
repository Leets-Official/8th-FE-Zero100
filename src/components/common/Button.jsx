function Button({
  children,
  variant = 'secondary',
  className = '',
  type = 'button',
  ...buttonProps
}) {
  return (
    <button
      className={`button button--${variant} ${className}`.trim()}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
}

export default Button;
