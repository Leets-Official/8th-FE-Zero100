# ZERO100 미니 대시보드

7주차 과제: 로그인·회원가입과 문의·마이페이지 기능을 ZERO100 Admin API에 연결했습니다.

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

개발 서버는 `http://localhost:5173`을 사용합니다. 서버에 등록된 카카오 콜백이 이 주소로 고정되어 있어 다른 포트를 사용하면 카카오 로그인이 동작하지 않습니다. API 주소를 바꾸려면 `.env.example`을 참고해 `VITE_API_BASE_URL`을 설정합니다. 설정하지 않으면 과제 API 주소를 사용합니다.

## 프로젝트 설정

| 항목         | 구성                                                                         |
| ------------ | ---------------------------------------------------------------------------- |
| Vite         | React 플러그인과 개발·빌드 스크립트                                          |
| Tailwind CSS | v4, `@tailwindcss/vite` 플러그인과 `src/index.css`의 `@import 'tailwindcss'` |
| React Router | `react-router`, `BrowserRouter`와 `Routes`·`Route`·`Outlet`                  |
| Axios        | 공통 인스턴스, 10초 timeout, AbortController를 이용한 요청 취소              |
| 코드 품질    | ESLint flat config, Prettier, 사용하지 않는 import 검사, 스타일 충돌 방지    |

버전을 고정하고 `package-lock.json`을 포함했습니다. 기본 API 주소 사용 시 별도의 환경 변수 파일은 필요하지 않습니다.

## 폴더 구조

```text
src/
  api/              # Axios 인스턴스, 인증 및 대시보드 API
  components/
    common/         # Button, TextInput, TextArea, Modal, Toast 등
    layout/         # Header, Sidebar, Footer, 공통 레이아웃
    dashboard/      # 정보 카드와 문의 테이블
  contexts/         # 인증, 서버 데이터와 알림
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

- `/login`: 이메일·비밀번호 및 카카오 로그인
- `/signup`: 이메일·비밀번호 회원가입과 입력 검증
- `/auth/kakao/callback`: 카카오 인가코드 교환과 미가입자 가입 연결
- `/`: 내 정보와 문의 현황
- `/inquiries`: 문의 목록
- `/inquiries/new`: 공통 입력 컴포넌트를 이용한 문의 등록 폼
- `/inquiries/:inquiryId`: 문의 상세와 본인 문의 삭제
- `/mypage`: 이름 및 비밀번호 변경
- `/components`: 버튼 크기·스타일·로딩, 입력창 상태, 모달·알림 예시
- 없는 경로: 안내 화면

중첩 Route의 `DashboardLayout`에서 Header·Sidebar·Footer를 한 번 선언하고 페이지 내용만 Outlet으로 변경합니다.

## API와 인증

- [API 명세](https://leetszero100-fe.kro.kr/api-docs)의 회원가입·로그인·카카오 콜백, 내 정보·이름·비밀번호 변경, 문의 조회·등록·삭제를 사용합니다.
- 로그인으로 받은 토큰은 현재 브라우저 탭의 `sessionStorage`에 저장하고 인증 요청에 Bearer 토큰으로 전달합니다. 로그아웃하면 토큰과 화면 데이터를 지웁니다.
- 토큰이 없거나 초기 조회에서 인증이 만료되면 로그인 화면으로 이동합니다. 서버 오류에는 안내와 재시도를 제공합니다.
- 서버 명세에 문의 단건 조회 API가 없어 목록에서 해당 ID를 찾아 상세를 표시합니다. 본인이 작성한 문의만 삭제할 수 있습니다.
- 서버는 이메일 변경 API를 제공하지 않아 이메일은 읽기 전용입니다. 회원가입·비밀번호 변경은 영문·숫자·특수문자를 포함한 8자 이상 비밀번호를 사용합니다.
- 카카오 미가입자는 콜백에서 회원가입 화면으로 이동하며 이메일과 비밀번호를 추가로 입력합니다. 실제 카카오 앱의 콜백 주소는 서버 설정에 따릅니다.

배포 서버에는 각 경로로 직접 접속해도 `index.html`을 반환하는 SPA fallback 설정이 필요합니다.
