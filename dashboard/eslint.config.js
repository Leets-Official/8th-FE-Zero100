// eslint.config.js (v9 Flat Config) - 추천 설정
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import prettierConfig from 'eslint-config-prettier';

export default [
  { ignores: ['dist', 'node_modules'] },
  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { ...globals.browser },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'unused-imports': unusedImports,
    },
    rules: {
      // 코드 품질
      'prefer-const': 'error',          // 재할당 없으면 const 강제
      'no-var': 'error',                // var 금지
      eqeqeq: ['error', 'always'],     // === 강제

      // 미사용 코드 정리
      'no-unused-vars': 'off',
      'unused-imports/no-unused-imports': 'error',  // 미사용 import 자동 제거

      // React
      ...reactHooks.configs.recommended.rules,       // Hooks 규칙
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },

  prettierConfig, // Prettier 충돌 방지 (반드시 마지막에)
];