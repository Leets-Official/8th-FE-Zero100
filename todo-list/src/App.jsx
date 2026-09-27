import { useState } from 'react'
import Text from './components/Text';
import Button from './components/Button';
import Checkbox from './components/Checkbox';
import Input from './components/Input';
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
    setWork(work.filter((task) => task.id != id));
  };

  const display = work.filter((task) => {
    if (displayWork === 'inProgress') return task.done === false;
    if (displayWork === 'completed') return task.done === true;
    return true;
  })

  const editWork = (id) => {
    setWork(work.map((task) =>
      task.id === id ? {...task, edit: true, origin: task.text} : task
    ));
  };

  const changeText = (id, newText) => {
    setWork(work.map((task) =>
      task.id === id ? {...task, text: newText} : task
    ));
  };

  const saveEdit = (id) => {
    setWork(work.map((task) =>
      task.id === id ? {...task, edit: false, origin: undefined} : task
    ));
  };

  const cancelEdit = (id) => {
    setWork(work.map((task) =>
      task.id === id ? {...task, edit: false, text: task.origin} : task
    ));
  };

  return (
    <div className="app">
      <h1 className="title">TodoMatic</h1>
      <p className="midText">할 일을 입력하세요</p>
      <Input newWork={addWork} />

      <div className="displayRow">
        <Button variant={displayWork === 'total' ? 'primary' : 'default'} onClick={() => setDisplayWork('total')}>전체보기</Button>
        <Button variant={displayWork === 'inProgress' ? 'primary' : 'default'} onClick={() => setDisplayWork('inProgress')}>진행 중</Button>
        <Button variant={displayWork === 'completed' ? 'primary' : 'default'} onClick={() => setDisplayWork('completed')}>완료됨</Button>
      </div>

      <p className="midText">남은 할 일 {work.filter((task) => task.done === false).length}개</p>

      {display.map((task) => (
        <div className='taskCard' key={task.id}>
          <div className='taskCheck'>
            <Checkbox checked={task.done} onChange={() => checkClear(task.id)} />

            {task.edit ? (
              <input type="text" value={task.text} onChange={(event) => changeText(task.id, event.target.value)} />
            ) : (
              <Text done={task.done}>{task.text}</Text>
            )}
          </div>
          <div className='taskButtons'>
            {task.edit ? (
              <>
                <Button onClick={() => saveEdit(task.id)}>저장</Button>
                <Button onClick={() => cancelEdit(task.id)}>취소</Button>
              </>
            ) : (
              <>
                <Button onClick={() => editWork(task.id)}>수정</Button>
                <Button variant="delete" onClick={() => deleteWork(task.id)}>삭제</Button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
