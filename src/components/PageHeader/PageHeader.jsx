import { Link } from 'react-router-dom';
import './PageHeader.css';

function PageHeader({ title, navLabel, navTo, subtitle }) {
  return (
    <header className="page-header">
      <div className="page-title-row">
        <h1 className="page-title">{title}</h1>
        <Link className="page-nav-link" to={navTo}>
          {navLabel}
        </Link>
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
