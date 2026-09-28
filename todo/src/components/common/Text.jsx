const Text = ({ as: Tag = 'p', variant = 'body', children }) => {
  return <Tag className={`text text--${variant}`}>{children}</Tag>;
};

export default Text;
