import { useContext } from 'react';
import { DashboardContext } from '../contexts/DashboardContext.js';

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (!context) throw new Error('useDashboard는 DashboardProvider 안에서 사용해야 합니다.');
  return context;
}
