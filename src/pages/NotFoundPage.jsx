import Text from '../components/common/Text/Text';
import PageHeader from '../components/layout/PageHeader/PageHeader';
import PageLayout from '../components/layout/PageLayout/PageLayout';
import { ROUTES } from '../constants/routes';

function NotFoundPage() {
  return (
    <PageLayout>
      <PageHeader title="TodoMatic" linkTo={ROUTES.HOME} linkLabel="할 일 목록으로" arrow="left" />
      <Text variant="caption" className="py-8 text-center">
        페이지를 찾을 수 없어요.
      </Text>
    </PageLayout>
  );
}

export default NotFoundPage;
