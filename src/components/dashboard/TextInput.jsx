function TextInput(props) {
  return (
    <input
      type="text"
      {...props}
      className="w-full rounded-[10px] bg-gray-50 px-4 py-3.5 text-base leading-[19px] text-neutral-950 outline -outline-offset-1 outline-gray-200 placeholder:text-neutral-950/50 focus:outline-black"
    />
  );
}

export default TextInput;
