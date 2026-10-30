import NameChangeCard from '../../components/dashboard/NameChangeCard.jsx';
import PasswordChangeCard from '../../components/dashboard/PasswordChangeCard.jsx';

function MyPage({ onChangeName, onChangePassword }) {
  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[672px] mx-auto">
      <h1 className="mt-[-3.9px] mx-0 mb-[3.9px] font-[family-name:var(--font-family-base)] font-bold text-[24px] leading-[32px] tracking-[0px] text-[#000000]">
        마이페이지
      </h1>
      <div className="flex flex-col gap-[28px]">
        <NameChangeCard onChangeName={onChangeName} />
        <PasswordChangeCard onChangePassword={onChangePassword} />
      </div>
    </div>
  );
}

export default MyPage;
