import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, FocusEvent, FormEvent } from 'react';
import axios from 'axios';
import { accountErrorMessage } from '../api/authApi';
import { isRecord } from '../utils/typeGuards';

export type FieldErrors<T> = Partial<Record<keyof T, string>>;

export function useTypedForm<T extends object>(
  initialValues: T,
  validate: (values: T) => FieldErrors<T>,
) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  const keys = Object.keys(initialValues) as (keyof T)[];
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  function field<K extends keyof T>(name: K) {
    return {
      name: String(name),
      value: values[name],
      error: errors[name],
      onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const value = event.target.value;
        setValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: undefined }));
        setFormError('');
      },
      onBlur: (event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const next = event.relatedTarget;
        if (next instanceof HTMLButtonElement && next.form === event.currentTarget.form) return;
        setErrors((previous) => ({ ...previous, [name]: validate(values)[name] }));
      },
    };
  }

  function reset(nextValues: T = initialValues) {
    setValues(nextValues);
    setErrors({});
    setFormError('');
  }

  function handleSubmit(action: (values: T) => Promise<void>) {
    return async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (busy.current) return;
      const nextErrors = validate(values);
      setErrors(nextErrors);
      setFormError('');
      const firstError = keys.find((key) => nextErrors[key]);
      if (firstError) {
        const control = event.currentTarget.elements.namedItem(String(firstError));
        if (control instanceof HTMLElement) control.focus();
        return;
      }
      busy.current = true;
      setSubmitting(true);
      try {
        await action(values);
      } catch (error: unknown) {
        if (mounted.current) {
          setFormError(accountErrorMessage(error));
          const serverErrors: FieldErrors<T> = {};
          const data: unknown = axios.isAxiosError(error) ? error.response?.data : null;
          if (isRecord(data) && isRecord(data.errors)) {
            for (const key of keys) {
              const message = data.errors[String(key)];
              if (typeof message === 'string') serverErrors[key] = message;
            }
          }
          setErrors(serverErrors);
        }
      } finally {
        busy.current = false;
        if (mounted.current) setSubmitting(false);
      }
    };
  }
  return { values, field, errors, formError, isSubmitting, reset, handleSubmit };
}
