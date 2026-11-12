import { Link } from 'react-router';
import { getInquiryDetailPath } from '../../../constants/routes';

// Figma 기준: 머리글 줄 높이 44px, 내용 줄 높이 48px
const HEAD_CELL_CLASS = 'px-4 py-3 text-sm leading-5 font-bold';
const CELL_CLASS = 'px-4 py-3.5 text-sm leading-5';

/**
 * 문의 목록 표. 번호는 화면에 보이는 순서(최신 문의가 1번)로 매긴다.
 * 제목을 링크로 만들어서 키보드로도 상세 페이지로 이동할 수 있게 한다.
 */
function InquiryTable({ inquiries }) {
  if (inquiries.length === 0) {
    return (
      <p className="rounded-[10px] border border-dash-line bg-white py-12 text-center text-sm text-dash-muted">
        등록된 문의가 없어요.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto rounded-[10px] border border-dash-line bg-white">
      <table className="w-full min-w-[560px] table-fixed text-left">
        <thead className="bg-dash-bg text-dash-text">
          <tr>
            <th scope="col" className={`${HEAD_CELL_CLASS} w-20`}>
              번호
            </th>
            <th scope="col" className={HEAD_CELL_CLASS}>
              제목
            </th>
            <th scope="col" className={`${HEAD_CELL_CLASS} w-48`}>
              작성일
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-dash-active border-t border-dash-line">
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.id} className="transition-colors hover:bg-dash-bg">
              <td className={`${CELL_CLASS} text-dash-black`}>{index + 1}</td>
              <td className={CELL_CLASS}>
                <Link
                  to={getInquiryDetailPath(inquiry.id)}
                  className="block truncate rounded-sm font-medium text-dash-black hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dash-muted"
                >
                  {inquiry.title}
                </Link>
              </td>
              <td className={`${CELL_CLASS} text-dash-text-sub`}>
                {/* 서버가 "2026년 3월 25일 17:11" 형태로 보내 주므로 그대로 보여준다. */}
                {inquiry.created_at}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InquiryTable;
