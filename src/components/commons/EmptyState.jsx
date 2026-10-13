import Icon from './Icon';

export default function EmptyState({ title = '표시할 내용이 없어요', description, children }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-icon">
        <Icon name="search" size={24} />
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
