import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB]">
      <Header onLogout={() => alert('로그아웃')} />
      <main className="flex-1" />
      <Footer />
    </div>
  );
}

export default App;
