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

export interface LoginValues {
  email: string;
  password: string;
}
export interface SignupValues extends LoginValues {
  name: string;
}
export interface NameChangeValues {
  name: string;
}
export interface PasswordChangeValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
export type AccountActionRunner = (action: () => Promise<void>) => Promise<void>;
