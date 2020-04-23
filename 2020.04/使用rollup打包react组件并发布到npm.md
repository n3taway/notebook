&emsp;


# 使用rollup打包react组件并发布到npm

### rollup做库打包工具的优点

- Tree Shaking: 自动移除未使用的代码, 输出更小的文件
- Scope Hoisting: 所有模块构建在一个函数内, 执行效率更高
- Config 文件支持通过 ESM 模块格式书写
- 可以一次输出多种模块规范: IIFE, AMD, CJS, UMD, ESM
- 文档精简

### 初始化目录 目录说明

```bash
├── config #rollup打包配置
│   └── rollup.js
├── dist #打包输出文件
│   └── index.js
├── package.json
└── src #源码
    ├── components
    │   └── Button.js
    └── index.js
```

### package.json说明

```json
{
  "name": "react-library-button",
  "version": "0.0.1",
  "description": "",
  "main": "dist/index.js", //入口文件
  "scripts": {
    "clean": "rimraf ./dist",
    "start": "rollup -c ./config/rollup.js -w", //监听文件变化自动build
    "build:cjs": "rollup -c ./config/rollup.js",
    "build": "npm run clean && npm run build:cjs"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.9.0", //babel核心库
    "@babel/preset-env": "^7.9.5", //根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5
    "@babel/preset-react": "^7.9.4", //转义react jsx
    "rimraf": "^3.0.2",
    "rollup": "^2.7.1",
    "rollup-plugin-babel": "^4.4.0"
  }
}
```

### rollup配置

```js
import babel from "rollup-plugin-babel";

export default {
    // 核心选项
    input: 'src/index.js',     // 必须
    output: {  // 必须 (如果要输出多个，可以是一个数组)
        // 核心选项
        file: 'dist/index.js',    // 必须
        format: 'cjs',  // 必须
    },
    plugins: [
        babel(),
    ],
    external: ['react']
};
```

### rollup配置output.format参数说明

- amd 异步模块定义，用于像RequireJS这样的模块加载器
- cjs CommonJS，适用于 Node 和 Browserify/Webpack
- iife 一个自动执行的功能，适合作为`<script>`标签
- umd 通用模块定义，以amd，cjs 和 iife 为一体
- esm ES6标准模块，适用于浏览器。通常库的所有功能打包成一个文件，使用时通过打包工具的tree shaking功能只打包使用到的模块。

### 开发过程

库的根目录 `npm link` 链接到系统全局。项目中使用 `npm link react-library-button`链接到项目，具体文件引入`improt Button from 'react-library-button'`。开发组件和库的过程中使用 `npm run start` 监听文件变化实时查看运行效果。

### npm发布

- npm login
- npm publish

### demo源码

github [rollup-react-library-button](https://github.com/n3taway/rollup-react-library-button)

&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;


over.