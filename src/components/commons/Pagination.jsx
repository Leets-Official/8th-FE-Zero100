import Button from './Button';

export default function Pagination({ page, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  return (
    <nav className="pagination" aria-label="게시글 페이지">
      <Button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        이전
      </Button>
      <span role="status">
        {page} / {totalPages} 페이지
      </span>
      <Button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        다음
      </Button>
    </nav>
  );
}
