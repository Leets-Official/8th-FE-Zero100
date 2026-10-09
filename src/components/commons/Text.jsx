export default function Text({ as: Tag = 'p', className = '', children, ...props }) {
  return (
    <Tag className={`text ${className}`} {...props}>
      {children}
    </Tag>
  );
}
