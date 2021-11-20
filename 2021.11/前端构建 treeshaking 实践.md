# 前端构建 treeshaking 实践

## 什么是 treeshaking

字面直译：树摇，把不要的枯叶摇掉，对于前端构建来说就是把无用的代码删掉，减少代码体积提升加载速度。前端 treeshaking 出现于 rollup，后来 webpack2 基于 uglify 也实现了。但 rollup 基于 es module 模块规范构建实现更优。后面的内容都是围绕 rollup 实践。

### 单独导出，整体导入

```js
// utils/share.js
export const s1 = (x) => {
  console.log(x);
};
export const s2 = (x) => {
  console.log(x);
};
// main.js
import * as share from "./utils/share.js";
share.s1("s1");
```

结果：s2 方法会被删除掉，因为 s1、s2 都是单独导出的，仅使用了 s1。

### 整体导出，整体导入

```js
// utils/help.js
const h1 = (x) => {
  console.log(x);
};
const h2 = (x) => {
  console.log(x);
};
export default {
  h1,
  h2,
};
// main.js
import help from "./utils/help.js";
help.h1("h1");
```

结果：h2 不会被摇掉，因为 h1，h2 为 help 模块的属性，而且 help 模块时整体导出

### 函数有副作用，依赖项未使用

```js
// utils/math.js
export function square(x) {
  return x.a;
}
square({ a: 123 });

export function cube(x) {
  return x * x * x;
}
// main.js
import { cube } from "./utils/maths.js";
console.log("cube(5): ", cube(5));
```

结果：square 不会删除，因为 square 函数对入参对象进行了访问属性操作（副作用操作）。




- [demo仓库](https://github.com/n3taway/fe-treeshaking-practice)


#### 参考文章

- [JS 模块规范：AMD、UMD、CMD、commonJS、ES6 module](https://segmentfault.com/a/1190000012419990)
- [Rollup：下一代 ES 模块打包工具](https://juejin.cn/post/6844903901754294280)
- [Webpack 中的 sideEffects 到底该怎么用？](https://github.com/kuitos/kuitos.github.io/issues/41)
