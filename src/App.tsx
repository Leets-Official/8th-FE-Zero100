import { Navigate, Route, Routes } from 'react-router';
import AuthRoute from './components/dashboard/AuthRoute.tsx';
import DashboardLayout from './components/dashboard/DashboardLayout.tsx';
import Toast from './components/dashboard/Toast.tsx';
import DeleteModal from './components/todo/DeleteModal.tsx';
import { useToast } from './hooks/dashboard/useToast.ts';
import { useUser } from './hooks/dashboard/useUser.ts';
import { useTodos } from './hooks/todo/useTodos.ts';
import DashboardPage from './pages/dashboard/DashboardPage.tsx';
import InquiryCreatePage from './pages/dashboard/InquiryCreatePage.tsx';
import InquiryDetailPage from './pages/dashboard/InquiryDetailPage.tsx';
import InquiryListPage from './pages/dashboard/InquiryListPage.tsx';
import KakaoCallbackPage from './pages/dashboard/KakaoCallbackPage.tsx';
import LoginPage from './pages/dashboard/LoginPage.tsx';
import MyPage from './pages/dashboard/MyPage.tsx';
import SignupPage from './pages/dashboard/SignupPage.tsx';
import CompletedTodoPage from './pages/todo/CompletedTodoPage.tsx';
import TodoPage from './pages/todo/TodoPage.tsx';

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();
  const { user, changeName } = useUser();
  const { toastMessage, showToast } = useToast();

  const handleChangeName = (name: string) => {
    changeName(name);
    showToast('이름이 변경되었습니다.');
  };

  const handleChangePassword = () => {
    showToast('비밀번호가 변경되었습니다.');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/todolist" replace />} />
        <Route
          path="/todolist"
          element={
            <TodoPage
              todos={todos}
              onAddTodo={addTodo}
              onToggleTodo={toggleTodo}
              onEditTodo={editTodo}
            />
          }
        />
        <Route
          path="/todolist/completed"
          element={
            <CompletedTodoPage todos={todos} onToggleTodo={toggleTodo} onEditTodo={editTodo} />
          }
        />
        <Route element={<AuthRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage user={user} />} />
            <Route path="/dashboard/inquiries" element={<InquiryListPage />} />
            <Route
              path="/dashboard/inquiries/new"
              element={<InquiryCreatePage onCreated={() => showToast('문의가 등록되었습니다.')} />}
            />
            <Route
              path="/dashboard/inquiries/:id"
              element={<InquiryDetailPage onDeleted={() => showToast('문의가 삭제되었습니다.')} />}
            />
            <Route
              path="/dashboard/mypage"
              element={
                <MyPage onChangeName={handleChangeName} onChangePassword={handleChangePassword} />
              }
            />
          </Route>
        </Route>
        <Route element={<AuthRoute guestOnly />}>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/auth/kakao/callback"
            element={
              <KakaoCallbackPage
                onUnregistered={() =>
                  showToast('가입된 계정이 없습니다. 회원가입 후 카카오 계정이 연결됩니다.')
                }
              />
            }
          />
          <Route
            path="/signup"
            element={<SignupPage onSignup={() => showToast('회원가입이 완료되었습니다.')} />}
          />
        </Route>
      </Routes>

      <DeleteModal onConfirm={deleteTodo} />
      <Toast message={toastMessage} />
    </>
  );
}

export default App;
