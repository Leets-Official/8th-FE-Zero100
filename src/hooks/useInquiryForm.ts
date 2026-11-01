import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import axios from 'axios';
import type { InquiryValues } from '../types/inquiry';
import { inquiryErrorMessage } from '../api/inquiryClient';
import { INQUIRY_FIELDS, validateInquiryValues } from '../utils/inquiryValidation';
import type { InquiryErrors, InquiryField } from '../utils/inquiryValidation';

function responseFieldErrors(error: unknown): InquiryErrors {
  if (!axios.isAxiosError(error)) return {};
  const data: unknown = error.response?.data;
  if (typeof data !== 'object' || data === null || !('errors' in data)) return {};
  const fields = data.errors;
  if (typeof fields !== 'object' || fields === null) return {};
  const errors: InquiryErrors = {};
  for (const key of INQUIRY_FIELDS) {
    if (key in fields) {
      const message: unknown = fields[key as keyof typeof fields];
      if (typeof message === 'string' && message) errors[key] = message;
    }
  }
  return errors;
}

export function useInquiryForm(initialValues: InquiryValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<InquiryErrors>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function field(name: InquiryField) {
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
        setFormError('');
      },
      onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // 버튼을 누르는 도중 오류 문구가 추가되어 버튼 위치가 바뀌지 않게 합니다.
        // 등록/저장은 submit에서 전체 검사하고, 취소는 입력 검사를 생략합니다.
        const next = event.relatedTarget;
        if (next instanceof HTMLButtonElement && next.form === event.currentTarget.form) return;
        setErrors((previous) => ({ ...previous, [name]: validateInquiryValues(values)[name] }));
      },
    };
  }

  function handleSubmit(action: (values: InquiryValues) => Promise<void>) {
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (busy.current) return;
      const nextErrors = validateInquiryValues(values);
      setErrors(nextErrors);
      setFormError('');
      const firstError = INQUIRY_FIELDS.find((name) => nextErrors[name]);
      if (firstError) {
        const control = event.currentTarget.elements.namedItem(firstError);
        if (control instanceof HTMLElement) control.focus();
        return;
      }
      busy.current = true;
      setSubmitting(true);
      try {
        await action(values);
      } catch (error: unknown) {
        if (mounted.current) {
          setFormError(inquiryErrorMessage(error));
          setErrors(responseFieldErrors(error));
        }
      } finally {
        busy.current = false;
        if (mounted.current) setSubmitting(false);
      }
    };
  }

  return {
    values,
    field,
    formError,
    isSubmitting,
    handleSubmit,
    isDirty: INQUIRY_FIELDS.some((name) => values[name] !== initialValues[name]),
  };
}
