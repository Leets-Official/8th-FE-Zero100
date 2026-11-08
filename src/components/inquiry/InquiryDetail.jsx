function InquiryDetail(props) {
  const { inquiry } = props;

  return (
    <article className="overflow-hidden rounded-[10px] bg-white outline -outline-offset-1 outline-gray-200">
      <header className="flex flex-col gap-3 border-b border-gray-200 px-8 py-6">
        <p className="text-sm leading-5 text-gray-500">{inquiry.createdAt}</p>
        <h2 className="text-2xl leading-8 font-bold text-black">{inquiry.title}</h2>
      </header>

      <dl className="grid grid-cols-2 gap-8 border-b border-gray-200 bg-gray-50 px-8 py-5">
        <div className="flex flex-col gap-1.5">
          <dt className="text-xs leading-4 text-gray-500">작성자</dt>
          <dd className="text-sm leading-5 font-medium text-black">{inquiry.author}</dd>
        </div>
        <div className="flex flex-col gap-1.5">
          <dt className="text-xs leading-4 text-gray-500">이메일</dt>
          <dd className="text-sm leading-5 font-medium text-black">{inquiry.email}</dd>
        </div>
      </dl>

      <section className="flex flex-col gap-4 px-8 py-6">
        <h3 className="text-xs leading-4 font-bold text-gray-500">문의 내용</h3>
        <p className="text-sm leading-6 whitespace-pre-line text-slate-800">{inquiry.content}</p>
      </section>
    </article>
  );
}

export default InquiryDetail;
