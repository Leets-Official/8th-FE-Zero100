import { adminClient } from './adminClient';
import { inquiryClient } from './inquiryClient';
import type { User } from '../types/auth';
import type { ApiOptions, Inquiry, InquiryValues } from '../types/inquiry';
import { validateInquiryValues } from '../utils/inquiryValidation';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

// TypeScript의 타입은 실행 중 사라지므로 외부 응답도 검사합니다.
export function parseInquiry(value: unknown): Inquiry {
  if (!isRecord(value)) throw new Error('문의 데이터 형식이 올바르지 않습니다.');
  const { id, userId, name, email, title, content, createdAt, updatedAt, status } = value;
  if (
    (typeof id !== 'string' && typeof id !== 'number') ||
    typeof userId !== 'string' ||
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof title !== 'string' ||
    typeof content !== 'string' ||
    typeof createdAt !== 'string' ||
    Number.isNaN(Date.parse(createdAt)) ||
    (updatedAt !== undefined &&
      (typeof updatedAt !== 'string' || Number.isNaN(Date.parse(updatedAt)))) ||
    (status !== undefined && status !== 'pending' && status !== 'answered')
  )
    throw new Error('문의 데이터 형식이 올바르지 않습니다.');
  return {
    id: String(id),
    userId,
    name,
    email,
    title,
    content,
    createdAt,
    ...(typeof updatedAt === 'string' ? { updatedAt } : {}),
    status: status ?? 'pending',
  };
}

async function currentUser(options?: ApiOptions): Promise<User> {
  const { data } = await adminClient.get<unknown>('/me', options);
  if (
    !isRecord(data) ||
    typeof data.id !== 'string' ||
    typeof data.name !== 'string' ||
    typeof data.email !== 'string' ||
    typeof data.createdAt !== 'string'
  ) {
    throw new Error('로그인 정보를 확인할 수 없습니다. 다시 로그인해 주세요.');
  }
  return { id: data.id, name: data.name, email: data.email, createdAt: data.createdAt };
}

function cleanValues(values: InquiryValues): InquiryValues {
  const errors = validateInquiryValues(values);
  if (Object.keys(errors).length) throw new Error('이름, 이메일, 제목과 내용을 확인해 주세요.');
  return {
    name: values.name.trim(),
    email: values.email.trim(),
    title: values.title.trim(),
    content: values.content.trim(),
  };
}

export async function getInquiries(options?: ApiOptions): Promise<Inquiry[]> {
  const { data } = await inquiryClient.get<unknown>('/inquiries', options);
  if (!Array.isArray(data)) throw new Error('문의 목록 형식이 올바르지 않습니다.');
  return data.map(parseInquiry);
}

export async function getInquiry(id: string, options?: ApiOptions): Promise<Inquiry> {
  if (!id.trim()) throw new Error('문의 번호를 확인할 수 없습니다. 목록에서 다시 선택해 주세요.');
  const { data } = await inquiryClient.get<unknown>(
    `/inquiries/${encodeURIComponent(id)}`,
    options,
  );
  return parseInquiry(data);
}

export async function createInquiry(values: InquiryValues): Promise<Inquiry> {
  const user = await currentUser();
  const { data } = await inquiryClient.post<unknown>('/inquiries', {
    ...cleanValues(values),
    id: crypto.randomUUID(),
    userId: user.id,
    status: 'pending',
    createdAt: new Date().toISOString(),
  });
  return parseInquiry(data);
}

async function requireOwner(id: string): Promise<void> {
  const [user, inquiry] = await Promise.all([currentUser(), getInquiry(id)]);
  if (user.id !== inquiry.userId) throw new Error('직접 작성한 문의만 변경할 수 있습니다.');
}

export async function updateInquiry(id: string, values: InquiryValues): Promise<Inquiry> {
  await requireOwner(id);
  const { data } = await inquiryClient.patch<unknown>(`/inquiries/${encodeURIComponent(id)}`, {
    ...cleanValues(values),
    updatedAt: new Date().toISOString(),
  });
  return parseInquiry(data);
}

export async function deleteInquiry(id: string): Promise<void> {
  await requireOwner(id);
  await inquiryClient.delete(`/inquiries/${encodeURIComponent(id)}`);
}

export async function getDashboard(options?: ApiOptions) {
  const [user, inquiries] = await Promise.all([currentUser(options), getInquiries(options)]);
  return {
    user,
    totalInquiries: inquiries.length,
    myInquiries: inquiries.filter((inquiry) => inquiry.userId === user.id).length,
  };
}
