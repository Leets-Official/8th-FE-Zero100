# ZERO100 미니 대시보드

4·5주차 과제: Vite 프로젝트 세팅과 재사용 가능한 공통 컴포넌트, 로그인·회원가입 및 대시보드 홈 UI 구현.

[Figma 디자인](https://www.figma.com/design/4hyz65a9mwAkEKplbXcfyo?node-id=1262-5365)의 헤더, 사이드바, 흰색 카드, 검정 버튼과 입력 폼을 참고했습니다.

## 실행

저장소 루트에서 `mini-dashboard` 폴더로 이동합니다.

```bash
cd mini-dashboard
npm ci --ignore-scripts
npm run dev
```

```bash
npm run lint
npm run format:check
npm run build
```

개발 서버 주소는 터미널에 표시됩니다. Node 24.19.0에서 코드 검사와 빌드를 확인했습니다.

## 프로젝트 설정

| 항목         | 구성                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| Vite         | React 플러그인과 개발·빌드 스크립트                                          |
| Tailwind CSS | v4, `@tailwindcss/vite` 플러그인과 `src/index.css`의 `@import 'tailwindcss'` |
| React Router | `react-router`, `BrowserRouter`와 `Routes`·`Route`·`Outlet`                  |
| Axios        | 공통 인스턴스, 10초 timeout, AbortController를 이용한 요청 취소              |
| 코드 품질    | ESLint flat config, Prettier, 사용하지 않는 import 검사, 스타일 충돌 방지    |

버전을 고정하고 `package-lock.json`을 포함했습니다. 별도의 폰트 설치나 환경 변수 파일 없이 실행할 수 있습니다.

## 폴더 구조

```text
src/
  assets/           # 예시 JSON
  api/              # Axios 인스턴스와 데이터 요청
  components/
    common/         # Button, TextInput, TextArea, Modal, Toast 등
    layout/         # Header, Sidebar, Footer, 공통 레이아웃
    dashboard/      # 정보 카드와 문의 테이블
  contexts/         # 화면이 공유하는 예시 데이터와 알림
  hooks/            # Context 접근
  pages/            # 경로별 화면
```

## 공통 컴포넌트

| 컴포넌트      | 주요 속성·역할                                                                    |
| ------------- | --------------------------------------------------------------------------------- |
| Button        | `variant`, `size`, `disabled`, `isLoading`, `type`, `onClick`, ref 전달           |
| LinkButton    | Button과 동일한 스타일을 사용하는 페이지 이동 링크                                |
| TextInput     | `label`, `value`, `onChange`, `type`, `helperText`, `error`, `required`, ref 전달 |
| TextArea      | TextInput과 동일한 필드 구조, `rows`, `maxLength` 지원                            |
| FormField     | label·안내·오류 문구 공통 처리                                                    |
| Header        | 로고 링크와 `onLogout` 콜백                                                       |
| Sidebar       | NavLink로 현재 메뉴 표시, 좁은 화면에서는 가로 메뉴                               |
| Footer        | 공통 하단 영역                                                                    |
| Modal         | `title`, `onClose`, `children`, native dialog와 Portal, 닫힌 뒤 포커스 복귀       |
| Toast         | `message`, `onDismiss`, 스크린 리더 상태 알림                                     |
| StatusMessage | 로딩·오류·빈 상태 안내와 다시 시도 버튼                                           |

```jsx
<Button variant="secondary" size="sm" onClick={cancelChanges}>
  취소
</Button>

<Button type="submit" disabled={!title.trim()}>
  등록
</Button>

<TextInput
  label="이메일"
  type="email"
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  helperText="이메일을 입력해 주세요."
  required
/>
```

입력창의 label과 설명·오류 ID를 연결했고, 상태 안내에는 `status`·`alert` 역할을 사용했습니다. 본문 바로가기와 키보드 포커스 표시를 제공합니다. 모달은 `showModal()`의 배경 접근 차단을 사용하고 Esc·배경 클릭으로 닫습니다.

## 화면

- `/login`: 이메일·비밀번호 로그인 UI와 카카오 로그인 버튼
- `/signup`: 이메일·비밀번호·비밀번호 확인 회원가입 UI와 입력 검증 안내
- `/`: 내 정보와 문의 현황
- `/inquiries`: 문의 목록
- `/inquiries/new`: 공통 입력 컴포넌트를 이용한 문의 등록 폼
- `/mypage`: 이름·이메일 입력과 저장·취소
- `/components`: 버튼 크기·스타일·로딩, 입력창 상태, 모달·알림 예시
- 없는 경로: 안내 화면

중첩 Route의 `DashboardLayout`에서 Header·Sidebar·Footer를 한 번 선언하고 페이지 내용만 Outlet으로 변경합니다.

## 예시 데이터와 구현 범위

이번 과제는 프로젝트 세팅과 공통 UI입니다. Axios로 `assets/dashboard.json`을 HTTP 요청하여 화면에 표시하고, 실패하면 오류 안내와 다시 시도를 제공합니다. 초기 요청은 StrictMode에서도 정리되도록 취소합니다.

문의 등록과 프로필 저장은 컴포넌트 사용 예시로 현재 화면의 메모리 상태만 변경합니다. 새로고침하면 예시 데이터로 돌아옵니다. 실제 서버 저장, 로그인·회원가입, 계정 인증은 연결하지 않았으며 로그아웃 버튼은 비활성화되어 있습니다. 실제 API를 연결할 때는 `api/client.js`와 `api/dashboard.js`를 변경하고 Header에 `onLogout`을 전달합니다.

로그인·회원가입 폼은 화면과 브라우저 입력 검증만 구현했습니다. 제출 및 카카오 로그인 버튼은 API가 연결되지 않은 상태임을 알리는 알림을 보여줍니다.

배포 서버에는 각 경로로 직접 접속해도 `index.html`을 반환하는 SPA fallback 설정이 필요합니다.
