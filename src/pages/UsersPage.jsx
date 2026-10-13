import { useState } from 'react';
import { getUsers } from '../api/dashboard';
import { useApiResource } from '../hooks/useApiResource';
import { filterUsers } from '../utils/search';
import PageHeading from '../components/commons/PageHeading';
import TextInput from '../components/commons/TextInput';
import Button from '../components/commons/Button';
import Icon from '../components/commons/Icon';
import AsyncState from '../components/commons/AsyncState';
import RequestStatus from '../components/commons/RequestStatus';
import EmptyState from '../components/commons/EmptyState';
import UserCard from '../components/users/UserCard';

export default function UsersPage() {
  const resource = useApiResource(getUsers);
  const [query, setQuery] = useState('');
  const users = filterUsers(resource.data ?? [], query);
  return (
    <>
      <PageHeading title="사용자" description="함께하는 사람들의 프로필과 연락처를 확인하세요.">
        <Button onClick={resource.reload} disabled={resource.status === 'loading'}>
          <Icon name="refresh" size={16} />
          새로고침
        </Button>
      </PageHeading>
      <div className="list-toolbar">
        <TextInput
          label="사용자 검색"
          hideLabel
          search
          type="search"
          placeholder="이름, 이메일, 회사로 검색"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <RequestStatus status={resource.status} />
      </div>
      <AsyncState {...resource} onRetry={resource.reload}>
        <p className="result-count" role="status">
          총 <strong>{users.length}</strong>명의 사용자
        </p>
        {users.length ? (
          <div className="user-grid">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={query ? '검색 결과가 없어요' : '등록된 사용자가 없어요'}
            description={
              query ? '다른 이름이나 이메일로 검색해 보세요.' : '잠시 후 다시 확인해 주세요.'
            }
          >
            {query && <Button onClick={() => setQuery('')}>검색 초기화</Button>}
          </EmptyState>
        )}
      </AsyncState>
    </>
  );
}
