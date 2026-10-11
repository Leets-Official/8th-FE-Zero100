import Button from '../../components/dashboard/Button';

function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1>공통 컴포넌트 예시 페이지</h1>
      <section className="flex items-center gap-3">
        <Button>Primary Button</Button>
        <Button variant="variant">Secondary Button</Button>
        <Button variant="small">Small Button</Button>
      </section>
    </div>
  );
}

export default DashboardPage;
