import { useState } from 'react';
import { useDashboard } from '../hooks/useDashboard.js';
import Button from '../components/common/Button.jsx';
import TextInput from '../components/common/TextInput.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function ProfilePage() {
  const { data, updateProfile } = useDashboard();
  const [name, setName] = useState(data.profile.name);
  const [email, setEmail] = useState(data.profile.email);
  const hasChanges = name.trim() !== data.profile.name || email.trim() !== data.profile.email;

  function handleSubmit(event) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) return;
    updateProfile({ name, email });
  }

  function cancelChanges() {
    setName(data.profile.name);
    setEmail(data.profile.email);
  }

  return (
    <>
      <PageHeading title="마이페이지" />
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
      >
        <h2 className="text-base font-semibold">내 정보</h2>
        <TextInput
          label="이름"
          name="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={30}
          autoComplete="name"
          required
        />
        <TextInput
          label="이메일"
          name="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          autoComplete="email"
          required
        />
        <TextInput label="가입일" value={data.profile.joinedAt.replaceAll('-', '.')} readOnly />
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={cancelChanges} disabled={!hasChanges}>
            취소
          </Button>
          <Button type="submit" disabled={!hasChanges || !name.trim() || !email.trim()}>
            저장
          </Button>
        </div>
      </form>
      <section
        className="mt-6 max-w-2xl space-y-5 rounded-lg border border-line bg-white p-6 sm:p-8"
        aria-labelledby="password-heading"
      >
        <h2 id="password-heading" className="text-base font-semibold">
          비밀번호 변경
        </h2>
        <TextInput label="현재 비밀번호" type="password" autoComplete="current-password" />
        <TextInput label="새 비밀번호" type="password" autoComplete="new-password" />
        <TextInput label="새 비밀번호 확인" type="password" autoComplete="new-password" />
        <p className="text-sm text-muted">비밀번호 변경은 인증 API 연결 후 사용할 수 있습니다.</p>
        <div className="flex justify-end">
          <Button disabled>비밀번호 변경</Button>
        </div>
      </section>
    </>
  );
}

export default ProfilePage;
