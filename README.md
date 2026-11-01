# ZERO100 6주차 - 미니 대시보드

4주차 미니 대시보드를 이어서 구현한 **1단계: TypeScript 설정과 문의 목록 API 연동**입니다.
기존 로그인·대시보드·문의 등록/상세/수정/삭제·마이페이지 화면을 유지했습니다.

## 적용과 실행

1. 기존 프로젝트의 `package.json`이 있는 폴더에 ZIP **내용물**을 덮어씁니다. `src`는 기존 폴더와 병합합니다.
2. 그 폴더에서 다음 명령을 실행합니다. Node.js **22.12 이상**이 필요합니다.

```bash
npm ci
npm run dev
```

- 브라우저: 터미널에 표시되는 Vite 주소 (기본 `http://127.0.0.1:5173`)
- JSON Server: `http://127.0.0.1:3001`
- `npm run dev`가 두 서버를 함께 실행합니다. 별도 터미널은 필요하지 않습니다.
- 종료: `Ctrl+C`
- 로그인: `demo@zero100.dev` / `Demo1234!`

처음 받는 경우에도 ZIP 내용물만으로 설치와 실행이 가능합니다.
`.git`, `node_modules`, `dist`, 실행 중 생성되는 `db.json`은 ZIP에 포함하지 않습니다.
이미 6주차 작업 브랜치가 있다면 그 브랜치에 덮어쓴 뒤 커밋하세요.
아직 없다면 기존 4주차 코드에서 `git switch -c "김민정/6주차"`로 생성하세요.
이 ZIP은 자동으로 커밋하거나 원격 저장소에 업로드하지 않습니다.

## 이번 단계의 변경

- TypeScript의 `strict` 검사, 타입 검사 스크립트, TS/TSX ESLint 설정
- `User`, `Inquiry`, 문의 검색 조건과 API 응답 타입 분리
- Generic `useResource<T>`로 로딩·오류·성공 상태와 요청 취소 처리
- Axios로 JSON Server의 문의 데이터를 조회·등록·수정·삭제
- 실제 응답을 `unknown`으로 받은 뒤 필드와 날짜 형식 검사
- TypeScript로 작성한 문의 목록·검색·표 컴포넌트
- 제목/내용/작성자 검색, 내 문의 필터, 답변 상태 필터, 정렬, 페이지당 개수, 페이지 이동
- 전체/답변 대기/답변 완료 건수 및 새로고침 버튼
- 검색 결과 없음, 빈 목록, 서버 연결 오류, 재시도 처리
- 목록 조건을 URL에 저장하고 상세에서 돌아올 때 유지

검색과 페이지 나누기는 서버에서 받은 전체 목록에 대해 브라우저에서 처리합니다.

## 파일 구조

```text
src/
  types/                    사용자·문의 타입
  api/inquiryClient.ts      Axios 서버 클라이언트
  api/inquiryApi.ts         응답 검증과 문의 API
  context/AuthStateContext.ts
  hooks/useResource.ts      타입을 가진 비동기 조회 훅
  pages/inquiries/InquiryListView.tsx
  components/inquiries/InquiryListFilters.tsx
  components/inquiries/InquiryListTable.tsx
  styles/inquiry-list.css
scripts/server.cjs          JSON Server 실행 및 최초 DB 생성
```

기존 JS/JSX는 `allowJs: true`, `checkJs: false`로 함께 사용하고 새 TS/TSX부터 엄격하게 검사합니다.
기존 import 경로와 다음 ZIP 덮어쓰기가 유지되도록 `InquiryListPage.jsx`, `Button.jsx`, `AuthContext.js`에 재내보내기 진입점을 두었습니다.
남은 문의 폼·상세·마이페이지는 다음 단계에서 순서대로 보완합니다.

## 데이터와 API

처음 실행할 때만 `db.seed.json`을 `db.json`으로 복사합니다.
이후 문의 변경은 `db.json`에 저장되며 서버를 껐다 켜도 유지됩니다.
다음 단계 ZIP에는 `db.json`을 넣지 않으므로 덮어써도 작성한 문의가 유지됩니다.
초기 데이터는 페이지 이동과 상태 필터를 확인할 수 있는 가상 문의 12건입니다.

| 메서드 | JSON Server 경로 | 용도      |
| ------ | ---------------- | --------- |
| GET    | `/inquiries`     | 문의 목록 |
| GET    | `/inquiries/:id` | 문의 상세 |
| POST   | `/inquiries`     | 문의 등록 |
| PATCH  | `/inquiries/:id` | 문의 수정 |
| DELETE | `/inquiries/:id` | 문의 삭제 |

프론트엔드는 `/api` 경로를 사용하고 Vite 개발 프록시가 JSON Server로 연결합니다.
서버를 분리해서 실행하려면 `npm run server`, `npm run dev:web`을 각각 실행하세요.
`npm run preview`에는 개발 프록시가 없으므로 API 접근이 필요하면 `.env.example`을 `.env`로 복사한 뒤
`VITE_INQUIRY_API_BASE_URL=http://127.0.0.1:3001`로 설정하고 다시 빌드하세요.

문의 저장소는 JSON Server이고, 로그인·회원가입·이름/비밀번호 변경은 기존 브라우저 데모 어댑터를 유지합니다.
JSON Server는 학습용 mock API이며 실제 서버 인증이나 권한 검사를 제공하지 않습니다.
작성자 확인은 프론트엔드에서 수행합니다. 카카오 인증도 기존과 같이 미연결입니다.
기존 브라우저 저장소의 문의는 이번 서버 데이터에 자동 병합하지 않습니다.

## 커밋

이번 ZIP을 적용하고 실행을 확인한 다음 한 번 커밋하세요.

```bash
git add .
git commit -m "feat: TypeScript 설정 및 JSON Server 문의 목록 연동"
```

다음 단계는 **문의 등록·상세 폼 보완**, 마지막 단계는 **마이페이지 보완**입니다.
각 단계 ZIP을 같은 폴더에 순서대로 덮어쓰고 각각 커밋하면 됩니다.

## 검증

```bash
npm run check
```

ESLint, Prettier, TypeScript 타입 검사, Vite 빌드를 실행합니다.

검증 결과: ESLint·Prettier·TypeScript·빌드 통과. 브라우저에서 로그인, 검색, 필터, 페이지 이동, 등록/상세/수정/삭제, 파일 저장, 오류/재시도, 잘못된 API 응답, 모바일 레이아웃 등 20개 항목을 확인했습니다.

수동 확인: 로그인 → 문의 목록 검색/필터/페이지 이동 → 문의 등록 → 상세 확인 → 수정/삭제 → 대시보드 문의 수 확인.
디자인은 PDF에 연결된 기존 4주차 대시보드 구현을 이어 사용했습니다.
