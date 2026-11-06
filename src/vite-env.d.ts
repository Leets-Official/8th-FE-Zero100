/// <reference types="vite/client" />

interface ImportMetaEnv {
  // API 서버 origin. Swagger 경로가 /api로 시작하므로 /api를 붙이지 않는다.
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
