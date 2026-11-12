import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { getMe } from '../../api/auth';
import { ROUTES } from '../../constants/routes';
import { getAccessToken, removeAccessToken } from '../../utils/authStorage';
import { getApiErrorMessage } from '../../utils/getApiErrorMessage';
import Button from '../dashboard/Button';

function RequireAuth() {
  const [accessToken] = useState(getAccessToken);
  const [attempt, setAttempt] = useState(0);

  const [auth, setAuth] = useState({
    status: 'checking',
    user: null,
    message: '',
  });

  useEffect(() => {
    if (!accessToken) return;

    const controller = new AbortController();

    async function checkAuth() {
      try {
        const user = await getMe({
          signal: controller.signal,
        });

        if (controller.signal.aborted) return;

        setAuth({
          status: 'authenticated',
          user,
          message: '',
        });
      } catch (error) {
        if (controller.signal.aborted) return;

        const status = error.response?.status;

        if (status === 401 || status === 404) {
          removeAccessToken();

          setAuth({
            status: 'unauthenticated',
            user: null,
            message: '',
          });

          return;
        }

        setAuth({
          status: 'error',
          user: null,
          message: getApiErrorMessage(error),
        });
      }
    }

    checkAuth();

    return () => controller.abort();
  }, [accessToken, attempt]);

  function handleRetry() {
    setAuth({
      status: 'checking',
      user: null,
      message: '',
    });

    setAttempt((prev) => prev + 1);
  }

  function updateUser(user) {
    setAuth((prev) => ({
      ...prev,
      user,
    }));
  }

  if (!accessToken || auth.status === 'unauthenticated') {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (auth.status === 'checking') {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-[#F9FAFB] p-[24px]">
        <p role="status" className="text-[14px] text-[#364153]">
          로그인 정보를 확인하고 있습니다.
        </p>
      </main>
    );
  }

  if (auth.status === 'error') {
    return (
      <main className="flex min-h-dvh flex-col items-center justify-center gap-[16px] bg-[#F9FAFB] p-[24px]">
        <p role="alert" className="text-[14px] text-[#364153]">
          {auth.message}
        </p>

        <Button onClick={handleRetry}>다시 시도</Button>
      </main>
    );
  }

  return (
    <Outlet
      context={{
        user: auth.user,
        updateUser,
      }}
    />
  );
}

export default RequireAuth;
