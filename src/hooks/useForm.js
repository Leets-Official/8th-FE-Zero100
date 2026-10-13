import { useEffect, useRef, useState } from 'react';
import { hasErrors } from '../utils/validation';
import { errorMessage } from '../api/adminClient';

export function useForm(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const busy = useRef(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  function field(name) {
    return {
      name,
      value: values[name],
      error: errors[name],
      onChange: (event) => {
        const value = event.target.value;
        setValues((previous) => ({ ...previous, [name]: value }));
        setErrors((previous) => ({ ...previous, [name]: '' }));
        setFormError('');
      },
    };
  }
  function handleSubmit(action) {
    return async (event) => {
      event.preventDefault();
      if (busy.current) return;
      const nextErrors = validate(values);
      setErrors(nextErrors);
      setFormError('');
      if (hasErrors(nextErrors)) {
        event.currentTarget.elements
          .namedItem(Object.keys(nextErrors).find((key) => nextErrors[key]))
          ?.focus();
        return;
      }
      busy.current = true;
      setIsSubmitting(true);
      try {
        await action(values);
      } catch (error) {
        if (mounted.current) {
          setFormError(errorMessage(error));
          setErrors(error.response?.data?.errors || {});
        }
      } finally {
        busy.current = false;
        if (mounted.current) setIsSubmitting(false);
      }
    };
  }
  return { values, field, errors, formError, isSubmitting, handleSubmit };
}
