function Checkbox(props) {
    return <input type="checkbox" checked={props.checked} onChange={props.onChange} />
}

export default Checkbox;