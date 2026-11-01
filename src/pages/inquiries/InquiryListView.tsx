import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { getInquiries } from '../../api/inquiryApi';
import { useResource } from '../../hooks/useResource';
import { useAuth } from '../../hooks/useAuth';
import { parseInquiryQuery, selectInquiries } from '../../utils/inquiryQuery';
import ResourcePanel from '../../components/common/ResourcePanel';
import Button from '../../components/common/ButtonView';
import Pagination from '../../components/common/Pagination';
import InquiryListFilters from '../../components/inquiries/InquiryListFilters';
import InquiryListTable from '../../components/inquiries/InquiryListTable';
import type { InquiryFilterUpdates } from '../../types/inquiry';
import '../../styles/inquiry-list.css';

export default function InquiryListView() {
  const resource = useResource(getInquiries);
  const { user } = useAuth();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const options = parseInquiryQuery(params);
  const inquiries = resource.data ?? [];
  const result = selectInquiries(inquiries, options, user?.id ?? '');
  const listLocation = `${location.pathname}${location.search}`;
  useEffect(() => {
    if (
      resource.status === 'success' &&
      params.has('page') &&
      params.get('page') !== String(result.page)
    ) {
      setParams(
        (previous) => {
          const next = new URLSearchParams(previous);
          if (result.page === 1) next.delete('page');
          else next.set('page', String(result.page));
          return next;
        },
        { replace: true },
      );
    }
  }, [resource.status, params, result.page, setParams]);
  function changeFilters(updates: InquiryFilterUpdates) {
    setParams((previous) => {
      const next = new URLSearchParams(previous);
      next.delete('page');
      for (const [key, value] of Object.entries(updates)) {
        if (value === '') next.delete(key);
        else next.set(key, String(value));
      }
      return next;
    });
  }
  return (
    <>
      <div className="page-toolbar">
        <h1 className="admin-page-title">{options.mine ? '내가 쓴 문의' : '문의 목록'}</h1>
        <div className="detail-actions">
          <Button
            variant="secondary"
            onClick={resource.reload}
            disabled={resource.status === 'loading'}
          >
            새로고침
          </Button>
          <Link
            className="admin-button admin-button--primary"
            to="/inquiries/new"
            state={{ listLocation }}
          >
            문의 등록
          </Link>
        </div>
      </div>
      {resource.status === 'success' && (
        <div className="inquiry-overview" aria-label="문의 현황">
          <span>
            전체 <strong>{inquiries.length}</strong>
          </span>
          <span>
            답변 대기{' '}
            <strong>{inquiries.filter((item) => item.status === 'pending').length}</strong>
          </span>
          <span>
            답변 완료{' '}
            <strong>{inquiries.filter((item) => item.status === 'answered').length}</strong>
          </span>
        </div>
      )}
      <InquiryListFilters
        key={`${options.query}:${options.field}`}
        options={options}
        onChange={changeFilters}
      />
      <ResourcePanel status={resource.status} error={resource.error} onRetry={resource.reload}>
        <p className="inquiry-result-count" role="status">
          총 {result.total}건
          {result.total > 0 &&
            ` · ${result.offset + 1}–${result.offset + result.items.length}번째 문의`}
        </p>
        <InquiryListTable
          inquiries={result.items}
          offset={result.offset}
          listLocation={listLocation}
          emptyMessage={
            options.query
              ? '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.'
              : options.mine
                ? '아직 작성한 문의가 없습니다.'
                : options.status !== 'all'
                  ? '해당 상태의 문의가 없습니다.'
                  : '등록된 문의가 없습니다.'
          }
        />
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          onChange={(page: number) => changeFilters({ page })}
        />
      </ResourcePanel>
    </>
  );
}
