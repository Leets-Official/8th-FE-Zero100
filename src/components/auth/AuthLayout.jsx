export default function AuthLayout({ title, children }) {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <h1>{title}</h1>
        {children}
      </section>
      <p className="auth-demo-label">로컬 데모 · 이 브라우저에만 데이터가 저장됩니다.</p>
    </main>
  );
}
