import { Link } from 'react-router';
import Card from './Card.jsx';

const HEADER_CELL_CLASS_NAME =
  'box-border h-[44.5px] px-[16px] pt-[10px] pb-0 align-top text-left font-[family-name:var(--font-family-base)] font-bold text-[14px] leading-[20px] tracking-[0px] text-[#364153]';

const CELL_CLASS_NAME =
  'box-border px-[16px] pt-[12.5px] pb-0 align-top font-[family-name:var(--font-family-base)] text-[14px] leading-[20px] tracking-[0px]';

// Figma 문의 화면의 문의 목록 테이블
function InquiryTable({ inquiries }) {
  return (
    <Card className="overflow-x-auto">
      <table aria-label="문의 목록" className="w-full min-w-[640px] table-fixed border-collapse">
        <colgroup>
          <col className="w-[80px]" />
          <col />
          <col className="w-[192px]" />
        </colgroup>
        <thead>
          <tr className="border-0 border-b-[0.93px] border-solid border-[#e5e7eb] bg-[#f9fafb]">
            <th scope="col" className={HEADER_CELL_CLASS_NAME}>
              번호
            </th>
            <th scope="col" className={HEADER_CELL_CLASS_NAME}>
              제목
            </th>
            <th scope="col" className={HEADER_CELL_CLASS_NAME}>
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry) => (
            <tr
              key={inquiry.id}
              className="relative h-[48.9px] border-0 border-b-[0.93px] border-solid border-[#f3f4f6] last:h-[48.5px] last:border-b-0"
            >
              <td className={`${CELL_CLASS_NAME} font-normal text-[#000000]`}>{inquiry.id}</td>
              <td className={`${CELL_CLASS_NAME} font-medium wrap-anywhere`}>
                <Link
                  to={`/dashboard/inquiries/${inquiry.id}`}
                  className="text-[#000000] no-underline after:absolute after:inset-0"
                >
                  {inquiry.title}
                </Link>
              </td>
              <td className={`${CELL_CLASS_NAME} font-normal text-[#4a5565]`}>
                {inquiry.createdAt}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Card>
  );
}

export default InquiryTable;
