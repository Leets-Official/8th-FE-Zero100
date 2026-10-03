const Button = ({ variant = 'default', active = false, type = 'button', onClick, children }) => {
  const className = `btn btn--${variant}${active ? ' btn--active' : ''}`;

  return (
    <button type={type} className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
