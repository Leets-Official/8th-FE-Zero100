import { forwardRef } from 'react';

const Button = forwardRef(function Button(
  { children, variant = 'secondary', className = '', type = 'button', ...buttonProps },
  ref,
) {
  return (
    <button
      ref={ref}
      className={`button button--${variant} ${className}`.trim()}
      type={type}
      {...buttonProps}
    >
      {children}
    </button>
  );
});

export default Button;
