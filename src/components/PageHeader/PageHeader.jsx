import './PageHeader.css';

function PageHeader({ title, navLabel, subtitle }) {
  return (
    <header className="page-header">
      <div className="page-title-row">
        <h1 className="page-title">{title}</h1>
        <button className="page-nav-link" type="button">
          {navLabel}
        </button>
      </div>
      {subtitle && (
        <div className="page-subtitle-wrapper">
          <h2 className="page-subtitle">{subtitle}</h2>
        </div>
      )}
    </header>
  );
}

export default PageHeader;
