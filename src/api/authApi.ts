import axios from 'axios';
import { adminClient, saveSession, clearSession } from './adminClient';
import { isRecord } from '../utils/typeGuards';
import { validateNameChange, validatePasswordChange } from '../utils/accountValidation';
import type {
  User,
  LoginValues,
  SignupValues,
  NameChangeValues,
  PasswordChangeValues,
} from '../types/auth';
import type { ApiOptions } from '../types/inquiry';

export function parseUser(value: unknown): User {
  if (
    !isRecord(value) ||
    typeof value.id !== 'string' ||
    typeof value.name !== 'string' ||
    typeof value.email !== 'string' ||
    typeof value.createdAt !== 'string' ||
    Number.isNaN(Date.parse(value.createdAt))
  )
    throw new Error('사용자 정보 형식이 올바르지 않습니다. 다시 시도해 주세요.');
  return { id: value.id, name: value.name, email: value.email, createdAt: value.createdAt };
}

export function accountErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    const data: unknown = error.response?.data;
    if (isRecord(data) && typeof data.message === 'string') return data.message;
  }
  return error instanceof Error
    ? error.message
    : '계정 정보를 변경하지 못했습니다. 다시 시도해 주세요.';
}

export const authApi = {
  async login(values: LoginValues): Promise<User> {
    const { data } = await adminClient.post<unknown>('/auth/login', values);
    if (!isRecord(data) || typeof data.token !== 'string' || !data.token)
      throw new Error('로그인 응답 형식이 올바르지 않습니다.');
    const user = parseUser(data.user);
    saveSession(data.token);
    return user;
  },
  async signup(values: SignupValues): Promise<User> {
    return parseUser((await adminClient.post<unknown>('/auth/signup', values)).data);
  },
  async me(options?: ApiOptions): Promise<User> {
    return parseUser((await adminClient.get<unknown>('/me', options)).data);
  },
  async logout(): Promise<void> {
    await adminClient.post('/auth/logout');
    clearSession();
  },
  async updateName(values: NameChangeValues): Promise<User> {
    const errors = validateNameChange(values);
    if (errors.name) throw new Error(errors.name);
    return parseUser(
      (await adminClient.patch<unknown>('/me/name', { name: values.name.trim() })).data,
    );
  },
  async updatePassword(values: PasswordChangeValues): Promise<void> {
    const firstError = Object.values(validatePasswordChange(values)).find(Boolean);
    if (firstError) throw new Error(firstError);
    await adminClient.patch('/me/password', values);
    // 어댑터에서 이미 세션을 무효화하므로 저장소 오류가 있어도 화면에서는 로그아웃합니다.
    try {
      clearSession();
    } catch {
      /* 남은 토큰으로는 인증할 수 없습니다. */
    }
  },
};
