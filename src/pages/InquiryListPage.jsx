import { Link } from 'react-router';
import { ROUTES, getInquiryDetailPath } from '../constants/routes';
import { mockInquiries } from '../data/inquiries';

const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hourCycle: 'h23',
});

function formatCreatedAt(value) {
  const parts = dateFormatter.formatToParts(new Date(value));

  const getPart = (type) => parts.find((part) => part.type === type)?.value ?? '';

  return `${getPart('year')}년 ${getPart('month')}월 ${getPart('day')}일 ${getPart('hour')}:${getPart('minute')}`;
}

function InquiryListPage() {
  return (
    <section aria-labelledby="inquiry-list-title" className="flex flex-col gap-[24px]">
      <div className="flex min-h-[40px] items-center justify-between gap-[16px]">
        <h2 id="inquiry-list-title" className="text-[24px] leading-[32px] font-bold text-[#000000]">
          문의 목록
        </h2>

        <Link
          to={ROUTES.INQUIRY_CREATE}
          className="inline-flex shrink-0 items-center justify-center rounded-[10px] bg-[#000000] px-[24px] py-[10px] text-[14px] leading-[20px] font-medium text-[#FFFFFF] hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-[#364153]"
        >
          문의 등록
        </Link>
      </div>

      <div className="overflow-hidden rounded-[10px] border border-[#E5E7EB] bg-[#FFFFFF]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] table-fixed border-collapse text-left text-[14px] leading-[20px]">
            <caption className="sr-only">문의 번호, 제목, 작성일 목록</caption>

            <colgroup>
              <col className="w-[80px]" />
              <col />
              <col className="w-[192px]" />
            </colgroup>

            <thead className="bg-[#F3F4F6] text-[#364153]">
              <tr className="border-b border-[#E5E7EB]">
                <th scope="col" className="px-[16px] py-[14px] font-bold">
                  번호
                </th>

                <th scope="col" className="px-[16px] py-[14px] font-bold">
                  제목
                </th>

                <th scope="col" className="px-[16px] py-[14px] font-bold">
                  작성일
                </th>
              </tr>
            </thead>

            <tbody>
              {mockInquiries.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-[16px] py-[48px] text-center text-[#4A5565]">
                    등록된 문의가 없습니다.
                  </td>
                </tr>
              ) : (
                mockInquiries.map((inquiry, index) => (
                  <tr
                    key={inquiry.id}
                    className="border-b border-[#E5E7EB] last:border-b-0 hover:bg-[#F9FAFB]"
                  >
                    <td className="px-[16px] py-[14px] text-[#000000]">{index + 1}</td>

                    <td className="px-[16px] py-[14px]">
                      <Link
                        to={getInquiryDetailPath(inquiry.id)}
                        className="block rounded-[2px] font-medium break-words text-[#000000] hover:underline focus-visible:outline-2 focus-visible:outline-[#364153]"
                      >
                        {inquiry.title}
                      </Link>
                    </td>

                    <td className="px-[16px] py-[14px] whitespace-nowrap text-[#4A5565]">
                      <time dateTime={inquiry.createdAt}>{formatCreatedAt(inquiry.createdAt)}</time>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default InquiryListPage;
