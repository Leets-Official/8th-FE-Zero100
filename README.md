# 8th-FE-Mission-Zero100

8기 FE Zero100 미션을 위한 레포지토리입니다.

## 🎯 미션 요구사항

1. 미션 진행 방법을 꼭 읽고 진행해주세요
   [미션 진행 방법](https://leets-workspace.notion.site/3e3ca3362bee809b9342ed35b1993b83)

## 💭 이런 것들을 신경 써보면 좋아요

- 컴포넌트를 하나에 다 몰아넣지 말고, 역할별로 나눠보기 (버튼, 리스트, 카드처럼 보이는 단위로)
- 변수/함수/컴포넌트 이름만 봐도 뭘 하는지 알 수 있게 짓기
- 콘솔에 에러나 경고 뜨는 거 그대로 두지 않기
- 로딩 중인지, 에러가 났는지, 성공했는지 화면에서 구분되게 보여주기
- 커밋을 너무 크게 한 번에 몰아서 하지 말고, 작업 단위로 나눠서 커밋하기
- ESLint/Prettier 같은 포맷터 경고 무시하지 않고 맞춰주기

## 🎨 디자인

Figma: [디자인 링크](https://www.figma.com/design/5udme3sBNisPIOyu57QfmD/Zero100-%EB%94%94%EC%9E%90%EC%9D%B8?node-id=105-165&m=dev&t=emvJcXPYT63tSQUZ-1)

## 코드 검사와 포맷팅

의존성을 설치한 뒤 아래 명령을 사용할 수 있습니다.

```bash
npm run lint
npm run format:check
npm run format
```

ESLint는 코드 오류와 미사용 코드를 확인하고, Prettier는 코드 형식을 맞춥니다.

## 3주차 기능

- 할 일 추가·완료·수정·삭제를 지원합니다. 수정 시 저장·취소를 선택할 수 있고 공백만 있는 이름은 저장할 수 없습니다.
- 첫 접속은 빈 목록으로 시작합니다. 목록이 변경되면 `localStorage`의 `zero100.tasks`에 저장하며, 새로고침 후 이름과 완료 상태를 복원합니다.
- `/`: 할 일 목록과 전체·진행 중·완료 필터
- `/completed`: 완료된 할 일만 표시하는 페이지
- `/statistics`: 전체·진행 중·완료 개수와 완료율 표시 (빈 목록의 완료율은 0%)
- 삭제 버튼을 누르면 Figma 디자인을 참고한 확인 모달이 열립니다. 취소, Esc, 배경 클릭으로 닫을 수 있습니다.

### 기능별 구조

- `TodoProvider` / `useTodos`: 페이지가 공유하는 할 일과 필터 상태
- `usePersistentTodos` / `todoStorage`: 초기 목록 복원과 `useEffect`를 통한 저장
- `ModalProvider` / `useModal`: Context API로 삭제 모달 열기·닫기 관리
- `Modal` / `DeleteTodoModal`: 공통 대화상자와 삭제 확인 화면
- `TodoStats` / `todoStatistics`: 목록에서 통계를 계산해 표시
- `AppHeader`: 페이지 링크와 현재 경로에 맞는 탭 표시

### 실행

```bash
npm install
npm run dev
```

프로덕션 서버에 배포할 때는 `/completed`, `/statistics`로 직접 접속해도 `index.html`을 반환하도록 SPA 경로 처리가 필요합니다.
