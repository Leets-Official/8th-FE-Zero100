import styles from './Text.module.css';

function Text({
  as = 'p',
  variant = 'body',
  isStrikethrough = false,
  className = '',
  children,
  ...rest
}) {
  const Component = as;
  const textClassName = [
    styles.text,
    styles[variant],
    isStrikethrough && styles.strikethrough,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={textClassName} {...rest}>
      {children}
    </Component>
  );
}

export default Text;
