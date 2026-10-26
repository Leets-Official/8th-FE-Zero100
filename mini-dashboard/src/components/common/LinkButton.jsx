import { Link } from 'react-router';
import { getButtonClassName } from './buttonStyles.js';

function LinkButton({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <Link {...props} className={getButtonClassName(variant, size, className)}>
      {children}
    </Link>
  );
}

export default LinkButton;
