import type { InquiryValues } from '../types/inquiry';

export type InquiryField = keyof InquiryValues;
export type InquiryErrors = Partial<Record<InquiryField, string>>;

export const INQUIRY_FIELDS: InquiryField[] = ['name', 'email', 'title', 'content'];

export function validateInquiryValues(values: InquiryValues): InquiryErrors {
  const errors: InquiryErrors = {};
  const nameLength = [...values.name.trim()].length;
  if (nameLength < 2 || nameLength > 8) errors.name = '이름은 2자 이상 8자 이하로 입력해 주세요';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()) || values.email.trim().length > 254)
    errors.email = '올바른 이메일 형식을 입력하세요';
  if (!values.title.trim() || values.title.trim().length > 100)
    errors.title = '제목은 1~100자로 입력해 주세요';
  if (!values.content.trim() || values.content.trim().length > 5000)
    errors.content = '내용은 1~5,000자로 입력해 주세요';
  return errors;
}
