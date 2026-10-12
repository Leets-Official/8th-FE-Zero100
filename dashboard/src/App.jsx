import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Button from './components/Button';
import Modal from './components/Modal';
import Toast from './components/Toast';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleConfirm = () => {
    setIsModalOpen(false);
    setShowToast(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-1 flex-col items-start gap-4 p-8">
          <Button onClick={() => setIsModalOpen(true)}>모달 열기</Button>
          {showToast && <Toast message="문의가 삭제되었습니다." />}
        </main>
      </div>
      <Footer />

      {isModalOpen && (
        <Modal
          message="문의를 삭제하시겠습니까?"
          onCancel={() => setIsModalOpen(false)}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}

export default App;
