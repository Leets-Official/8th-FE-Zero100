export default function Button({
  variant = 'primary',
  className = '',
  type = 'button',
  children,
  ...props
}) {
  return (
    <button type={type} className={`admin-button admin-button--${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}
