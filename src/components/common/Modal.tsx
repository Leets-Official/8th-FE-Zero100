import { useEffect, useEffectEvent, useRef, type HTMLAttributes } from 'react';
import { createPortal } from 'react-dom';

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'iframe',
  '[contenteditable]:not([contenteditable="false"])',
  '[tabindex]:not([tabindex="-1"])',
].join(',');

// Dashboard 전용 모달. 열림 상태는 부모가 isOpen으로 제어하고, 내부 콘텐츠는 children으로 전달
// 모달 이름은 aria-labelledby 또는 aria-label로 전달
interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose?: () => void;
}

function Modal({ isOpen, onClose, className, children, ...props }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useEffectEvent((event: KeyboardEvent) => {
    const dialog = dialogRef.current;

    if (event.key === 'Escape') {
      event.preventDefault();
      onClose?.();
      return;
    }

    if (event.key !== 'Tab' || !dialog) return;

    const focusable = dialog.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    const active = document.activeElement;
    const isOutside = !dialog.contains(active);

    if (!first) {
      event.preventDefault();
      dialog.focus();
    } else if (event.shiftKey) {
      if (isOutside || active === first || active === dialog) {
        event.preventDefault();
        last.focus();
      }
    } else if (isOutside || active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen || !dialog) return;

    const previouslyFocused = document.activeElement;

    // 모달을 제외한 body의 다른 요소를 inert 처리해 클릭·키보드 상호작용 차단
    const inertElements = Array.from(document.body.children).filter(
      (element): element is HTMLElement =>
        element instanceof HTMLElement && element !== dialog && !element.inert,
    );
    inertElements.forEach((element) => {
      element.inert = true;
    });

    const firstFocusable = dialog.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    (firstFocusable ?? dialog).focus();

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      inertElements.forEach((element) => {
        element.inert = false;
      });

      if (previouslyFocused instanceof HTMLElement && previouslyFocused.isConnected) {
        previouslyFocused.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      className={className}
      {...props}
    >
      {children}
    </div>,
    document.body,
  );
}

export default Modal;
