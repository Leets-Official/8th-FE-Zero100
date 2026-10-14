import { useEffect, useEffectEvent } from 'react';
import { trapFocus } from '../utils/trapFocus';

/**
 * 모달이 열려 있는 동안의 키보드 동작: Esc로 닫기, Tab 포커스를 모달 안에 가두기.
 * 리스너는 한 번만 등록하고, 항상 최신 onClose를 부르도록 Effect Event로 감싼다.
 */
export const useModalKeyboard = (dialogRef, onClose) => {
  const handleClose = useEffectEvent(onClose);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') handleClose();
      if (event.key === 'Tab' && dialogRef.current) trapFocus(event, dialogRef.current);
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [dialogRef]);
};
