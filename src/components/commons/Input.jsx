export default function Input({ className = '', ...props }) {
  return <input type="text" className={`input ${className}`} {...props} />;
}
