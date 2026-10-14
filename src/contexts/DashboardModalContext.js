import { createContext, useContext } from 'react';

export const DashboardModalContext = createContext(null);

export function useDashboardModal() {
  return useContext(DashboardModalContext);
}
