import './Text.css';

function Text({ children, as: Component = 'h2', className = '' }) {
  return <Component className={`text ${className}`.trim()}>{children}</Component>;
}

export default Text;
