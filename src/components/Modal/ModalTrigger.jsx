import { useModalContext } from './ModalContext';

function ModalTrigger({ children }) {
  const { openModal } = useModalContext();

  return (
    <span
      role="presentation"
      onClick={openModal}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openModal();
        }
      }}
    >
      {children}
    </span>
  );
}

export default ModalTrigger;
