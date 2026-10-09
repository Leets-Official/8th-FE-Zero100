import Icon from '../Icon';

const Toast = ({
  message = '문의가 삭제되었습니다.',
  icon = <Icon name="checkCircle" size={20} color="#171717" />,
}) => {
  return (
    <div className="common-component common-toast" role="status" aria-live="polite">
      {icon}
      <span className="common-toast__message">{message}</span>
    </div>
  );
};

export default Toast;
