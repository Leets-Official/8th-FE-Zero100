import { Navigate, Route, Routes } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import Toast from './components/dashboard/Toast.jsx';
import DeleteModal from './components/todo/DeleteModal.jsx';
import { useInquiries } from './hooks/dashboard/useInquiries.js';
import { useToast } from './hooks/dashboard/useToast.js';
import { useUser } from './hooks/dashboard/useUser.js';
import { useTodos } from './hooks/todo/useTodos.js';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import InquiryCreatePage from './pages/dashboard/InquiryCreatePage.jsx';
import InquiryDetailPage from './pages/dashboard/InquiryDetailPage.jsx';
import InquiryListPage from './pages/dashboard/InquiryListPage.jsx';
import LoginPage from './pages/dashboard/LoginPage.jsx';
import MyPage from './pages/dashboard/MyPage.jsx';
import SignupPage from './pages/dashboard/SignupPage.jsx';
import CompletedTodoPage from './pages/todo/CompletedTodoPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';

function App() {
  const { todos, addTodo, toggleTodo, editTodo, deleteTodo } = useTodos();
  const { inquiries, isLoading, getInquiryById, addInquiry, deleteInquiry } = useInquiries();
  const { user, changeName } = useUser();
  const { toastMessage, showToast } = useToast();

  const handleDeleteInquiry = (id, onDeleted) =>
    deleteInquiry(id, () => {
      onDeleted();
      showToast('문의가 삭제되었습니다.');
    });

  const handleChangeName = (name) => {
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
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage user={user} />} />
          <Route path="/dashboard/inquiries" element={<InquiryListPage inquiries={inquiries} />} />
          <Route
            path="/dashboard/inquiries/new"
            element={<InquiryCreatePage onAddInquiry={addInquiry} />}
          />
          <Route
            path="/dashboard/inquiries/:id"
            element={
              <InquiryDetailPage
                isLoading={isLoading}
                getInquiryById={getInquiryById}
                onDeleteInquiry={handleDeleteInquiry}
              />
            }
          />
          <Route
            path="/dashboard/mypage"
            element={
              <MyPage onChangeName={handleChangeName} onChangePassword={handleChangePassword} />
            }
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

      <DeleteModal onConfirm={deleteTodo} />
      <Toast message={toastMessage} />
    </>
  );
}

export default App;
