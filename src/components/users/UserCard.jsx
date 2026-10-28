import Icon from '../commons/Icon';
import { getInitials } from '../../utils/search';

export default function UserCard({ user }) {
  return (
    <article className="user-card">
      <div className="flex items-start justify-between gap-3">
        <span className={`avatar avatar-tone-${user.id % 4}`}>{getInitials(user.name)}</span>
        <span className="user-id">#{String(user.id).padStart(2, '0')}</span>
      </div>
      <h2>{user.name}</h2>
      <p className="user-handle">@{user.username}</p>
      <p className="user-company">
        {typeof user.company?.name === 'string' ? user.company.name : '회사 정보 없음'}
      </p>
      <div className="user-detail">
        <Icon name="mail" size={16} />
        <a href={`mailto:${encodeURIComponent(user.email)}`}>{user.email}</a>
      </div>
      <div className="user-detail">
        <Icon name="pin" size={16} />
        <span>{typeof user.address?.city === 'string' ? user.address.city : '지역 정보 없음'}</span>
      </div>
    </article>
  );
}
