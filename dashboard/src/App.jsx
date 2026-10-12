import Toast from './components/Toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-8">
          <Toast message="문의가 삭제되었습니다." />
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default App;
