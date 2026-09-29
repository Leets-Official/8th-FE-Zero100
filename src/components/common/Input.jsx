function Input({ className = '', ...inputProps }) {
  return <input className={`text-input ${className}`.trim()} {...inputProps} />
}

export default Input
