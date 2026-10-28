import { Link } from 'react-router';
import Icon from '../commons/Icon';

export default function StatCard({ label, value, caption, icon, to, tone = 'indigo' }) {
  return (
    <Link to={to} className={`metric-card metric-card--${tone}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="metric-label">{label}</span>
        <span className="metric-icon">
          <Icon name={icon} />
        </span>
      </div>
      <strong className="metric-value">{value}</strong>
      <p>
        {caption}
        <Icon name="arrow" size={16} />
      </p>
    </Link>
  );
}
