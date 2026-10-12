import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

function Modal({ title, children, onClose }) {
  const dialogRef = useRef(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    const opener = document.activeElement;
    dialog.showModal();

    return () => {
      dialog.close();
      if (opener?.isConnected) opener.focus();
      else document.querySelector('[data-page-heading]')?.focus();
    };
  }, []);

  return createPortal(
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      className="fixed inset-0 m-auto w-[400px] max-w-[calc(100%-32px)] rounded-lg border-0 bg-white p-0 text-brand shadow-xl backdrop:bg-black/45"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="p-6">
        <h2 id={titleId} className="text-base font-semibold">
          {title}
        </h2>
        {children}
      </div>
    </dialog>,
    document.body,
  );
}

export default Modal;
