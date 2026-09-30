function Text({ as: Element = 'p', variant = 'body', className = '', children, ...props }) {
  return (
    <Element className={`text text--${variant} ${className}`.trim()} {...props}>
      {children}
    </Element>
  );
}

export default Text;
