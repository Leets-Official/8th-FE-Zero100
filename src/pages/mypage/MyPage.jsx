import { useState } from 'react';

import TextInput from '../../components/common/TextInput';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import SettingsCard from '../../components/mypage/SettingsCard';

import './MyPage.css';

const INITIAL_PASSWORDS = { currentPassword: '', newPassword: '', confirmPassword: '' };

function MyPage() {
  const [name, setName] = useState('');
  const [passwords, setPasswords] = useState(INITIAL_PASSWORDS);

  const handlePasswordChange = (event) => {
    const { name: field, value } = event.target;
    setPasswords((previous) => ({ ...previous, [field]: value }));
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    // TODO: 이름 변경 API 연동
  };

  const handlePasswordSubmit = (event) => {
    event.preventDefault();
    // TODO: 비밀번호 변경 API 연동
  };

  return (
    <DashboardLayout>
      <div className="mypage">
        <h2 className="mypage__title">마이페이지</h2>

        <SettingsCard title="이름 변경" onSubmit={handleNameSubmit}>
          <TextInput
            name="name"
            aria-label="이름"
            placeholder="텍스트를 입력하세요"
            autoComplete="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </SettingsCard>

        <SettingsCard title="비밀번호 변경" onSubmit={handlePasswordSubmit}>
          <TextInput
            label="현재 비밀번호"
            type="password"
            name="currentPassword"
            placeholder="현재 비밀번호"
            autoComplete="current-password"
            value={passwords.currentPassword}
            onChange={handlePasswordChange}
          />
          <TextInput
            label="새 비밀번호"
            type="password"
            name="newPassword"
            placeholder="새 비밀번호"
            autoComplete="new-password"
            value={passwords.newPassword}
            onChange={handlePasswordChange}
          />
          <TextInput
            label="새 비밀번호 확인"
            type="password"
            name="confirmPassword"
            placeholder="새 비밀번호 확인"
            autoComplete="new-password"
            value={passwords.confirmPassword}
            onChange={handlePasswordChange}
          />
        </SettingsCard>
      </div>
    </DashboardLayout>
  );
}

export default MyPage;
