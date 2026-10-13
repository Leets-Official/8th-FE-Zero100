import Button from './Button';

export default function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null;
  const first = Math.max(1, Math.min(page - 2, totalPages - 4));
  const pages = Array.from({ length: Math.min(5, totalPages) }, (_, index) => first + index);
  return (
    <nav className="pagination" aria-label="문의 목록 페이지">
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onChange(1)}
        aria-label="첫 페이지"
      >
        «
      </Button>
      <Button
        variant="secondary"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="이전 페이지"
      >
        ‹
      </Button>
      {pages.map((number) => (
        <Button
          key={number}
          variant={number === page ? 'primary' : 'secondary'}
          aria-current={number === page ? 'page' : undefined}
          aria-label={`${number}페이지`}
          onClick={() => onChange(number)}
        >
          {number}
        </Button>
      ))}
      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="다음 페이지"
      >
        ›
      </Button>
      <Button
        variant="secondary"
        disabled={page === totalPages}
        onClick={() => onChange(totalPages)}
        aria-label="마지막 페이지"
      >
        »
      </Button>
    </nav>
  );
}
