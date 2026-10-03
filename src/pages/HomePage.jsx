import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import FilterButtons from "../components/todo/FilterButtons";
import TodoItem from "../components/todo/TodoItem";
import TodoStats from "../components/todo/TodoStats";

function HomePage(props) {
    const [tab, setTab] = useState('list');
    const [displayWork, setDisplayWork] = useState('total');

    const display = props.tasks.filter((task) => {
        if (displayWork === 'inProgress') return task.done === false;
        return true;
    });

    return (
        <div className="app">
            <h1 className="title">TodoMatic</h1>
            <Link to="/completed">완료 목록 &rarr;</Link>

            <div>
                <button onClick={() => setTab('list')}>할 일 목록</button>
                <button onClick={() => setTab('stats')}>통계</button>
            </div>

            {tab === 'list' ? (
                <>
                    <Input newWork={props.onAdd} />

                    <FilterButtons filter={displayWork} onChange={setDisplayWork} />

                    <p className="midText">
                        남은 할 일 {props.tasks.filter((task) => task.done === false).length}개
                    </p>

                    {display.map((task) => (
                        <TodoItem
                            key={task.id}
                            task={task}
                            onToggle={props.onToggle}
                            onDelete={props.onDelete}
                            onUpdate={props.onUpdate}
                        />
                    ))}
                </>
            ) : (
                <TodoStats tasks={props.tasks} />
            )}
        </div>
    );
}

export default HomePage;