import { useState } from 'react';
import Button from '../dashboard/Button';
import TextField from '../dashboard/TextField';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { updateName } from '../../api/auth';
import { getErrorMessage } from '../../api/client';
import { validateName } from '../../utils/validators';

function NameChangeForm() {
  const { showToast } = useDashboardToast();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const error = (submitted && validateName(name)) || serverError;

  function handleChange(event) {
    setName(event.target.value);
    setServerError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (validateName(name)) return;

    setIsSubmitting(true);
    try {
      await updateName(name.trim());
      showToast('이름이 변경되었습니다.');
      setName('');
      setSubmitted(false);
    } catch (err) {
      setServerError(getErrorMessage(err, '이름 변경에 실패했습니다.'));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="flex flex-col items-end gap-3" noValidate onSubmit={handleSubmit}>
      <TextField
        name="name"
        aria-label="새 이름"
        placeholder="텍스트를 입력하세요"
        autoComplete="name"
        value={name}
        onChange={handleChange}
        error={error}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? '변경 중...' : '변경'}
      </Button>
    </form>
  );
}

export default NameChangeForm;
