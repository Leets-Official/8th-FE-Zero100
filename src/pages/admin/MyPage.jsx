import NameChangeForm from '../../components/account/NameChangeForm';
import PasswordChangeForm from '../../components/account/PasswordChangeForm';
export default function MyPage() {
  return (
    <div className="form-page">
      <h1 className="admin-page-title">마이페이지</h1>
      <div className="account-forms">
        <NameChangeForm />
        <PasswordChangeForm />
      </div>
    </div>
  );
}
