import { useState } from 'react';
import styles from './Input.module.css';

function Input(props) {
    const [inputValue, setInputValue] = useState('');

    const addWork = () => {
        props.newWork(inputValue);
        setInputValue('');
    }

    return (
        <div className={styles.wrap}>
            <input type="text" value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            placeholder='새 할 일 추가'/>

            <button className={styles.button} onClick={addWork}>추가</button>
        </div>
    )
}

export default Input;