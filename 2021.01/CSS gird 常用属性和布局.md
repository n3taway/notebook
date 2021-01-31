# CSS gird 常用属性和布局

[The State of CSS 2020: Trend Report](https://2020.stateofcss.com/en-US/report/) (2020 CSS趋势报告)中越来越多的 CSS 新特性被开发者熟悉并使用，其中grid布局有74%的开发者在使用，这也说明主流浏览器已经很好的支持了这个特性。在我工作编码中使用Flexbox用的比较多，gird布局用的比较少，整理一下grid常用属性和布局模式。



# 基本概念

1. 容器和项目

项目只能是容器的顶层子元素，不包含项目的子元素，Grid 布局只对项目生效。

2. 行和列

容器里面的水平区域称为"行"（row），垂直区域称为"列"（column）。

3. 单元格

正常情况下，n行和m列会产生n x m个单元格。比如，3行3列会产生9个单元格。

4. 网格线

正常情况下，`n`行有`n + 1`根水平网格线，`m`列有`m + 1`根垂直网格线，比如三行就有四根水平网格线。

# 属性

1. **`display: grid;`**

```html
<div className={styles.layout}>
      <div className={styles.item}>1</div>
      <div className={styles.item}>2</div>
</div>
<style lang="less">
  .layout{
    display: grid;
    // 列布局 两列。
    // grid-template-columns: 70% calc(30% + 1px);
    // 行布局，两行。不配置row 默认为一行并占满。
    // grid-template-rows: 30% 70%;
   	
    // 重复列，5列每列20%。
    // grid-template-columns: repeat(5, 20%);
    
    // 片段, 用作倍数。
    // 两份 平均分配。
    // grid-template-columns: 1fr 1fr;
    // 三份 后者是前者的两倍。
    // grid-template-columns: 1fr 2fr;
    // 一份 = (100% - 100px) / 3
    // grid-template-columns: 1fr 2fr 100px;
  	// 两边固定 中间自适应。
    // grid-template-columns: 100px auto 100px;
    // 12列平均分配。
    // grid-template-columns: repeat(12, 1fr);
    
    // 行间隙
    // row-gap: 10px;
    // 列间隙
    // column-gap: 10px;
    // 行列属性复合间隙
    // gap: 10px 10px;
    // 行列属性复合+值复合 间隙
    // gap: 10px;
  }
</style>
```

2. **`grid-template-areas` + `grid-area`** 指定区域布局
tips：指定区域布局后，项目元素的顺序是不用考虑的。

```html
<div className={styles.wrapper}>
  {/* 顺序无关 */}
  <div className={styles.footer}>Footer</div>
  <div className={styles.sidebar}>Sidebar</div>
  <div className={styles.content}>Content</div>
  <div className={styles.header}>Header</div>
</div>
<style lang="less">
.wrapper {
	display: grid;
  // 三行四列
  grid-template-areas:
    "hd hd   hd   hd"
    "sd main main main"
    "ft ft   ft   ft";
 }
  
 div{  border: 1px solid gray; }

.header { grid-area: hd; }
.sidebar { grid-area: sd; }
.content { grid-area: main; }
.footer { grid-area: ft;  }
</style>
```

3. **`grid-auto-flow`** 行列顺序。
  tips：grid内的项目默认是 **先行后列** 的顺序。grid-auto-flow: column为**先列后行**排序。

```html
<div className={styles.wrapper}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
</div>
<style lang="less">
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,50%);
  grid-template-columns: repeat(2,50%);
  // grid-auto-flow: row; // default
  grid-auto-flow: column;
  div{
    border: 1px solid gray;
    height: 100px;
  }
}
</style>
```
4. **justify-items **  **align-items** 项目内容水平、垂直的位置 （上.中.下）start | end | center ，和特殊的拉伸stretch。

   tips: 这两个属性作用在容器上，仅对顶级项目生效。**复合属性place-items**：align-items  justify-items; 只有一个值的情况下后面的值与第一个值一样。place-items：start; ===  place-items：start start;

```html
<div className={styles.wrapper}>
  <div className={styles.item1}>1</div>
  <div className={styles.item2}>2</div>
  <div className={styles.item3}>3</div>
  <div className={styles.item4}>4</div>
  <div className={styles.item5}>5</div>
  <div className={styles.item6}>6</div>
</div>
<style lang="less">
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,100px);
  grid-template-columns: repeat(3,100px);
  // align-items: start; 垂直方向顶部对齐。
  justify-items: end; 水平方向居右对齐。
  div{
    border: 1px solid gray;
  }
  .item1{
    background-color: rgb(127, 255, 238);
  }
  .item2{background-color: rgb(169, 211, 197);}
  .item3{background-color: rgb(152, 168, 113);}
  .item4{background-color: rgb(168, 140, 113);}
  .item5{
    background-color: rgb(209, 241, 194);
  }
  .item6{background-color: rgb(168, 113, 150);}
}
</style>
```
6. **justify-content **  **align-content** start | end | center | stretch | space-around | space-between | space-evenly;整个内容的水平、垂直对齐方向。当网格没有具体的宽高时，这两个属性的默认值为stretch拉伸占据整个网格容器。**复合属性place-conten**t和place-items规则一样。

```html
<div className={styles.wrapper}>
  <div className={styles.item1}>1</div>
  <div className={styles.item2}>2</div>
  <div className={styles.item3}>3</div>
  <div className={styles.item4}>4</div>
  <div className={styles.item5}>5</div>
  <div className={styles.item6}>6</div>
</div>
<style lang="less">
.wrapper {
  display: grid;
  // 网格没有具体的宽高。
  grid-template-rows: repeat(2,1fr);
  grid-template-columns: repeat(3,1fr);
  // 拉伸占据整个网格容器。
  // justify-content: stretch;
  // align-content: stretch;
  width: 800px;
  height: 400px;
  border: 1px solid gray;
  div{
    border: 1px solid gray;
  }
  .item1{ background-color: rgb(127, 255, 238);}
  .item2{background-color: rgb(169, 211, 197);}
  .item3{background-color: rgb(152, 168, 113);}
  .item4{background-color: rgb(168, 140, 113);}
  .item5{ background-color: rgb(209, 241, 194);}
  .item6{background-color: rgb(168, 113, 150);}
}
</style>
```

7. **grid-auto-columns  grid-auto-rows** 这两个属于用于定义超出网格外项目的宽高。
```html
<div className={styles.wrapper}>
  <div className={styles.item1}>1</div>
  <div className={styles.item2}>2</div>
  <div className={styles.item3}>3</div>
  <div className={styles.item4}>4</div>
  <div className={styles.item5}>5</div>
  <div className={styles.item6}>6</div>
  <div className={styles.item7}>7</div>
  <div className={styles.item8}>8</div>
</div>
<style lang=”less“>
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,1fr);
  grid-template-columns: repeat(3,1fr);
  width: 800px;
  height: 400px;
  border: 1px solid gray;

  grid-auto-flow: row; // default 这行可以不声明。
  grid-auto-rows: 40px; // 超出的行每行40px。
  
  // grid-auto-flow: column; // 定义了此属性，超出的列宽才生效。
  // grid-auto-columns: 40px; // 超出的列每列40px。
  div{
    border: 1px solid gray;
  }
  .item1{background-color: rgb(127, 255, 238);}
  .item2{background-color: rgb(169, 211, 197);}
  .item3{background-color: rgb(152, 168, 113);}
  .item4{background-color: rgb(168, 140, 113);}
  .item5{background-color: rgb(209, 241, 194);}
  .item6{background-color: rgb(168, 113, 150);}
  .item7{background-color: rgb(163, 168, 113);}
  .item8{background-color: rgb(113, 143, 168);}
}
</style>
```

## 项目属性

1. **grid-column-start 、grid-column-end  、grid-row-start 、grid-row-end** 网格自定跨行跨列

   tips：由于**`grid-auto-flow`**默认先行后列，所有从item5的跨行开始，再进行item1的跨列处理。跨行或跨列后会产生缝隙可以用**dense**紧密排列。

```html
<>
  <div>自定义跨行跨列布局</div>
  <div className={styles.wrapper}>
    <div className={styles.item1}>1</div>
    <div className={styles.item2}>2</div>
    <div className={styles.item3}>3</div>
    <div className={styles.item4}>4</div>
    <div className={styles.item5}>5</div>
    <div className={styles.item6}>6</div>
  </div>
</>
<style lang="less">
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,50%);
  grid-template-columns: repeat(3,33.33%);
  // grid-auto-flow: row;
  // grid-auto-flow: column;
  // grid-auto-flow: row dense; //跨行后紧密
  // grid-auto-flow: column dense; //跨列后紧密
  div{
    border: 1px solid gray;
    height: 100px;
  }
  .item1{
    grid-column-start: 1;
    grid-column-end: 3;
		// 同时跨行跨列。
		//grid-row-start: 3; // 当前项目行从第3条行网格线开始
    //grid-column-end: 1; // 当前项目列在第1条列网格线结束
		// 同时跨行跨列。
		//grid-row-start: 2; // 当前项目行从第2条行网格线开始
    //grid-column-end: 1; // 当前项目列在第1条列网格线结束
    background-color: rgb(127, 255, 238);
  }
  .item2{background-color: rgb(169, 211, 197);}
  .item3{background-color: rgb(152, 168, 113);}
  .item4{background-color: rgb(168, 140, 113);}
  .item5{
    grid-row-start: 1;
    grid-row-end: 3;
    background-color: rgb(209, 241, 194);
  }
  .item6{background-color: rgb(168, 113, 150);}
}
</style>
```

2. **grid-column grid-row** 跨行跨列的简写。 在预编译语言中计算符号需要做特殊处理。

```html
<div className={styles.wrapper}>
  <div className={styles.item1}>1</div>
  <div className={styles.item2}>2</div>
  <div className={styles.item3}>3</div>
  <div className={styles.item4}>4</div>
  <div className={styles.item5}>5</div>
  <div className={styles.item6}>6</div>
</div>
<style lang="less">
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,1fr);
  grid-template-columns: repeat(3,1fr);
  width: 800px;
  height: 400px;
  border: 1px solid gray;
  div{
    border: 1px solid gray;
  }
  .item1{
    // grid-area 复合属性 grid-row-start、grid-column-start、grid-row-end、grid-column-end 注意顺序。
    // grid-area: ~ "1 / 1 / 3 / 3"; 
    
    // grid-column: ~"1 / 3";
    grid-column: 1 e("/") 3;
    grid-row: 1 e("/") 3;
    background-color: rgb(127, 255, 238);
  }
  .item2{background-color: rgb(169, 211, 197);}
  .item3{background-color: rgb(152, 168, 113);}
  .item4{background-color: rgb(168, 140, 113);}
  .item5{background-color: rgb(209, 241, 194);}
  .item6{background-color: rgb(168, 113, 150);}
}
</style>
```

3. **justify-self  align-self  ** 项目内水平、垂直方向的对齐方式，**复合属性place-self**。

```html
<div className={styles.wrapper}>
  <div className={styles.item1}>1</div>
  <div className={styles.item2}>2</div>
  <div className={styles.item3}>3</div>
  <div className={styles.item4}>4</div>
  <div className={styles.item5}>5</div>
  <div className={styles.item6}>6</div>
</div>
<style lang="less">
.wrapper {
  display: grid;
  grid-template-rows: repeat(2,1fr);
  grid-template-columns: repeat(3,1fr);
  width: 800px;
  height: 400px;
  border: 1px solid gray;
  div{
    border: 1px solid gray;
  }
  .item1{
    justify-self: end; // 内容水平居右
    background-color: rgb(127, 255, 238);
  }
  .item2{
    align-self: start; // 内容垂直顶部
    background-color: rgb(169, 211, 197);
  }
  .item3{
    align-self: center; // 内容垂直居中
    background-color: rgb(152, 168, 113);
  }
  .item4{background-color: rgb(168, 140, 113);}
  .item5{background-color: rgb(209, 241, 194);}
  .item6{background-color: rgb(168, 113, 150);}
}
</style>
```

   

# 常用布局

1. 容器宽度固定/不固定，每行确定个数并平均分配。

```html
// 100 / 3 = 33.33%  
// 没行3个平均分配。
<style lang="less">
.layout{
  display: grid;
  //width: 100px; 
  width: 100px; 
  grid-template-columns: repeat(auto-fill, 33.33%);
  div{
    height: 100px;
    border: 1px solid gray;
  }
}
</style>
<div className={styles.layout}>
  <div>1</div>
  ...
</div>

```

2. 容器宽度不固定，每列固定宽度自动换行，达到每一行/列，容纳尽可能多的单元格。

```html
<style lang="less">
.layout{
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  div{
    height: 200px;
    border: 1px solid gray;
  }
}
</style>
<div className={styles.layout}>
  <div>1</div>
  ...
</div>


```

3. 上中下结构，内容是侧边的倍数。

```html
<div className={styles.wrapper}>
  <div className={styles.header}>Header</div>
  <div className={styles.sidebarLeft}>Sidebar</div>
  <div className={styles.content}>Content</div>
  <div className={styles.sidebarRight}>Sidebar</div>
  <div className={styles.footer}>Footer</div>
</div>
<style lang="less">
  .wrapper {
  display: grid;
  grid-template-areas:
    "hd hd   hd   hd"
    "sdl main main sdr"
    "ft ft   ft   ft";
  div{
    border: 1px solid gray;
  }
  .header { grid-area: hd; }
  .sidebarLeft { grid-area: sdl; }
  .sidebarRight { grid-area: sdr; }
  .content { grid-area: main; }
  .footer { grid-area: ft; }
}
</style>
```

### demo
- [ ] 用grid布局轻松完成矢量马赛克文字。



# 参考链接

- [CSS Grid 网格布局教程](http://www.ruanyifeng.com/blog/2019/03/grid-layout-tutorial.html)  by ruanyifeng
- [Problems with compile grid-column less](https://stackoverflow.com/questions/45957961/problems-with-compile-grid-column-less)  less个别属性需特别处理


