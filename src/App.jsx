import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import Toast from './components/dashboard/Toast.jsx';
import DeleteModal from './components/todo/DeleteModal.jsx';
import DashboardPage from './pages/dashboard/DashboardPage.jsx';
import InquiryCreatePage from './pages/dashboard/InquiryCreatePage.jsx';
import InquiryDetailPage from './pages/dashboard/InquiryDetailPage.jsx';
import InquiryListPage from './pages/dashboard/InquiryListPage.jsx';
import LoginPage from './pages/dashboard/LoginPage.jsx';
import MyPage from './pages/dashboard/MyPage.jsx';
import SignupPage from './pages/dashboard/SignupPage.jsx';
import CompletedTodoPage from './pages/todo/CompletedTodoPage.jsx';
import TodoPage from './pages/todo/TodoPage.jsx';
import { formatInquiryDate } from './utils/dashboard/date.js';
import { loadInquiries, saveInquiries } from './utils/dashboard/inquiryStorage.js';
import { loadUser, saveUser } from './utils/dashboard/userStorage.js';
import { loadTodos, saveTodos } from './utils/todo/storage.js';

const TOAST_DURATION_MS = 3000;

// 두 페이지가 같은 todos를 보여줘야 하므로, 두 페이지의 공통 부모인 App에서 state를 관리한다.
function App() {
  const [todos, setTodos] = useState(loadTodos);
  // 문의 목록과 문의 등록 페이지가 같은 데이터를 쓰도록 todos와 같은 방식으로 App에서 관리한다.
  const [inquiries, setInquiries] = useState(loadInquiries);
  const [user, setUser] = useState(loadUser);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  useEffect(() => {
    saveInquiries(inquiries);
  }, [inquiries]);

  useEffect(() => {
    saveUser(user);
  }, [user]);

  useEffect(() => {
    if (!toast) return;

    const timerId = setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => clearTimeout(timerId);
  }, [toast]);

  const handleAddTodo = (title) => {
    const newTodo = { id: crypto.randomUUID(), title, completed: false };
    setTodos([...todos, newTodo]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)),
    );
  };

  const handleEditTodo = (id, title) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddInquiry = (inquiry) => {
    const id = Math.max(0, ...inquiries.map((item) => item.id)) + 1;
    const newInquiry = { ...inquiry, id, createdAt: formatInquiryDate(new Date()) };
    setInquiries([...inquiries, newInquiry]);
  };

  const handleDeleteInquiry = (id) => {
    setInquiries(inquiries.filter((inquiry) => inquiry.id !== id));
    setToast({ message: '문의가 삭제되었습니다.' });
  };

  const handleChangeName = (name) => {
    setUser({ ...user, name });
    setToast({ message: '이름이 변경되었습니다.' });
  };

  const handleChangePassword = () => {
    setToast({ message: '비밀번호가 변경되었습니다.' });
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
              onAddTodo={handleAddTodo}
              onToggleTodo={handleToggleTodo}
              onEditTodo={handleEditTodo}
            />
          }
        />
        <Route
          path="/todolist/completed"
          element={
            <CompletedTodoPage
              todos={todos}
              onToggleTodo={handleToggleTodo}
              onEditTodo={handleEditTodo}
            />
          }
        />
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage user={user} />} />
          <Route path="/dashboard/inquiries" element={<InquiryListPage inquiries={inquiries} />} />
          <Route
            path="/dashboard/inquiries/new"
            element={<InquiryCreatePage onAddInquiry={handleAddInquiry} />}
          />
          <Route
            path="/dashboard/inquiries/:id"
            element={
              <InquiryDetailPage inquiries={inquiries} onDeleteInquiry={handleDeleteInquiry} />
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

      <DeleteModal onConfirm={handleDeleteTodo} />
      <Toast message={toast?.message} />
    </>
  );
}

export default App;
