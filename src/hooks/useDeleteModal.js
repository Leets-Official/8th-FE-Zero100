import { useContext } from 'react';
import { DeleteModalContext } from '../contexts/deleteModal/DeleteModalContext';

export const useDeleteModal = () => {
  const context = useContext(DeleteModalContext);
  if (!context) throw new Error('useDeleteModal은 DeleteModalProvider 안에서 사용해야 합니다.');
  return context;
};
