import LinkButton from '../components/common/LinkButton.jsx';
import PageHeading from '../components/layout/PageHeading.jsx';

function NotFoundPage() {
  return (
    <>
      <PageHeading
        title="페이지를 찾을 수 없어요"
        description="주소를 확인하거나 대시보드로 이동해 주세요."
      />
      <LinkButton to="/">대시보드로 이동</LinkButton>
    </>
  );
}

export default NotFoundPage;
