import { useModalContext } from './ModalContext';

function ModalClose({ children, onClick }) {
  const { closeModal } = useModalContext();

  const handleClick = () => {
    onClick?.();
    closeModal();
  };

  return (
    <span role="presentation">
      {typeof children === 'function' ? children(handleClick) : children}
    </span>
  );
}

export default ModalClose;
