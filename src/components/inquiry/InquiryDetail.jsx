import './InquiryDetail.css';

const InquiryDetail = ({ inquiry }) => {
  return (
    <article className="inquiry-detail">
      <header className="inquiry-detail__head">
        <p className="inquiry-detail__date">{inquiry.createdAt}</p>
        <h3 className="inquiry-detail__title">{inquiry.title}</h3>
      </header>

      <dl className="inquiry-detail__author">
        <div className="inquiry-detail__author-item">
          <dt className="inquiry-detail__author-label">작성자</dt>
          <dd className="inquiry-detail__author-value">{inquiry.name}</dd>
        </div>
        <div className="inquiry-detail__author-item">
          <dt className="inquiry-detail__author-label">이메일</dt>
          <dd className="inquiry-detail__author-value">{inquiry.email}</dd>
        </div>
      </dl>

      <section className="inquiry-detail__body">
        <h4 className="inquiry-detail__body-label">문의 내용</h4>
        <p className="inquiry-detail__content">{inquiry.content}</p>
      </section>
    </article>
  );
};

export default InquiryDetail;
