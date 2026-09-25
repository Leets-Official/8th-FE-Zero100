import './PageLayout.css';

function PageLayout({ children }) {
  return (
    <div className="page-layout">
      <div className="page-content">{children}</div>
    </div>
  );
}

export default PageLayout;
