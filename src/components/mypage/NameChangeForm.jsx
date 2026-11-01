import { useState } from 'react';
import Button from '../dashboard/Button';
import TextField from '../dashboard/TextField';
import { useDashboardToast } from '../../contexts/DashboardToastContext';
import { validateName } from '../../utils/validators';

function NameChangeForm() {
  const { showToast } = useDashboardToast();
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const error = submitted ? validateName(name) : '';

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (validateName(name)) return;

    // TODO: API 연동 후 이름 변경 요청
    showToast('이름이 변경되었습니다.');
    setSubmitted(false);
  }

  return (
    <form className="flex flex-col items-end gap-3" noValidate onSubmit={handleSubmit}>
      <TextField
        name="name"
        aria-label="새 이름"
        placeholder="텍스트를 입력하세요"
        autoComplete="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        error={error}
      />
      <Button type="submit">변경</Button>
    </form>
  );
}

export default NameChangeForm;
