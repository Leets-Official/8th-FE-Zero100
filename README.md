# Zero100 4주차 미니 대시보드 — 1차

React 기반 미니 대시보드입니다. 공개 예제 API에서 사용자·게시글을 조회하고, 브라우저에 저장하는 나의 할 일을 함께 보여줍니다.

## 실행

Node.js 22.12 이상이 필요합니다. `package.json`이 있는 프로젝트 루트에서 실행합니다.

```bash
npm ci
npm run dev
```

Windows PowerShell에서 실행 정책 오류가 나면 `npm.cmd ci`, `npm.cmd run dev`를 사용합니다.
API 키와 별도 서버는 필요하지 않습니다. 사용자·게시글 조회에는 인터넷 연결이 필요합니다.

## 구현 범위

- Vite, React Router, Tailwind CSS, Axios 적용
- `Button`, `Header`, `TextInput`, `Card`, `PageHeading`, `AsyncState` 등 공통 컴포넌트
- 데스크톱 사이드바와 모바일 가로 메뉴, 현재 경로 표시, 404 페이지
- 대시보드: 사용자 수·게시글 수·진행 중인 할 일·완료율, 게시글과 사용자 미리보기
- 사용자: 이름·이메일·아이디·회사명 검색, 프로필 카드
- 게시글: 제목·본문 검색, 9개 단위 페이지 이동, 전체 본문 표시
- 할 일: 추가·수정·삭제·완료 전환, 상태별 필터, 통계
- 각 API 영역의 로딩·조회 완료·오류·빈 목록 화면과 재시도
- Axios 인스턴스, 10초 타임아웃, 응답 형식 검증, 요청 취소와 늦은 응답 방지
- localStorage 저장 오류 화면 안내, 공백 입력 방지, 키보드 포커스와 reduced-motion 대응

**디자인 상태:** 제공된 Figma 링크가 작업 환경에서 `Site Unavailable`로 열려 원본 디자인을 확인하지 못했습니다. 현재 UI는 임시 구성입니다. Figma 일치 구현이 완료된 제출 최종본이 아닙니다.
68페이지에는 대시보드의 세부 데이터 종류가 명시되지 않아 사용자·게시글 API와 기존 할 일 기능으로 1차 범위를 구성했습니다.

다음 단계에서는 Figma 캡처를 기준으로 스타일을 조정하고 게시글 상세·댓글, 사용자 상세 기능을 추가할 수 있도록 파일을 분리했습니다.

## 화면 경로

| 경로         | 화면                          |
| ------------ | ----------------------------- |
| `/`          | 대시보드                      |
| `/users`     | 사용자 목록·검색              |
| `/posts`     | 게시글 목록·검색·페이지 이동  |
| `/tasks`     | 전체 할 일                    |
| `/active`    | 진행 중인 할 일               |
| `/completed` | 완료한 할 일                  |
| `/stats`     | 할 일 통계                    |
| `/all`       | `/tasks`로 이동하는 이전 주소 |
| 그 외        | 404                           |

## 구조

```text
src/
  api/                 # Axios 설정·조회 함수·응답 검증
  assets/              # 로고
  components/
    commons/           # 재사용하는 UI와 상태 표시
    layout/            # Header·Sidebar
    dashboard/         # 요약 카드·할 일 미리보기
    users/             # 사용자 카드
    posts/             # 게시글 카드
    todo/              # 기존 할 일 UI
  constants/           # 경로·메뉴 정의
  context/             # 할 일 상태 공유와 저장
  hooks/               # API 조회·Context 접근
  pages/               # 라우트별 화면 조합
  styles/              # Tailwind import·공통 스타일·반응형
  utils/               # 검색·할 일 필터·저장 데이터 검증
```

기존 `TasksProvider`가 라우트 바깥에서 상태를 공유합니다. 저장 키 `zero100-week3-tasks`를 유지해서 **같은 브라우저와 origin**에서는 기존 할 일을 이어서 사용할 수 있습니다. 포트·호스트·브라우저가 바뀌면 저장 공간이 달라집니다.

## 데이터와 API

- 사용자: `GET https://jsonplaceholder.typicode.com/users`
- 게시글: `GET https://jsonplaceholder.typicode.com/posts`
- 이 데이터는 JSONPlaceholder의 공개 예제이며 실제 서비스의 사용자나 게시글이 아닙니다.
- API 응답에 작성 시각이 없으므로 게시글을 임의로 최신순이라고 표시하지 않습니다.
- 할 일은 API 게시글과 별도로 브라우저에만 저장합니다. 기기 간 동기화는 하지 않습니다.
- 요청 오류를 가짜 성공 데이터로 대체하지 않습니다. 해당 영역에서 원인 안내와 재시도를 제공합니다.
- API 주소 변경이 필요하면 `.env.example`을 `.env`로 복사하고 `VITE_API_BASE_URL`을 수정한 다음 개발 서버를 재시작합니다. `/users`, `/posts` 응답은 JSONPlaceholder와 같은 구조여야 합니다.

공식 참고: [JSONPlaceholder](https://jsonplaceholder.typicode.com/), [Axios 요청 취소](https://axios-http.com/docs/cancellation).

## 검사

```bash
npm run lint
npm run format:check
npm run build
```

`npm run check`로 세 가지를 연속 실행할 수 있습니다. ESLint는 경고가 1개라도 있으면 실패합니다.

- [ZIP 적용·커밋 안내](docs/STEP_1_GUIDE.md)
- [검증 범위와 직접 확인 항목](docs/VERIFICATION.md)
