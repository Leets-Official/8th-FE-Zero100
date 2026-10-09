# Zero100 3주차 TodoMatic

React + Vite, Context API, React Router 7, Tailwind CSS 4, ESLint 9, Prettier를 사용한 Todo 앱입니다.

## 실행

Node.js 22.12 이상, package.json이 있는 폴더에서 실행합니다.

```bash
npm ci
npm run dev
```

PowerShell에서는 npm 대신 npm.cmd를 사용하면 스크립트 실행 정책 문제를 피할 수 있습니다.

## 요구사항

- 수정 → 입력창, 저장 / 취소 표시. 빈 이름 저장 방지
- tasks 변경 시 localStorage에 저장, 새로고침 후 이름과 완료 상태 복구
- 첫 접속 시 빈 목록
- /: 전체 목록, /active: 진행 중 목록, /completed: 완료 목록, /stats: 통계
- 전체/진행 중/완료 개수와 완료율 즉시 반영, 0개일 때 0%
- Context API로 목록과 통계 상태 공유
- Tailwind CSS v4 실제 적용, ESLint/Prettier 설정

## 구조

- context/TasksContext.js: 공유 Context
- context/TasksProvider.jsx: 상태, 변경 함수, 저장 Effect, 통계
- hooks/useTasks.js: Context 접근 Hook
- utils/taskStorage.js: 저장 데이터 읽기와 검증
- components/Layout.jsx: 헤더, 탭, 완료 목록 링크, Outlet
- pages/TasksPage.jsx: 상태별 페이지
- components/commons: 공통 UI
- components/todo: 입력, 목록, 개별 항목, 통계

## 실습 및 아티클

- [실습·설정 안내](docs/PRACTICE_GUIDE.md)
- [일반 텍스트 아티클 초안](docs/ARTICLE_DRAFT.txt)
- [검증 결과](docs/VERIFICATION.md)

완료율은 정수 반올림으로 표시합니다. localStorage 저장은 브라우저와 origin별로 구분되고 기기 간 동기화되지 않습니다. 손상된 저장 데이터 및 저장 실패는 화면에서 안내합니다. Provider는 라우트 바깥에 있어 이동 중 상태를 유지합니다.

2026-10-05에 제공된 두 장의 디자인 이미지를 참고해 할 일 목록·통계 화면을 수정했습니다. GitHub Pages 배포 설정은 포함하지 않았습니다. BrowserRouter를 배포하려면 호스팅 서버의 SPA fallback 설정이 필요합니다.
