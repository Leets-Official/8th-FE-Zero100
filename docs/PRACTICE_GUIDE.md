# 3주차 실습 및 설정 안내

## 1. 완성 코드 사용하기

Node.js 22.12 이상을 사용합니다. ZIP의 zero100-week3가 프로젝트 폴더입니다.
기존 작업 폴더에 수정한 코드가 있으면 먼저 백업하세요. ZIP을 별도 폴더에 풀어 실행해도 됩니다.
기존 폴더에 적용한다면 ZIP의 zero100-week3 **안의 내용**을 기존 프로젝트 폴더에 복사합니다. 폴더가 zero100-week3/zero100-week3로 중복되지 않게 합니다. 이전 src를 백업하고 새 src로 교체하면 예전 파일이 섞이지 않습니다. .git은 건드리지 않습니다.

PowerShell에서 package.json이 있는 폴더로 이동합니다. 아래 경로가 본인 폴더와 다르면 실제 경로를 사용하세요.

```powershell
cd C:\Users\milan\leets\week3\zero100-submit\zero100-week3
node --version
npm.cmd ci
npm.cmd run lint
npm.cmd run format:check
npm.cmd run build
npm.cmd run dev
```

명령어는 한 줄씩 실행합니다. 표시된 localhost 주소를 엽니다. Git Bash에서도 npm.cmd를 쓸 수 있고 npm으로 바꿔도 됩니다. 개발 서버를 종료하려면 Ctrl+C를 누릅니다.
완성 코드에는 아래 라이브러리와 설정이 이미 들어 있으므로 npm.cmd ci만으로 잠금 파일에 기록된 버전을 설치할 수 있습니다.

## 2. Context API 실습

별도 패키지 설치는 필요 없습니다. React에 포함된 기능입니다.

1. src/context/TasksContext.js에서 createContext(null)을 확인합니다.
2. src/context/TasksProvider.jsx에서 useState로 tasks를 보관하고 Provider의 value로 상태와 함수를 전달하는 부분을 확인합니다.
3. src/main.jsx에서 BrowserRouter와 TasksProvider가 App을 감싸고 있는지 확인합니다.
4. src/hooks/useTasks.js에서 useContext로 값을 읽는 부분을 확인합니다.
5. TodoList와 TodoStats가 props 대신 useTasks로 같은 상태를 읽는 부분을 확인합니다.
6. 브라우저 첫 접속 시 빈 목록을 확인한 뒤 통계 탭에서 완료율 0%를 확인합니다. 할 일 목록 탭으로 돌아옵니다.
7. 'Context API 공부하기', '3주차 과제 제출하기' 두 개를 추가합니다.
8. 첫 번째 작업을 체크합니다. 전체보기에서는 취소선이 표시됩니다. 통계 탭을 누르면 전체 2 / 진행 중 1 / 완료 1 / 완료율 50%로 바뀌어야 합니다.
9. 완료됨을 누릅니다. 주소가 /completed로 바뀌고 체크한 한 개만 보이는지 확인합니다.
10. 그 작업을 완료 취소하면 완료 페이지에서 사라지고 진행 중 페이지에 나타나는지 확인합니다.
11. 다시 완료한 뒤 새로고침합니다. 작업 이름과 완료 상태가 유지되어야 합니다.

이 실습에서 목록과 통계의 동시 갱신은 Context 상태 공유, 새로고침 후 복구는 localStorage 기능입니다.
완료율은 반올림한 정수입니다. 예: 1/3은 33%.

## 3. 이름 편집 실습

전체보기에서 항목의 수정를 누릅니다. 입력창과 저장/취소이 나타납니다.
이름을 바꾸고 저장를 누르면 수정됩니다. 다시 수정에서 내용을 바꾼 뒤 취소을 누르면 기존 이름을 유지합니다.
공백만 넣고 저장를 누르면 오류 메시지가 나오고 저장되지 않습니다. Escape로도 취소할 수 있습니다.

## 4. localStorage 확인

F12 → Application(애플리케이션) → Local Storage → 현재 localhost 주소를 선택합니다.
zero100-week3-tasks 키에 JSON 배열이 저장됩니다. 추가/수정/완료/삭제 뒤 값이 바뀌는지 확인합니다.
첫 접속을 다시 시험하고 싶다면 이 키만 삭제한 뒤 새로고침합니다. 다른 키까지 지우는 localStorage.clear()는 필요 없습니다.
새 포트 또는 다른 브라우저에서는 저장 공간이 달라집니다. 같은 주소·브라우저에서 새로고침을 시험합니다.

## 5. 직접 설치해 보는 명령어

완성본 사용 시 npm.cmd ci만 필요합니다. 아래는 기존 Vite React 프로젝트에 직접 도구를 추가하는 과정을 실습할 때 실행합니다. 기존 package.json을 삭제할 필요 없습니다.

