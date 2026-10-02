import { useState } from 'react'
import Input from './components/Input';
import FilterButtons from './components/todo/FilterButtons';
import TodoItem from './components/todo/TodoItem';
import './App.css'

function App() {
  const [work, setWork] = useState([]);
  const [addId, setAddId] = useState(1);
  const [displayWork, setDisplayWork] = useState('total');

  const addWork = (text) => {
    setWork([...work, {id: addId, text, done: false}]);
    setAddId(addId + 1);
  };

  const checkClear = (id) => {
    const newWork = work.map((task) => {
      if (task.id === id) {
        return {...task, done: !task.done};
      } else {
        return task;
      }
    });
    setWork(newWork);
  }

  const deleteWork = (id) => {
    setWork(work.filter((task) => task.id !== id));
  };

  const display = work.filter((task) => {
    if (displayWork === 'inProgress') return task.done === false;
    if (displayWork === 'completed') return task.done === true;
    return true;
  })

  const updateWork = (id, newText) => {
    setWork(work.map((task) =>
      task.id === id ? { ...task, text: newText } : task
    ));
  };

  return (
    <div className="app">
      <h1 className="title">TodoMatic</h1>
      <p className="midText">할 일을 입력하세요</p>
      <Input newWork={addWork} />

      <FilterButtons filter={displayWork} onChange={setDisplayWork}/>

      <p className="midText">남은 할 일 {work.filter((task) => task.done === false).length}개</p>

      {display.map((task) => (
        <TodoItem
          key={task.id}
          task={task}
          onToggle={checkClear}
          onDelete={deleteWork}
          onUpdate={updateWork}
        />
      ))}
    </div>
  );
}

export default App;
