import { useState } from 'react';
import Button from '../common/ButtonView';
import type { InquiryQuery, InquiryFilterUpdates } from '../../types/inquiry';

interface InquiryFiltersProps {
  options: InquiryQuery;
  onChange: (updates: InquiryFilterUpdates) => void;
}

export default function InquiryListFilters({ options, onChange }: InquiryFiltersProps) {
  const [query, setQuery] = useState(options.query);
  const [field, setField] = useState<string>(options.field);
  return (
    <div className="inquiry-filters">
      <form
        className="inquiry-search"
        onSubmit={(event) => {
          event.preventDefault();
          onChange({ q: query.trim(), field });
        }}
      >
        <label className="sr-only" htmlFor="inquiry-search-field">
          검색 범위
        </label>
        <select
          id="inquiry-search-field"
          className="admin-input"
          value={field}
          onChange={(event) => setField(event.target.value)}
        >
          <option value="all">전체</option>
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="name">작성자</option>
        </select>
        <label className="sr-only" htmlFor="inquiry-search-query">
          검색어
        </label>
        <input
          id="inquiry-search-query"
          name="q"
          type="search"
          className="admin-input"
          placeholder="검색어를 입력하세요"
          value={query}
          maxLength={100}
          onChange={(event) => setQuery(event.target.value)}
        />
        <Button type="submit">검색</Button>
        <Button
          variant="secondary"
          onClick={() => {
            setQuery('');
            setField('all');
            onChange({ q: '', field: 'all', status: '', mine: '', sort: '', size: '' });
          }}
        >
          초기화
        </Button>
      </form>
      <div className="inquiry-filter-options">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={options.mine}
            onChange={(event) => onChange({ mine: event.target.checked ? 'true' : '' })}
          />
          내가 쓴 문의만
        </label>
        <div className="inquiry-selects">
          <label>
            <span className="sr-only">답변 상태</span>
            <select
              aria-label="답변 상태"
              className="admin-input"
              value={options.status}
              onChange={(event) => onChange({ status: event.target.value })}
            >
              <option value="all">전체 상태</option>
              <option value="pending">답변 대기</option>
              <option value="answered">답변 완료</option>
            </select>
          </label>
          <label>
            <span className="sr-only">정렬</span>
            <select
              aria-label="정렬"
              className="admin-input"
              value={options.sort}
              onChange={(event) => onChange({ sort: event.target.value })}
            >
              <option value="newest">최신순</option>
              <option value="oldest">오래된순</option>
              <option value="title">제목순</option>
            </select>
          </label>
          <label>
            <span className="sr-only">페이지당 문의 수</span>
            <select
              aria-label="페이지당 문의 수"
              className="admin-input"
              value={options.size}
              onChange={(event) => onChange({ size: event.target.value })}
            >
              <option value="5">5개씩 보기</option>
              <option value="10">10개씩 보기</option>
              <option value="20">20개씩 보기</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
}
