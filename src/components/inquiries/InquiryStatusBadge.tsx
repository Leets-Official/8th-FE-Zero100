import type { InquiryStatus } from '../../types/inquiry';
import '../../styles/inquiry-status.css';

export default function InquiryStatusBadge({ status }: { status: InquiryStatus }) {
  return (
    <span className={`inquiry-status inquiry-status--${status}`}>
      {status === 'answered' ? '답변 완료' : '답변 대기'}
    </span>
  );
}
