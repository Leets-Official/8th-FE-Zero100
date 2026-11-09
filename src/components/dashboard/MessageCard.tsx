import Button from './Button.tsx';
import Card from './Card.tsx';

// 로딩 중, 빈 목록, 조회 실패, 찾을 수 없음 등 데이터 대신 안내 문구를 보여주는 카드
// isError면 스크린리더가 바로 읽도록 role="alert", 그 외는 role="status"
interface MessageCardProps {
  message: string;
  isError?: boolean;
  // 다시 시도 등 안내와 함께 제공할 동작
  actionLabel?: string;
  onAction?: () => void;
}

function MessageCard({ message, isError = false, actionLabel, onAction }: MessageCardProps) {
  return (
    <Card className="flex flex-col items-start gap-[16px] p-[32px]">
      <p
        role={isError ? 'alert' : 'status'}
        className="m-0 font-[family-name:var(--font-family-base)] font-normal text-[14px] leading-[20px] tracking-[0px] text-[#4a5565]"
      >
        {message}
      </p>
      {actionLabel && onAction && (
        <Button variant="secondary" size="small" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </Card>
  );
}

export default MessageCard;
