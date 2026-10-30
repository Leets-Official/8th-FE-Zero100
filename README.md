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

## 🗂 문의 데이터 구조
백엔드 API 연동 전이므로 문의 데이터는 Mock과 localStorage로 관리합니다.

```
페이지 (src/pages/dashboard)         UI 렌더링, 사용자 이벤트 처리
  ↓ props
useInquiries (src/hooks/dashboard)   문의 상태, 목록·상세 조회, 등록, 삭제
  ↓
inquiryApi (src/api/inquiryApi.js)   데이터 접근의 단일 진입점
  ↓
inquiryMockApi (src/mocks/dashboard) 현재 구현. localStorage 기반 조회·등록·삭제, ID 발급
```

### 상태 관리 Hook
| Hook | 역할 |
| --- | --- |
| `useInquiries` | 문의 목록, 상세 조회, 등록, 삭제 |
| `useUser` | 사용자 정보, 이름 변경 |
| `useToast` | Toast 문구, 자동 숨김 |
| `useTodos` | Todo 목록, 추가, 완료 처리, 수정, 삭제 |

`App.jsx`는 Hook을 조합해 라우트에 연결합니다. 기능 완료 후 Toast 표시처럼 Hook 사이의 연결만 담당합니다.

### 실제 API 연동 시 수정할 위치
1. `src/api/inquiryApi.js`의 export를 `axiosInstance` 기반 구현으로 교체합니다. `fetchInquiries`, `fetchInquiry`, `createInquiry`, `deleteInquiry`의 이름과 Promise 반환 형식을 유지합니다.
2. `createInquiry`는 서버가 발급한 ID가 포함된 문의를 반환합니다. Hook이 그 값을 목록에 추가합니다.
3. `useInquiries`에 요청 실패 처리를 추가하고, 화면에 로딩·에러 상태를 표시합니다.
4. 서버 목록 응답에 상세 내용이 없다면 상세 페이지에서 `fetchInquiry`를 사용합니다.
5. 연동이 끝나면 `src/mocks/dashboard`의 문의 Mock과 `src/utils/dashboard/inquiryStorage.js`를 제거합니다.
