function Textarea(props) {
  return (
    <textarea
      {...props}
      className="min-h-[166px] w-full resize-y rounded-[10px] bg-gray-50 px-4 py-3.5 text-base leading-6 text-neutral-950 outline -outline-offset-1 outline-gray-200 placeholder:text-neutral-950/50 focus:outline-black aria-invalid:outline-red-500"
    />
  );
}

export default Textarea;
