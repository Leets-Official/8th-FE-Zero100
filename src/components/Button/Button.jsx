const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary'
  size = 'medium', // 'medium' | 'small'
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  ...props
}) => {
  const classNames = [
    'common-component',
    'common-button',
    `common-button--${variant}`,
    `common-button--${size}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classNames} {...props}>
      {children}
    </button>
  );
};

export default Button;
