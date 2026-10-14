const variantStyles = {
  primary: 'bg-black text-white',
  secondary: 'bg-white text-gray-700 outline -outline-offset-1 outline-gray-200',
};

const sizeStyles = {
  medium: 'px-6 text-base leading-6',
  small: 'px-5 text-sm leading-5',
};

function Button(props) {
  const variant = props.variant ?? 'primary';
  const size = props.size ?? 'medium';

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      className={`cursor-pointer rounded-[10px] py-2.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40 ${variantStyles[variant]} ${sizeStyles[size]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
