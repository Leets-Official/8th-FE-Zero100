# ZERO100 6주차 - 미니 대시보드

현재 **2단계: 문의 등록·수정·상세 화면 보완**입니다.
1단계의 TypeScript 설정과 JSON Server 문의 목록 위에 이어서 적용합니다.

## 적용 방법

1. 실행 중인 개발 서버를 `Ctrl+C`로 종료합니다.
2. **1차 ZIP을 적용한 프로젝트**의 `package.json`이 있는 폴더에 2차 ZIP **내용물**을 덮어씁니다. `src`는 병합하세요.
3. 같은 폴더에서 실행합니다.

```bash
npm run dev
```

2차 ZIP에는 변경·추가 파일만 들어 있습니다. 기존 폴더를 삭제하지 마세요.
이번 단계에는 의존성 변경이 없어 1차에서 설치했다면 `npm ci`를 다시 실행할 필요가 없습니다.
기존 `db.json`, `.env`, `.git`은 ZIP에 포함하지 않으므로 작성한 문의와 Git 기록이 유지됩니다.

- Node.js 22.12 이상
- 브라우저: 터미널의 Vite 주소 (기본 `http://127.0.0.1:5173`)
- JSON Server: `http://127.0.0.1:3001`
- `npm run dev`가 두 서버를 함께 실행합니다.
- 데모 계정: `demo@zero100.dev` / `Demo1234!`

## 이번 단계에서 추가한 내용

- 문의 등록·수정·상세 화면과 공통 폼을 TypeScript로 구현
- Figma의 문의 폼·상세 카드·삭제 확인창을 참고한 크기와 여백 적용
- 로그인한 사용자의 이름·이메일 자동 입력
- 이름·이메일·제목·내용 검증, 필드별 오류 표시, 첫 오류 필드로 포커스 이동
- 제목 100자·내용 5,000자 제한 및 현재 글자 수 표시
- 제출 중 입력/버튼 비활성화, 연속 제출 중복 요청 방지
- 등록·수정 실패 시 작성 내용 유지 및 재시도
- 서버가 전달한 필드 오류 표시
- 변경한 폼에서 취소를 누르면 확인창 표시, 새로고침/탭 종료 시 브라우저 경고
- 상세 화면의 답변 상태, 작성일, 최근 수정일, 줄바꿈 표시
- 작성자에게 수정·삭제 버튼 제공, 다른 사용자의 수정 URL 직접 접근 차단
- 삭제 확인/취소, 삭제 실패 메시지와 재시도, 취소 후 원래 버튼으로 포커스 복원
- 상세·등록·수정에서 복귀할 때 기존 목록의 검색 조건 유지
- 문의가 삭제되었거나 존재하지 않는 경우 오류와 목록 복귀 경로 제공

작성 취소 확인은 폼의 **취소 버튼**에 적용됩니다. 사이드바 등 다른 내부 링크 이동까지 차단하는 기능은 포함하지 않습니다.
글자 수 제한은 HTML `maxLength`와 같은 UTF-16 기준입니다. 이름 검증은 앞뒤 공백을 제거한 Unicode 문자 수를 사용합니다.

## 구현 구조

- `src/pages/inquiries/InquiryCreateView.tsx`: 문의 등록
- `src/pages/inquiries/InquiryEditView.tsx`: 문의 수정
- `src/pages/inquiries/InquiryDetailView.tsx`: 상세·삭제
- `src/components/inquiries/InquiryEditorForm.tsx`: 등록/수정 공통 폼
- `src/hooks/useInquiryForm.ts`: 입력·검증·제출 상태
- `src/utils/inquiryValidation.ts`: 폼과 API에서 함께 쓰는 검증
- `src/components/common/TextField.tsx`: 라벨·입력·오류·글자 수
- `src/components/common/ConfirmationDialog.tsx`: 재사용 가능한 확인창
- `src/components/inquiries/InquiryStatusBadge.tsx`: 목록/상세 공통 상태 표시
- `src/utils/inquiryNavigation.ts`: 목록 복귀 경로 검사

기존 JSX 파일은 재내보내기 진입점으로 유지합니다. 파일을 수동으로 삭제할 필요가 없습니다.
`allowJs: true`, `checkJs: false`를 사용하며 새 TS/TSX는 엄격하게 검사합니다.
기존 인증·마이페이지 JS 구현은 다음 단계에서 이어서 보완합니다.

## 디자인 기준

PDF에 연결된 Figma 파일에서 다음 화면을 직접 확인했습니다.

- [문의 등록](https://www.figma.com/design/4hyz65a9mwAkEKplbXcfyo?node-id=4849-5468)
- [문의 상세](https://www.figma.com/design/4hyz65a9mwAkEKplbXcfyo?node-id=4849-5487)
- [삭제 확인창](https://www.figma.com/design/4hyz65a9mwAkEKplbXcfyo?node-id=4849-5556)

폼 최대 너비 680px, 입력 높이 47px, 상세 최대 너비 896px, 확인창 너비 386px을 기준으로 적용했습니다.
실제 사용자 정보·문의 내용·오류에 따라 높이가 늘어나도록 구성했습니다.
글자 수·상태 표시·수정 버튼은 기존 기능과 추가 상호작용을 위한 요소입니다.
공통 헤더·사이드바·푸터는 1차 구현을 유지해 Figma와 크기 차이가 남아 있습니다.

## 데이터와 API

문의는 1차와 동일한 JSON Server의 `db.json`을 사용합니다.
등록 `POST /inquiries`, 상세 `GET /inquiries/:id`, 수정 `PATCH /inquiries/:id`, 삭제 `DELETE /inquiries/:id`로 연결됩니다.
프론트엔드의 `/api` 요청은 Vite 개발 프록시가 JSON Server로 전달합니다.
처음 실행할 때만 `db.seed.json`을 `db.json`으로 복사하며 이미 있는 데이터는 유지합니다.

로그인·회원가입·이름/비밀번호 변경은 기존 브라우저 데모 어댑터를 유지합니다.
JSON Server는 학습용 mock API로 서버 인증·권한 검사를 제공하지 않으며 작성자 확인은 프론트엔드에서 수행합니다.
카카오 인증은 미연결입니다.

## 이번 단계 커밋

현재 `김민정/6주차` 작업 브랜치에서 실행을 확인한 뒤 커밋합니다.

```bash
git add .
git commit -m "feat: 문의 등록 수정 폼 및 상세 화면 보완"
```

다음 3차 ZIP은 **마이페이지 보완**입니다. 같은 폴더에 덮어쓴 뒤 별도로 커밋하면 됩니다.

## 검증

```bash
npm run check
```

ESLint·Prettier·TypeScript 타입 검사·Vite 빌드를 실행합니다.
브라우저에서 1차 기능 회귀 검증 20개와 2차 추가 검증 28개를 통과했습니다.
추가 검증에는 입력/길이 제한, Figma 치수, 취소·포커스 복원, 서버 422/500 오류, 네트워크 실패,
재시도, 연속 제출, 비작성자 접근, 없는 문의, 320px/390px 모바일 레이아웃이 포함됩니다.
