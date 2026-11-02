function AuthLayout({ title, footer, children }) {
  return (
    <main className="grid min-h-dvh place-items-center bg-white px-5 py-12">
      <section aria-labelledby="auth-title" className="w-full max-w-sm">
        <h1 id="auth-title" className="mb-5 text-center text-lg font-semibold text-[#171717]">
          {title}
        </h1>
        {children}
        <div className="mt-6 text-center text-xs text-[#868e96]">{footer}</div>
      </section>
    </main>
  );
}

export default AuthLayout;
