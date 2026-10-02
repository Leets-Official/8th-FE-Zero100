import styles from './Text.module.css';

function Text(props) {
    return <span className={props.done ? styles.done : styles.normal}>{props.children}</span>;
}

export default Text;