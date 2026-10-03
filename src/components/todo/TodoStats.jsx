function TodoStats(props) {
    const total = props.tasks.length;
    const completed = props.tasks.filter((task) => task.done === true).length;
    const inProgress = total - completed;
    const rate = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
        <div>
            <h2>할 일 통계</h2>
            <p>할 일을 얼마나 완료했는지 한눈에 확인하세요.</p>

            <div>
                <p>완료율</p>
                <p>전체 {total}개 중 {completed}개를 완료했어요.</p>
                <p>{rate}%</p>
            </div>

            <div>
                <div>전체 {total}개</div>
                <div>진행 중 {inProgress}개</div>
                <div>완료 {completed}개</div>
            </div>
        </div>
    );
}

export default TodoStats;