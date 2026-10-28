import { createContext, useContext } from 'react';

export const DashboardToastContext = createContext(null);

export function useDashboardToast() {
  return useContext(DashboardToastContext);
}
