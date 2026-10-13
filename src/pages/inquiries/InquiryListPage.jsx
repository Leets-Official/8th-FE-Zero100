import { useEffect } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router';
import { getInquiries } from '../../api/admin';
import { useAdminResource } from '../../hooks/useAdminResource';
import { useAuth } from '../../hooks/useAuth';
import { parseInquiryQuery, selectInquiries } from '../../utils/inquiryList';
import AsyncPanel from '../../components/common/AsyncPanel';
import Pagination from '../../components/common/Pagination';
import InquiryFilters from '../../components/inquiries/InquiryFilters';
import InquiryTable from '../../components/inquiries/InquiryTable';

export default function InquiryListPage() {
  const resource = useAdminResource(getInquiries);
  const { user } = useAuth();
  const location = useLocation();
  const [params, setParams] = useSearchParams();
  const options = parseInquiryQuery(params);
  const result = selectInquiries(resource.data || [], options, user.id);
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
  function changeFilters(updates) {
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
        <Link
          className="admin-button admin-button--primary"
          to="/inquiries/new"
          state={{ listLocation }}
        >
          문의 등록
        </Link>
      </div>
      <InquiryFilters
        key={`${options.query}:${options.field}`}
        options={options}
        onChange={changeFilters}
      />
      <AsyncPanel {...resource} onRetry={resource.reload}>
        <p className="inquiry-result-count" role="status">
          총 {result.total}건
          {result.total > 0 &&
            ` · ${result.offset + 1}–${result.offset + result.items.length}번째 문의`}
        </p>
        <InquiryTable
          inquiries={result.items}
          offset={result.offset}
          listLocation={listLocation}
          emptyMessage={
            options.query
              ? '검색 결과가 없습니다. 다른 검색어를 입력해 주세요.'
              : options.mine
                ? '아직 작성한 문의가 없습니다.'
                : '등록된 문의가 없습니다.'
          }
        />
        <Pagination
          page={result.page}
          totalPages={result.totalPages}
          onChange={(page) => changeFilters({ page })}
        />
      </AsyncPanel>
    </>
  );
}
