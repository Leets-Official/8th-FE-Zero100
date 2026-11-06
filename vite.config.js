import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // 백엔드에 등록된 카카오 redirect_uri(http://localhost:5173/auth/kakao/callback)와 맞춤
    port: 5173,
    strictPort: true,
  },
});
