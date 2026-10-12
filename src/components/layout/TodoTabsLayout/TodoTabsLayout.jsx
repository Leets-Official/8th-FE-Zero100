import { Outlet } from 'react-router';
import { ROUTES } from '../../../constants/routes';
import PageHeader from '../PageHeader/PageHeader';
import PageLayout from '../PageLayout/PageLayout';
import TodoTabs from '../TodoTabs/TodoTabs';

/**
 * 중첩 라우팅의 부모 레이아웃.
 * 제목과 탭은 그대로 두고, <Outlet /> 자리에만 할 일 목록 / 통계 페이지가 바뀌어 들어간다.
 */
function TodoTabsLayout() {
  return (
    <PageLayout>
      <div className="flex flex-col gap-4">
        <PageHeader title="TodoMatic" linkTo={ROUTES.COMPLETED} linkLabel="완료 목록" />
        <TodoTabs />
      </div>
      <Outlet />
    </PageLayout>
  );
}

export default TodoTabsLayout;
