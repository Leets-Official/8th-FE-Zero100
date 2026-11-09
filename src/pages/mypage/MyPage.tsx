import { updateMyPassword } from '../../features/auth/api/authApi.ts';
import MessageCard from '../../components/common/MessageCard.tsx';
import NameChangeCard from '../../features/profile/components/NameChangeCard.tsx';
import PageTitle from '../../components/common/PageTitle.tsx';
import PasswordChangeCard from '../../features/profile/components/PasswordChangeCard.tsx';
import { useAuth } from '../../features/auth/context/AuthContext.ts';
import { useMyInfo } from '../../features/profile/useMyInfo.ts';

interface MyPageProps {
  onNameChanged: () => void;
  onPasswordChanged: () => void;
}

function MyPage({ onNameChanged, onPasswordChanged }: MyPageProps) {
  const { user, updateName } = useAuth();
  // 진입 시 서버에서 내 정보를 다시 조회해 현재 이름을 최신으로 맞춘다.
  const { errorMessage, reload } = useMyInfo();

  return (
    <div className="flex flex-col gap-[20px] w-full max-w-[672px] mx-auto">
      <PageTitle className="mt-[-3.9px] mb-[3.9px]">마이페이지</PageTitle>
      {errorMessage && (
        <MessageCard
          message={`내 정보를 불러오지 못했습니다. ${errorMessage}`}
          isError
          actionLabel="다시 시도"
          onAction={reload}
        />
      )}
      <div className="flex flex-col gap-[28px]">
        <NameChangeCard
          currentName={user?.name ?? ''}
          onSubmit={updateName}
          onSuccess={onNameChanged}
        />
        {/* 비밀번호 변경 응답에 새 토큰이 없고 Swagger에 토큰 무효화 안내도 없어 로그인 상태를 그대로 유지한다. */}
        <PasswordChangeCard onSubmit={updateMyPassword} onSuccess={onPasswordChanged} />
      </div>
    </div>
  );
}

export default MyPage;
