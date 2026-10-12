import Button from './components/Button';

function App() {
  return (
    <div className="flex flex-col items-start gap-4 p-10">
      <Button>Primary Button</Button>
      <Button variant="secondary">Secondary Button</Button>
      <Button variant="small">Small Button</Button>
    </div>
  );
}

export default App;
