const dateFormatter = new Intl.DateTimeFormat('ko-KR', {
  timeZone: 'Asia/Seoul',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function InquiryTable({ inquiries }) {
  if (inquiries.length === 0)
    return (
      <p
        role="status"
        className="rounded-lg border border-line bg-white p-12 text-center text-sm text-muted"
      >
        등록된 문의가 없습니다.
      </p>
    );

  return (
    <div className="overflow-x-auto rounded-lg border border-line bg-white">
      <table className="w-full min-w-[560px] text-left text-sm">
        <caption className="sr-only">문의 목록: 번호, 제목, 작성일</caption>
        <thead className="border-b border-line bg-[#fafafa] text-xs text-[#495057]">
          <tr>
            <th scope="col" className="w-20 px-5 py-4 font-medium">
              번호
            </th>
            <th scope="col" className="px-5 py-4 font-medium">
              제목
            </th>
            <th scope="col" className="w-48 px-5 py-4 font-medium">
              작성일
            </th>
          </tr>
        </thead>
        <tbody>
          {inquiries.map((inquiry, index) => (
            <tr key={inquiry.id} className="border-b border-line last:border-b-0 hover:bg-page">
              <td className="px-5 py-5 text-muted">{index + 1}</td>
              <td className="px-5 py-5">{inquiry.title}</td>
              <td className="px-5 py-5 text-xs whitespace-nowrap text-muted">
                <time dateTime={inquiry.createdAt}>
                  {dateFormatter.format(new Date(inquiry.createdAt))}
                </time>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InquiryTable;
