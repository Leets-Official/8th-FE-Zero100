# 문의 데이터 구조

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

## 상태 관리 Hook
| Hook | 역할 |
| --- | --- |
| `useInquiries` | 문의 목록, 상세 조회, 등록, 삭제 |
| `useUser` | 사용자 정보, 이름 변경 |
| `useToast` | Toast 문구, 자동 숨김 |
| `useTodos` | Todo 목록, 추가, 완료 처리, 수정, 삭제 |

`App.jsx`는 Hook을 조합해 라우트에 연결합니다. 기능 완료 후 Toast 표시처럼 Hook 사이의 연결만 담당합니다.

## 실제 API 연동 시 수정할 위치
1. `src/api/inquiryApi.js`의 export를 `axiosInstance` 기반 구현으로 교체합니다. `fetchInquiries`, `fetchInquiry`, `createInquiry`, `deleteInquiry`의 이름과 Promise 반환 형식을 유지합니다.
2. `createInquiry`는 서버가 발급한 ID가 포함된 문의를 반환합니다. Hook이 그 값을 목록에 추가합니다.
3. `useInquiries`에 요청 실패 처리를 추가하고, 화면에 로딩·에러 상태를 표시합니다.
4. 서버 목록 응답에 상세 내용이 없다면 상세 페이지에서 `fetchInquiry`를 사용합니다.
5. 연동이 끝나면 `src/mocks/dashboard`의 문의 Mock과 `src/utils/dashboard/inquiryStorage.js`를 제거합니다.
