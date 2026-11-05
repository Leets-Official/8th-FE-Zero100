import { getButtonClassName } from './buttonStyles';

function Button({
  children,
  variant = 'primary',
  size = 'medium',
  type = 'button',
  className = '',
  ...rest
}) {
  return (
    <button type={type} className={getButtonClassName({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}

export default Button;
