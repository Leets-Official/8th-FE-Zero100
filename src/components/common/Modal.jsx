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

  function handleKeyDown(event) {
    if (event.key !== 'Tab') return;

    const focusableElements = [
      ...event.currentTarget.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.getClientRects().length > 0);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements.at(-1);

    if (!firstElement) {
      event.preventDefault();
    } else if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  return createPortal(
    <dialog
      ref={dialogRef}
      className="modal"
      aria-labelledby={titleId}
      onKeyDown={handleKeyDown}
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
