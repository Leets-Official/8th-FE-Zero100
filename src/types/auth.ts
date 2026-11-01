export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthContextValue {
  user: User | null;
  status: 'loading' | 'ready' | 'error';
  error: string;
  retry: () => void;
  acceptUser: (user: User | null) => void;
}
