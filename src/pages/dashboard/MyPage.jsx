import NameChangeCard from '../../components/dashboard/NameChangeCard.jsx';
import PageTitle from '../../components/dashboard/PageTitle.jsx';
import PasswordChangeCard from '../../components/dashboard/PasswordChangeCard.jsx';

function MyPage({ onChangeName, onChangePassword }) {
  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[672px] mx-auto">
      <PageTitle className="mt-[-3.9px] mb-[3.9px]">마이페이지</PageTitle>
      <div className="flex flex-col gap-[28px]">
        <NameChangeCard onChangeName={onChangeName} />
        <PasswordChangeCard onChangePassword={onChangePassword} />
      </div>
    </div>
  );
}

export default MyPage;
