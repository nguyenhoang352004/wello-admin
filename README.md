# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is currently not compatible with SWC. See [this issue](https://github.com/vitejs/vite-plugin-react/issues/428) for tracking the progress.

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

---

# Kiến trúc Dự án Wello Admin

Dự án này tuân thủ **Feature-Based Architecture** (Kiến trúc hướng tính năng), được thiết kế để có khả năng mở rộng, dễ bảo trì và có tính module cao.

## Cấu trúc Thư mục

Tất cả mã nguồn nằm trong thư mục `src/`, được tổ chức như sau:

### 1. `src/app/`
- **Mục đích**: Cấu hình toàn bộ ứng dụng.
- **Nội dung**: 
    - File thực thi chính (`App.tsx`).
    - Styles toàn cục (`App.css`).
    - Cấu hình định tuyến (Routing).
    - Các Global context providers (Auth, Theme, v.v.).

### 2. `src/core/`
- **Mục đích**: Khung xương và cơ sở hạ tầng cốt lõi.
- **Nội dung**:
    - `api/`: Các instance Axios toàn cục và cấu hình dịch vụ cơ bản.
    - `constants/`: Các hằng số dùng chung.
    - `types/`: Các interface/types TypeScript toàn cục.

### 3. `src/shared/`
- **Mục đích**: Các components, hooks và utilities có thể tái sử dụng trong nhiều tính năng khác nhau.
- **Nội dung**:
    - `components/`: UI components dùng chung (Button, Input, Table, v.v.).
    - `hooks/`: Các generic hooks (`useDebounce`, v.v.).
    - `utils/`: Các hàm hỗ trợ (Helper functions).

### 4. `src/features/`
- **Mục đích**: Các module chứa logic nghiệp vụ cho từng tính năng cụ thể (ví dụ: `auth`, `products`).
- **Cấu trúc thư mục chuẩn cho mỗi Feature**:
    - `components/`: Các UI components chỉ dùng riêng cho tính năng này.
    - `api/`: Các lời gọi API liên quan đến tính năng.
    - `hooks/`: Logic tái sử dụng bên trong tính năng.
    - `types.ts`: Các định nghĩa TypeScript riêng cho tính năng.
    - **`index.ts`**: "Public API" của tính năng.

---

## Quy tắc "Public API"

Để duy trì sự tách biệt sạch sẽ và tránh phụ thuộc vòng:

1.  **Mỗi feature phải có một file `index.ts`.**
2.  **Mọi lượt import từ feature KHÁC PHẢI thông qua file `index.ts` này.**
    - ✅ **Đúng**: `import { LoginForm } from '@/features/auth'`
    - ❌ **Sai**: `import { LoginForm } from '@/features/auth/components/LoginForm'`
3. Các tính năng nên độc lập nhất có thể.

## Quy ước đặt tên

- **Components**: PascalCase (ví dụ: `AdminCard.tsx`).
- **Hooks**: camelCase bắt đầu bằng `use` (ví dụ: `useAuth.ts`).
- **Folders**: kebab-case (ví dụ: `food-moderation`).
