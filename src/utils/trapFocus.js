const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Tab/Shift+Tab을 눌렀을 때 포커스가 container 밖으로 나가지 않도록 처음과 끝을 이어준다. */
export const trapFocus = (event, container) => {
  const focusableElements = container.querySelectorAll(FOCUSABLE_SELECTOR);
  if (focusableElements.length === 0) return;

  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  const isFocusInside = container.contains(document.activeElement);

  if (event.shiftKey && (document.activeElement === firstElement || !isFocusInside)) {
    event.preventDefault();
    lastElement.focus();
  } else if (!event.shiftKey && (document.activeElement === lastElement || !isFocusInside)) {
    event.preventDefault();
    firstElement.focus();
  }
};
