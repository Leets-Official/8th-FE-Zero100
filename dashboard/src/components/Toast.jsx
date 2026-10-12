import CheckIcon from './CheckIcon';

const Toast = ({ message }) => {
  return (
    <div
      role="status"
      className="flex h-[53px] w-[320px] items-center gap-2.5 rounded-lg border border-[#EDEDED] bg-white px-4 shadow-md"
    >
      <CheckIcon />
      <p className="text-sm text-[#171717]">{message}</p>
    </div>
  );
};

export default Toast;
