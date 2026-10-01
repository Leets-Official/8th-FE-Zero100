# Zero 100 · 2주차 TodoMatic

React로 구현한 Todo list 과제입니다. 제공된 `2주차(6).pdf`의 Zero 100 요구사항과 예시 화면을 기준으로 작성했습니다.

## 실행

Node.js **22.12 이상**에서 프로젝트 폴더의 터미널을 열고 실행합니다.

```bash
npm ci
npm run dev
```

터미널에 표시되는 주소(기본 http://localhost:5173)를 엽니다. `index.html`을 직접 더블클릭하는 방식으로 실행하지 않습니다.

```bash
npm run lint
npm run build
npm run preview
```

## 구현 범위

- [x] 작업 목록 읽기
- [x] 작업 추가 및 Enter 제출
- [x] 체크박스로 작업 완료/완료 취소
- [x] 작업 삭제
- [x] 작업 편집, 저장, 취소 및 Escape 취소
- [x] 전체보기 / 진행 중 / 완료됨 필터
- [x] 남은 할 일 개수 표시
- [x] Text / Button / Checkbox / Input 공통 컴포넌트
- [x] 기능별 컴포넌트 분리 및 상태에 따른 동적 스타일
- [x] 공백 입력 검증, 빈 목록 안내, 모바일 대응
- [ ] 선택 과제: React Router 페이지 분리

App.jsx는 공통 Text와 기능별 컴포넌트를 호출합니다. Button, Checkbox, Input은 해당 기능 컴포넌트 안에서 조합되어 렌더링됩니다.

## 폴더 구성

- `src/App.jsx`: 할 일 및 필터 상태, 추가·수정·삭제·완료 처리
- `src/components/commons/`: Text, Button, Checkbox, Input
- `src/components/todo/`: TodoForm, TodoFilters, TodoList, TodoItem
- `src/constants/todos.js`: 초기 예시 데이터와 필터 설정
- `src/styles/global.css`: 공통 스타일과 반응형 스타일
- `docs/PR_DESCRIPTION.md`: PR 제목과 본문
- `docs/SUBMISSION.md`: 파일 복사 및 제출 방법

## 구현 방식

React의 useState로 상태를 관리하고 props로 데이터와 이벤트 함수를 전달합니다. 배열은 spread, map, filter를 사용해 새 배열로 갱신합니다. 각 작업은 고유 ID를 key로 사용합니다. useRef는 입력/수정 후 포커스 복귀에 사용합니다.

자료에서 다음 주 범위로 안내한 Context API와 useEffect는 사용하지 않았습니다. 서버 및 저장 기능은 없으며 **새로고침하면 예시 데이터로 초기화됩니다**. 피그마 원본은 열람하지 못하여 PDF에 보이는 TodoMatic 화면을 기준으로 구성했습니다.

공통 과제인 **학습 내용 아티클은 별도 제출 대상**이며 이 코드에 포함되어 있지 않습니다. React Router는 선택사항으로 제외했습니다.

참고: [React 상태 배열 갱신](https://react.dev/learn/updating-arrays-in-state), [Vite](https://vite.dev/guide/).
