# Rabbit React Web Project
## Initialize the project
```
yarn create vite . --template react-ts
```
or (if you are to create a project folder)
```
yarn create vite react-ts-basics --template react-ts
```

and install necessary packages, build, and preview
```
yarn
yarn build
yarn preview
```
or simply
```
yarn vite
```

## Resources


### demy - React & TypeScript Course
https://github.com/academind/react-typescript-course-resources

- codesandbox
- Prettier - Code formatter
- ES7+ React/Redux/React-Native: rafce를 에디트창에서 치면 코드 자동 생성됨
- Whale extension: React Developer Tools

- https://babeljs.io/repl
- https://getbootstrap.com 
- VSCode cmd + d : replace string
- ChatGPT에게 코드를 최적화시켜줄 수 있음.




## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
