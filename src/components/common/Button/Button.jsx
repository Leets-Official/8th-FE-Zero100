const Button = ({
  children,
  variant = 'default',
  size = 'medium',
  type = 'button',
  onClick,
  disabled = false,
  ...props
}) => {
  const normalizedVariant =
    {
      default: 'primary',
      variant: 'secondary',
      primary: 'primary',
      secondary: 'secondary',
    }[variant] || 'primary';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={[
        'common-component',
        'common-button',
        `common-button--${normalizedVariant}`,
        `common-button--${size}`,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