```powershell
npm.cmd install react-router@7
npm.cmd install -D tailwindcss@4 @tailwindcss/vite@4
npm.cmd install -D eslint@9 @eslint/js@9 globals@16 eslint-plugin-react-hooks@5 eslint-plugin-react-refresh@0.4
npm.cmd install -D prettier@3 eslint-config-prettier@10
```

Context API는 React 내장 기능이라 따로 설치하지 않습니다.

## 6. Tailwind CSS v4 설정

vite.config.js 내용:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ plugins: [react(), tailwindcss()] });
```

src/styles/global.css의 맨 위:

```css
@import 'tailwindcss';
```

main.jsx에서 import './styles/global.css';로 CSS를 가져옵니다.
Layout.jsx와 TodoStats.jsx의 className을 확인합니다. grid-cols-3는 통계 카드를 3열로 정렬합니다. 세부 색상과 간격은 global.css에서 조절합니다.
이번 v4 방식에서는 npx tailwindcss init -p를 실행하지 않습니다.

## 7. ESLint 설정

eslint.config.js 내용:

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import prettier from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^[A-Z_]' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  prettier,
];
```

src/lint-practice.js를 임시로 만들고 다음 한 줄을 입력합니다.

```js
const unusedValue = 123;
```

npm.cmd run lint를 실행하면 사용하지 않는 변수 오류가 나야 합니다. 실습 파일을 삭제한 뒤 다시 검사하여 통과하는지 확인합니다. 이 오류 실습 파일은 제출하지 않습니다.

## 8. Prettier 설정

.prettierrc 내용:

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all",
  "printWidth": 100
}
```

package.json에는 lint: eslint ., format: prettier --write ., format:check: prettier --check .가 등록되어 있습니다.
실습용으로 src/format-practice.js에 아래를 입력합니다.

```js
export const sample = { name: 'minjeong', week: 3 };
```

npm.cmd run format 실행 후 공백, 따옴표와 세미콜론이 바뀌는지 확인합니다. 실습 파일은 확인 후 삭제합니다.
npm.cmd run format:check로 전체 형식을 점검합니다.
.vscode/settings.json에 저장 시 포맷 설정도 포함했습니다. VS Code에서 Prettier - Code formatter와 ESLint 확장을 설치하고 zero100-week3 폴더 자체를 열면 적용됩니다. 확장을 설치하지 않아도 터미널의 format/lint 명령은 동작합니다.

## 9. React Router 설정

main.jsx는 BrowserRouter로 App을 감쌉니다.
App.jsx 내용:

```jsx
import { Navigate, Route, Routes } from 'react-router';
import Layout from './components/Layout';
import TasksPage from './pages/TasksPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<TasksPage filter="all" />} />
        <Route path="active" element={<TasksPage filter="active" />} />
        <Route path="all" element={<Navigate to="/" replace />} />
        <Route path="completed" element={<TasksPage filter="completed" />} />
        <Route path="stats" element={<StatsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
```

Layout.jsx의 탭과 완료 목록 링크로 이동하고 Outlet에 자식 페이지를 표시합니다.
진행 중 → 완료됨 → 전체보기 순서로 이동하면서 URL을 확인합니다. 뒤로 가기와 /completed 주소 직접 접속·새로고침도 시험합니다.
BrowserRouter는 서버에서 index.html로 돌려주는 SPA fallback이 필요합니다. Vite 개발 서버에서 확인할 수 있으며 GitHub Pages 배포 설정은 이 과제에 포함하지 않았습니다.

## 10. 아티클과 캡처

ARTICLE_DRAFT.txt는 일반 텍스트 초안입니다. 실습 후 안내 문장을 빼고 필요한 내용을 복사해 사용합니다. 직접 확인하지 않은 실행 결과를 경험한 것처럼 쓰지 않도록 본인 결과에 맞춰 수정하세요.
권장 캡처: 통계 2/1/1/50% 화면, /completed 화면, 편집 화면, localStorage 값, lint/format:check/build 성공 터미널.
Windows+Shift+S로 캡처하고 PR 본문에 Ctrl+V로 붙여넣을 수 있습니다.

## 11. 브랜치 확인

폴더 이름을 week3로 바꿔도 Git 브랜치는 자동으로 바뀌지 않습니다.

```powershell
git branch --show-current
git status
```

현재 2주차 브랜치이고 3주차 브랜치가 아직 없다면, 3주차 작업을 커밋하기 전에 다음처럼 새 브랜치를 만듭니다.

```powershell
git switch -c "김민정/3주차"
```

이미 3주차 브랜치가 있다는 오류가 나면 강제로 덮어쓰지 말고 상태를 확인합니다. 2주차 PR 머지 여부에 따라 PR 비교에 이전 변경이 포함될 수 있으므로 제출 전 base/compare와 Files changed를 확인합니다.
