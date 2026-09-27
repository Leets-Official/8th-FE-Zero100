import { useState } from 'react';

function Input(props) {
    const [inputValue, setInputValue] = useState('');

    const addWork = () => {
        
    }

    return (
        <>
            <input type="text" value={value}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder='새 할 일 추가'/>

            <button>추가</button>
        </>
    )
}

export default Input;