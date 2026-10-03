const variantStyles = {
  primary: 'border-indigo-600 bg-indigo-600 text-white',
  default: 'border-[#ddd] bg-white text-[#555]',
  delete: 'border-red-300 bg-white text-red-600',
};

function Button(props) {
  const variant = props.variant ?? 'default';

  return (
    <button
      type="button"
      className={`cursor-pointer rounded-md border px-[22px] py-2.5 text-base leading-[1.35] font-medium ${variantStyles[variant]}`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

export default Button;
