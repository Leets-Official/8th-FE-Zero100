import { useId } from 'react';

import './AuthLayout.css';

const AuthLayout = ({ title, className = '', children }) => {
  const titleId = useId();

  return (
    <main className={`auth-page ${className}`.trim()}>
      <section className="auth-card" aria-labelledby={titleId}>
        <h1 id={titleId} className="auth-title">
          {title}
        </h1>
        {children}
      </section>
    </main>
  );
};

export default AuthLayout;
