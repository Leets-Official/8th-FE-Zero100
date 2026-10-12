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
    </>
  );
}

export default ProfilePage;
