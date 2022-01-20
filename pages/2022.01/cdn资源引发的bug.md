# cdn 资源引发的 bug

背景如下：

一个 h5 项目，动画库使用了`vanta.js`。PC 端能够正常显示，移动端直接白屏！

debug 分析：

移动端报错信息由`vconsole`提供。

```js
`The above error occurred in the <AnimationFog> component:
in AnimationFog (created by Picture1)
in Picture1 (created by ReactFullpage)   
in div (created by ReactFullpage)
in Wrapper (created by ReactFullpage)   
in div (created by ReactFullpage)
in ReactFullpage (created by ChatReport2020)
in ChatReport2020 Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://fb.me/react-error-boundaries to learn more about error boundaries.`;
```

报错信息被`react error boundary`内部捕获，没由抛出具体原因。

已经知道是动画库导致的问题（屏蔽动画库代码没有错误信息抛出），直接在相关代码添加`try catch`查看具体原因。

```js {2,5}
useEffect(() => {
  try {
    const options = {};
    vantaInstance.current = VANTA.FOG(options);
  } catch (error) {
    console.log("error: ", error);
  }
  return () => {
    vantaInstance.current?.destroy?.();
  };
}, []);
```

捕获的错误原因如下。

```js
message: "Cannot read property 'Color' of undefined";
stack: `TypeError: Cannot read property 'Color' of undefinedat new r 
(https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.fog.min.js:1:9861)
at new n (https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.fog.min.js:1:11343)
at Object.r.<computed> [as FOG] (https://cdn.jsdelivr.net/npm/vanta@0.5.21/dist/vanta.fog.min.js:1:2593)
at http://192.168.124.12:8090/ChatReport2020/js/index45a2eddf.js:17747:37
at commitHookEffectListMount (http://192.168.124.12:8090/static/js/reactBase305af35b.js:19741:26)
at commitPassiveHookEffects (http://192.168.124.12:8090/static/js/reactBase305af35b.js:19779:11)
at HTMLUnknownElement.callCallback (http://192.168.124.12:8090/static/js/reactBase305af35b.js:198:14)
at Object.invokeGuardedCallbackDev (http://192.168.124.12:8090/static/js/reactBase305af35b.js:247:16)
at invokeGuardedCallback (http://192.168.124.12:8090/static/js/reactBase305af35b.js:302:31)
at flushPassiveEffectsImpl (http://192.168.124.12:8090/static/js/reactBase305af35b.js:22863:9)`;
```

从错误信息中可以看到是`vanta.js`的问题，没读取`Color`属性。更改`vantajs`引入方式 `import Fog from "vanta/dist/vanta.fog.min";` 为 `script` 标签。直接把动画库代码插入到`html`中运行，在读取`Color`属性处加上日志信息。

```html{14}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width,initial-scale=1.0,user-scalable=no"
    />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r121/three.min.js"></script>
    <script>
      // 动画库代码
      ...
      let s = "object" == typeof window && window.THREE;
      console.log('window.THREE',window.THREE);
      class r extends o.b {
        constructor(e) {
          ((s = e.THREE || s).Color.prototype.toVector = function () {
            return new s.Vector3(this.r, this.g, this.b);
          }),
            super(e),
            (this.updateUniforms = this.updateUniforms.bind(this));
        }
      }
      ...
    </script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

有趣的东西来了，PC端`console.log('window.THREE',window.THREE)`可以查看`threejs`对象，移动端却是`undefined`。
这就很明显了！移动端`threejs`没有加载成功！！再结合cdn资源提供商 `cdnjs.cloudflare.com`，谷歌一波《site:v2ex.com cloudflare 国内有节点吗》搜出来的全是吐槽。
cdn 直接更换为`cdn.jsdelivr.net`移动端、PC 端完美显示。

`vanta.js`基于`three.js`。

`three.js`资源由`cdnjs.cloudflare.com` 提供。

PC 端开启代理能够正常访问，移动端没有代理不能正常访问。

---

此次 bug 由不稳定的 cdn 服务产生，谷歌了一波找到了以下自动选择最佳 cdn 资源方案。

- https://www.v2ex.com/t/823977
- https://github.com/EtherDream/freecdn
