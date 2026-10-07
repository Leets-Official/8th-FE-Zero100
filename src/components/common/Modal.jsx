import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (previousFocus?.isConnected) {
        previousFocus.focus();
      } else {
        document.querySelector('[data-page-heading]')?.focus();
      }
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal__content">
        <h2 id={titleId} className="modal__title">
          {title}
        </h2>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}

export default Modal;
