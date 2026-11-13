import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 백엔드의 카카오 redirect_uri 기본값(http://localhost:5173/auth/kakao/callback)과 맞춤
    port: 5173,
    strictPort: true,
  },
});
