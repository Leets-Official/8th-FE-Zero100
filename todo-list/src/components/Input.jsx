import { useState } from 'react';

function Input(props) {
    const [inputValue, setInputValue] = useState('');

    const addWork = () => {
        props.newWork(inputValue);
        setInputValue('');
    }

    return (
        <>
            <input type="text" value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder='새 할 일 추가'/>

            <button onClick={addWork}>추가</button>
        </>
    )
}

export default Input;