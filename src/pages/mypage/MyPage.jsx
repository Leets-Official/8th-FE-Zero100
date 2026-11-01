import NameChangeForm from '../../components/mypage/NameChangeForm';
import PasswordChangeForm from '../../components/mypage/PasswordChangeForm';
import SettingsCard from '../../components/mypage/SettingsCard';

function MyPage() {
  return (
    <div className="mx-auto flex w-full max-w-[672px] flex-col gap-5">
      <h1 className="text-2xl leading-8 font-bold text-black">마이페이지</h1>
      <div className="flex flex-col gap-7">
        <SettingsCard title="이름 변경">
          <NameChangeForm />
        </SettingsCard>
        <SettingsCard title="비밀번호 변경">
          <PasswordChangeForm />
        </SettingsCard>
      </div>
    </div>
  );
}

export default MyPage;
