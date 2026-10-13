import { Link } from 'react-router';
import { getPosts, getUsers } from '../api/dashboard';
import { useApiResource } from '../hooks/useApiResource';
import { useTasks } from '../hooks/useTasks';
import PageHeading from '../components/commons/PageHeading';
import Button from '../components/commons/Button';
import Card from '../components/commons/Card';
import Icon from '../components/commons/Icon';
import AsyncState from '../components/commons/AsyncState';
import RequestStatus from '../components/commons/RequestStatus';
import EmptyState from '../components/commons/EmptyState';
import StatCard from '../components/dashboard/StatCard';
import TaskOverview from '../components/dashboard/TaskOverview';
import { getInitials } from '../utils/search';

export default function DashboardPage() {
  const users = useApiResource(getUsers);
  const posts = useApiResource(getPosts);
  const { stats } = useTasks();
  const isLoading = users.status === 'loading' || posts.status === 'loading';
  const count = (resource) => (resource.status === 'success' ? resource.data.length : '—');
  return (
    <>
      <PageHeading title="대시보드" description="오늘의 할 일과 새로운 소식을 한눈에 확인하세요.">
        <Button
          disabled={isLoading}
          onClick={() => {
            users.reload();
            posts.reload();
          }}
        >
          <Icon name="refresh" size={16} />
          새로고침
        </Button>
      </PageHeading>
      <section className="welcome-banner" aria-label="환영 인사">
        <div>
          <span className="welcome-label">A LITTLE PROGRESS, EVERY DAY</span>
          <h2>좋은 하루예요 👋</h2>
          <p>오늘도 하나씩, 나만의 속도로 시작해 볼까요?</p>
          <Link to="/tasks" className="welcome-link">
            나의 할 일 확인하기 <Icon name="arrow" size={16} />
          </Link>
        </div>
        <div className="welcome-art" aria-hidden="true">
          <span>0</span>
          <Icon name="arrow" size={38} />
          <strong>100</strong>
        </div>
      </section>
      <section className="metrics-grid" aria-label="대시보드 요약">
        <StatCard
          label="전체 사용자"
          value={count(users)}
          caption="등록된 사용자 살펴보기"
          icon="users"
          to="/users"
        />
        <StatCard
          label="전체 게시글"
          value={count(posts)}
          caption="게시글 둘러보기"
          icon="document"
          to="/posts"
          tone="sky"
        />
        <StatCard
          label="진행 중인 할 일"
          value={stats.active}
          caption="오늘의 목표 이어가기"
          icon="check"
          to="/active"
          tone="orange"
        />
        <StatCard
          label="할 일 완료율"
          value={`${stats.rate}%`}
          caption={`${stats.total}개 중 ${stats.completed}개 완료`}
          icon="chart"
          to="/stats"
          tone="green"
        />
      </section>
      <div className="overview-grid">
        <Card
          title="게시글 미리보기"
          description="공개 예제 데이터의 첫 번째 게시글들이에요."
          action={
            <Link to="/posts" className="text-link">
              전체 보기 →
            </Link>
          }
        >
          <RequestStatus status={posts.status} />
          <AsyncState {...posts} onRetry={posts.reload}>
            {posts.data?.length ? (
              <ul className="post-preview-list">
                {posts.data.slice(0, 4).map((post) => (
                  <li key={post.id}>
                    <span className="preview-index">{String(post.id).padStart(2, '0')}</span>
                    <div>
                      <h3>{post.title}</h3>
                      <p>{post.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState title="게시글이 없어요" />
            )}
          </AsyncState>
        </Card>
        <TaskOverview />
      </div>
      <Card
        title="함께하는 사용자"
        description="공개 예제 API에 등록된 사용자입니다."
        action={
          <Link to="/users" className="text-link">
            전체 보기 →
          </Link>
        }
      >
        <RequestStatus status={users.status} />
        <AsyncState {...users} onRetry={users.reload}>
          {users.data?.length ? (
            <ul className="user-preview-grid">
              {users.data.slice(0, 5).map((user) => (
                <li key={user.id}>
                  <span className={`avatar avatar-tone-${user.id % 4}`}>
                    {getInitials(user.name)}
                  </span>
                  <strong>{user.name}</strong>
                  <span>@{user.username}</span>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState title="등록된 사용자가 없어요" />
          )}
        </AsyncState>
      </Card>
    </>
  );
}
