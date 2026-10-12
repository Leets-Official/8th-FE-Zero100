import CheckIcon from './CheckIcon';

function Toast(props) {
  return (
    <div className="flex h-14 w-80 items-center gap-2.5 rounded-lg bg-white px-3.5 shadow-[0px_4px_12px_0px_rgba(0,0,0,0.10)] outline -outline-offset-1 outline-gray-200">
      <span className="flex size-5 items-center justify-center">
        <CheckIcon />
      </span>
      <p className="text-xs leading-5 font-medium text-neutral-900">{props.message}</p>
    </div>
  );
}

export default Toast;
