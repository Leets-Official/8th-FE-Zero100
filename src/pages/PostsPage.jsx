import { useState } from 'react';
import { getPosts } from '../api/dashboard';
import { useApiResource } from '../hooks/useApiResource';
import { filterPosts } from '../utils/search';
import PageHeading from '../components/commons/PageHeading';
import TextInput from '../components/commons/TextInput';
import Button from '../components/commons/Button';
import Icon from '../components/commons/Icon';
import AsyncState from '../components/commons/AsyncState';
import RequestStatus from '../components/commons/RequestStatus';
import EmptyState from '../components/commons/EmptyState';
import Pagination from '../components/commons/Pagination';
import PostCard from '../components/posts/PostCard';

const PAGE_SIZE = 9;

export default function PostsPage() {
  const resource = useApiResource(getPosts);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const posts = filterPosts(resource.data ?? [], query);
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const visiblePosts = posts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateQuery(value) {
    setQuery(value);
    setPage(1);
  }
  return (
    <>
      <PageHeading title="게시글" description="다양한 이야기를 읽고 새로운 소식을 확인하세요.">
        <Button onClick={resource.reload} disabled={resource.status === 'loading'}>
          <Icon name="refresh" size={16} />
          새로고침
        </Button>
      </PageHeading>
      <div className="list-toolbar">
        <TextInput
          label="게시글 검색"
          hideLabel
          search
          type="search"
          placeholder="제목 또는 내용으로 검색"
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
        />
        <RequestStatus status={resource.status} />
      </div>
      <AsyncState {...resource} onRetry={resource.reload}>
        <p className="result-count" role="status">
          총 <strong>{posts.length}</strong>개의 게시글
        </p>
        {visiblePosts.length ? (
          <div className="post-grid">
            {visiblePosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyState
            title={query ? '검색 결과가 없어요' : '게시글이 없어요'}
            description="다른 검색어를 입력하거나 나중에 다시 확인해 주세요."
          >
            {query && <Button onClick={() => updateQuery('')}>검색 초기화</Button>}
          </EmptyState>
        )}
        <Pagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </AsyncState>
    </>
  );
}
