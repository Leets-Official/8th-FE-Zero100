const variantStyles = {
  default: 'bg-black px-6 text-base leading-6 text-white',
  variant:
    'bg-white px-6 text-base leading-6 text-gray-700 outline -outline-offset-1 outline-gray-200',
  small: 'bg-black px-5 text-sm leading-5 text-white',
};

function Button(props) {
  const variant = props.variant ?? 'default';

  return (
    <button
      type={props.type ?? 'button'}
      disabled={props.disabled}
      className={`cursor-pointer rounded-[10px] py-2.5 font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-40 ${variantStyles[variant]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
