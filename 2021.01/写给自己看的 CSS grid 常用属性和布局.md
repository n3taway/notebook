# CSS grid 常用属性和布局

[The State of CSS 2020: Trend Report](https://2020.stateofcss.com/en-US/report/) (2020 CSS趋势报告)中越来越多的 CSS 新特性被开发者熟悉并使用，其中grid布局有74%的开发者在使用，这也说明主流浏览器已经很好的支持了这个特性。在我工作编码中使用Flexbox用的比较多，grid布局用的比较少，整理一下grid常用属性和布局模式。



# 基本概念

1. 容器和项目

项目只能是容器的顶层子元素，不包含项目的子元素，Grid 布局只对项目生效。

2. 行和列

容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。

3. 单元格

正常情况下，n行和m列会产生n x m个单元格。比如，3行3列会产生9个单元格。

4. 网格线

正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线，比如三行就有四根水平网格线。

### tips

- <a href="#precompileCss">在预编译语言中计算符号需要做特殊处理。</a>

# 容器属性

1. grid 基础属性。

```html
<div class="layout">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
<style>
  .layout {
    width: 300px;
    height: 300px;
    display: grid;
    /* n行布局 */
    /* grid-template-rows: 10px 10px ... (n)px */
    /* n列布局 */
    /* grid-template-columns: 10px 10px ... (n)px; */

    /* n行 * n列 布局 */
    /* grid-template-rows: 10px 10px ... (n)px */
    /* grid-template-columns: 10px 10px ... (n)px; */


    /* 两份 平均分配。 */
    /* grid-template-columns: 1fr 1fr; */

    /* 三份 后者是前者的两倍。 */
    /* grid-template-columns: 1fr 2fr; */

    /* 一列大小 = (100% - 100px) / 3 */
    grid-template-columns: 1fr 2fr 100px;

    /* 两边固定 中间自适应。 */
    /* grid-template-columns: 100px auto 100px; */

    /* 12列平均分配。 */
    /* grid-template-columns: repeat(12, 1fr); */

    /* 行间隙 */
    /* row-gap: 10px; */

    /* 列间隙 */
    /* column-gap: 10px; */

    /* 行列属性复合间隙 */
    /* gap: 10px 10px; */

    /* 行列间隙相同 */
    /* gap: 10px; */
  }
  .layout div {
    background-color: rgba(0, 0, 0, 0.192);
    border: 1px solid rgba(0, 0, 0, 0.192);
  }
</style>
```
演示 [https://css-grid-practice.vercel.app/1container.html](https://css-grid-practice.vercel.app/1container.html)
2. **`grid-template-areas` + `grid-area`** 指定区域布局。
tips：指定区域布局后，项目元素的顺序是不用考虑的。

```html
    <div class="layout">
        <!-- 顺序无关 -->
        <div class="footer">Footer</div>
        <div class="sidebar">Sidebar</div>
        <div class="content">Content</div>
        <div class="header">Header</div>
    </div>
    <style>
        .layout {
            width: 300px;
            height: 300px;
            display: grid;
            /* 三行四列 */
            grid-template-areas:
                "hd hd   hd   hd"
                "sd main main main"
                "ft ft   ft   ft";
        }

        .layout div {
            border: 1px solid gray;
        }

        .header {
            grid-area: hd;
        }

        .sidebar {
            grid-area: sd;
        }

        .content {
            grid-area: main;
        }

        .footer {
            grid-area: ft;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/2container.html](https://css-grid-practice.vercel.app/2container.html)
3. **`grid-auto-flow`** 修改行列顺序
  tips：grid内的项目默认是 **先行后列** 的顺序。grid-auto-flow: column为**先列后行**排序。

```html
    <div class="layout">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
    </div>
    <style>
        .layout {
            display: grid;
            width: 300px;
            grid-template-rows: repeat(2, 50%);
            grid-template-columns: repeat(2, 50%);
            /* default */
            /* grid-auto-flow: row; */

            /* 列 从上往下 */
            grid-auto-flow: column;
        }

        .layout div {
            border: 1px solid gray;
            height: 100px;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/3container.html](https://css-grid-practice.vercel.app/3container.html)
4. **justify-items **  **align-items** 指定每个网格内容的位置。 （上.中.下）start | end | center ，和特殊的拉伸stretch。

   tips: 这两个属性作用在容器上，仅对顶级项目生效。**复合属性place-items**：align-items  justify-items; 只有一个值的情况下后面的值与第一个值一样。place-items：start; ===  place-items：start start;

```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-rows: repeat(2, 100px);
            grid-template-columns: repeat(3, 100px);
            /* 垂直方向顶部对齐。 */
            align-items: start;
            /* 水平方向居右对齐。  */
            justify-items: end;
            background-color: rgba(0, 0, 0, 0.200);
            width: 300px;
        }

        .wrapper div {
            border: 1px solid gray;
        }

        .item1 {
            background-color: rgb(127, 255, 238);
        }

        .item2 {
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/4container.html](https://css-grid-practice.vercel.app/4container.html)
5. **justify-content **  **align-content**  指定每个网格的位置。 start | end | center | stretch | space-around | space-between | space-evenly;整个内容的水平、垂直对齐方向。当网格没有具体的宽高时，这两个属性的默认值为stretch拉伸占据整个网格容器。**复合属性place-conten**t和place-items规则一样。

```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            /* 网格没有具体的宽高。 */
            grid-template-rows: repeat(2, 40px);
            grid-template-columns: repeat(3, 40px);

            /* 默认 拉伸占据整个网格容器。 */
            /* justify-content: stretch; */
            /* align-content: stretch; */

            justify-content: space-between;
            align-content: space-between;

            width: 300px;
            height: 200px;
            border: 1px solid gray;

        }

        .wrapper div {
            border: 1px solid gray;
        }

        .item1 {
            background-color: rgb(127, 255, 238);
        }

        .item2 {
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/5container.html](https://css-grid-practice.vercel.app/5container.html)
6. **grid-auto-columns  grid-auto-rows** 这两个属性用于定义超出网格外项目的宽高。
```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
        <div class="item7">7</div>
        <div class="item8">8</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            width: 300px;
            height: 400px;
            border: 1px solid gray;

            /* 更改行或列的排序 默认为行 下面一行可以不声明 */
            /* grid-auto-flow: row;  */
            /* 超出的行每行40px。 */
            grid-auto-columns: 40px; 

            /* 更改行或列的排序。列方向排序 */
            /* grid-auto-flow: column;  */
            /* 超出的行每行40px。 */
            /* grid-auto-rows: 40px;  */
        }

        .wrapper div {
            border: 1px solid gray;
        }

        .item1 {
            background-color: rgb(127, 255, 238);
        }

        .item2 {
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }

        .item7 {
            background-color: rgb(163, 168, 113);
        }

        .item8 {
            background-color: rgb(113, 143, 168);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/6container.html](https://css-grid-practice.vercel.app/6container.html)
## 项目属性

1. **grid-column-start 、grid-column-end  、grid-row-start 、grid-row-end** 网格自定义跨行跨列。

   tips：由于**`grid-auto-flow`**默认先行后列，所有从item5的跨行开始，再进行item1的跨列处理。跨行或跨列后会产生缝隙可以用**dense**紧密排列。

```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            width: 300px;
            border: 1px solid gray;
            /*  grid-auto-flow: row; */
            /*  grid-auto-flow: column; */
            /*  grid-auto-flow: row dense; 跨行后紧密 */
            /*  grid-auto-flow: column dense; 跨列后紧密 */
        }

        .wrapper div {
            border: 1px solid gray;
            height: 100px;
        }

        .item1 {
            grid-column-start: 1;
            grid-column-end: 3;
            /*  同时跨行跨列。 */
            /* grid-row-start: 3;  当前项目行从第3条行网格线开始 */
            /* grid-column-end: 1;  当前项目列在第1条列网格线结束 */
            /*  同时跨行跨列。 */
            /* grid-row-start: 2;  当前项目行从第2条行网格线开始 */
            /* grid-column-end: 1;  当前项目列在第1条列网格线结束 */
            background-color: rgb(127, 255, 238);
        }

        .item2 {
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/1item.html](https://css-grid-practice.vercel.app/1item.html)
2. **grid-column grid-row** 跨行跨列的简写，<a id="precompileCss"> 在预编译语言中计算符号需要做特殊处理。</a>

```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            width: 300px;
            border: 1px solid gray;
            /*  grid-auto-flow: row; */
            /*  grid-auto-flow: column; */
            /*  grid-auto-flow: row dense; 跨行后紧密 */
            /*  grid-auto-flow: column dense; 跨列后紧密 */
        }

        .wrapper div {
            border: 1px solid gray;
            height: 100px;
        }

        .item1 {
            grid-column: 1 / 3;
            background-color: rgb(127, 255, 238);

            /* less编译需要特殊处理 */
            /* grid-column: ~"1 / 3"; */
            /* grid-column: 1 e("/") 3; */
        }

        .item2 {
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/2item.html](https://css-grid-practice.vercel.app/2item.html)
3. **justify-self  align-self  ** 项目内水平、垂直方向的对齐方式，**复合属性place-self**。

```html
    <div class="wrapper">
        <div class="item1">1</div>
        <div class="item2">2</div>
        <div class="item3">3</div>
        <div class="item4">4</div>
        <div class="item5">5</div>
        <div class="item6">6</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-rows: repeat(2, 1fr);
            grid-template-columns: repeat(3, 1fr);
            width: 300px;
            height: 300px;
            border: 1px solid gray;
        }

        .wrapper div {
            border: 1px solid gray;
        }

        .item1 {
            /* 内容水平居右 */
            justify-self: end;
            background-color: rgb(127, 255, 238);
        }

        .item2 {
            /* 内容垂直顶部 */
            align-self: start;
            background-color: rgb(169, 211, 197);
        }

        .item3 {
            /* 内容垂直居中 */
            align-self: center;
            background-color: rgb(152, 168, 113);
        }

        .item4 {
            background-color: rgb(168, 140, 113);
        }

        .item5 {
            background-color: rgb(209, 241, 194);
        }

        .item6 {
            background-color: rgb(168, 113, 150);
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/3item.html](https://css-grid-practice.vercel.app/3item.html)
# 常用布局

1. 容器宽度固定/不固定，每行确定个数并平均分配。

```html
    <div class="layout">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <!-- <div>.</div> -->
        <!-- <div>.</div> -->
        <!-- <div>.</div> -->
    </div>
    <style>
        .layout {
            display: grid;
            grid-template-columns: repeat(auto-fill, 33.33%);
        }

        .layout div {
            height: 300px;
            border: 1px solid gray;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/1layout.html](https://css-grid-practice.vercel.app/1layout.html)
2. 容器宽度不固定，每列固定宽度自动换行，达到每一行/列，容纳尽可能多的单元格。

```html
    <div class="layout">
        <div>1</div>
        <div>2</div>
        <div>3</div>
        <div>4</div>
        <div>5</div>
        <div>6</div>
        <div>7</div>
        <div>8</div>
        <div>9</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <!-- <div>.</div> -->
        <!-- <div>.</div> -->
        <!-- <div>.</div> -->
    </div>
    <style>
        .layout {
            display: grid;
            grid-template-columns: repeat(auto-fit, 300px);
        }

        .layout div {
            height: 300px;
            border: 1px solid gray;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/2layout.html](https://css-grid-practice.vercel.app/2layout.html)
3. 上中下结构，内容是侧边的倍数。

```html
    <div class="wrapper">
        <div class="header">Header</div>
        <div class="sidebarLeft">Sidebar</div>
        <div class="content">Content</div>
        <div class="sidebarRight">Sidebar</div>
        <div class="footer">Footer</div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-areas:
                "hd hd   hd   hd"
                "sdl main main sdr"
                "ft ft   ft   ft";
            width: 300px;
            height: 400px;
        }

        .wrapper div {
            border: 1px solid gray;
        }

        .header {
            grid-area: hd;
        }

        .sidebarLeft {
            grid-area: sdl;
        }

        .sidebarRight {
            grid-area: sdr;
        }

        .content {
            grid-area: main;
        }

        .footer {
            grid-area: ft;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/3layout.html](https://css-grid-practice.vercel.app/3layout.html)
4. 两列表单，特殊列占整行。

```html
    <div class="wrapper">
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="rowCol2">
            <div>text</div>
        </div>
        <div class="fieldWrap">
            <div class="label">label</div>
            <div>text</div>
        </div>
        <div class="row">
            <div>text</div>
        </div>
    </div>
    <style>
        .wrapper {
            display: grid;
            grid-template-columns: repeat(auto-fit, 50%);
            width: 300px;
        }
        .wrapper div{
            border: 1px solid gray;
        }

        .fieldWrap {
            display: grid;
            grid-template-columns: 50px auto;
            min-height: 40px;
            margin-bottom: 5px;
        }

        .rowCol2 {
            display: grid;
            grid-column: 1 / 3;
            grid-template-columns: 50px auto;
            min-height: 40px;
            margin-bottom: 5px;
        }

        .row {
            display: grid;
            grid-column: 1 / 3;
            min-height: 40px;
            margin-bottom: 5px;
        }
    </style>
```
演示 [https://css-grid-practice.vercel.app/4layout.html](https://css-grid-practice.vercel.app/4layout.html)

### demo
- [ ] 用grid布局轻松完成矢量马赛克文字。
- [x] 补充贴图



# 参考链接

- [CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)  by ruanyifeng
- [Problems with compile grid-column less](https://stackoverflow.com/questions/45957961/problems-with-compile-grid-column-less)  less个别属性需特别处理


