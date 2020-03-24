&emsp;


# 浅析react动画

最近在看Ant Design组件的实现，其中Collapse的动画引起了我的兴趣，因为之前封装过类似的折叠组件，但是由于项目赶进度动画这方面就没实现，现在有时间就把折叠时展开/收缩的动效加上。虽然在实现的过程中遇到了一些小问题，但是通过分析(抄袭)Ant Design Collapse的动画实现，最终也明白了动画是如何实现的🌈

#### Collapse折叠组件的实现思路

折叠组件采用***组合组件***的设计模式，这种模式的优点是children的props管理起来方便，对Collapse,Tabs这类组件适用，子组件是挂在父组件的静态属性上的。

> ```jsx
> import Collapse from './Collapse';
> 
> export default Collapse;
> export const { Panel } = Collapse; //导出静态属性上的组件
> ```
>
> ```jsx
> import CollapsePanel from './CollapsePanel';
> 
> export default class Collapse extends Component {
> ...
> }
> Collapse.Panel = CollapsePanel; //子组件挂在父组件的静态属性上
> ```

通过以上的导出方式 用户使用起来也更语义化

> ```jsx
> <Collapse onChange={handleChange}>
>   <Panel key="1">
>     {text}
>   </Panel>
>   <Panel key="2">
>     {text}
>   </Panel>
> </Collapse>
> ```

但是如果没有对children的类型做判断的话，下面的方式也是可以用的，但是看起来比较别扭。

> ```jsx
> <Collapse onChange={handleChange}>
>   <div key="1"> //div元素
>     {text}
>   </div>
>   <Panel key="2"> //语义化的子组件
>     {text}
>   </Panel>
> </Collapse>
> ```

添加children的类型的校验。

> ```jsx
> import CollapsePanel from './CollapsePanel';
> 
> getNewChild = (child, index) => {
> 	...
>   if (child.type !== CollapsePanel) {//类型的校验
>   	return child;
>   }
>   ...
>   const props = {...};
>   return React.cloneElement(child, props);
> };
> 
> getItems = () => {
>   const { children } = this.props;
>   const newChildren = Children.map(children, this.getNewChild);
>   return newChildren;
> }
> ```



#### 分析Collapse折叠组件的动效

Collapse折叠组件的动画点在于：展开或收缩的高度有缓慢变大或变小的过程，通过css3的`transition`属性实现。当Collapse折叠组件的子项处于展开的状态我们可以拿到子项的具体高度，通过将高度设为0，`display：'none'`实现收缩的动效，但是当Collapse折叠组件的子项处于收起的状态我们不知道子项的高度，无法通过设置具体高度，`display：'block'`实现展开的动效。但是antd的Collapse组件动效却很不错，那就去看看源码吧😝

#### 源码分析

在源码中Ant Design的Collapse组件使用到了[rc-animate](https://www.npmjs.com/package/rc-animate)和[css-animation](https://www.npmjs.com/package/css-animation)包，看了一下是承玉大佬写的动效工具

实现的奥秘就是一开始就让元素不再隐藏，然后立即进行动画。由于不再隐藏的元素是可以获取宽高的，而且动画是随后立即进行的，所以仍然看到的是一个平滑的显示动画效果。

```jsx
export default class CollapsePanel extends Component {

    render() {
        return (
           ...
                <Animate
                    showProp="visible" // 指定控制子组件显示隐藏的属性
                    exclusive // 是否只允许同时播放一组动画（进入和离开）。
                    component="" // 包裹组件 默认为span
                    animation={{
                        enter(node, done) {
                            // 闭包 存储私有变量
                            let height;
                            return cssAnimation(node, transitionName, {
                                start() {
                                    // debugger
                                    // 动画的欺骗   揭开欺骗:可在各个运行阶段debugger
                                    // 先渲染出dom获取dom的参数
                                    height = node.offsetHeight;
                                    // 第一帧已经获取到dom的参数 然后立即隐藏dom
                                    node.style.height = 0;
                                },
                                active() {
                                    // debugger
                                    node.style.height = `${height}px`;
                                },
                                end() {
                                    // debugger
                                    // 动画完成后 恢复默认  PS:没有加单位
                                    node.style.height = '';
                                    done();
                                },
                            });
                        },
                        leave(node, done) {
                            return cssAnimation(node, transitionName, {
                                start() {
                                    // 重新获取dom参数 给定高度便于 css transition 动画
                                    node.style.height = `${node.offsetHeight}px`;
                                },
                                active() {
                                    node.style.height = `${0}px`;
                                },
                                end() {
                                    node.style.height = '';
                                    done();
                                },
                            });
                        },
                    }}
                >
                    <PanelContent
                        visible={isActive}
                    >
                        {this.props.children}
                    </PanelContent>
                </Animate>
           ...
        );
    }
}

class PanelContent extends React.Component {
    render() {
        const { visible } = this.props;
        ...
        return ...;
    }
}
```
通过debug可查看每个阶段的动画情况。 
![](https://raw.githubusercontent.com/n3tawayShadow/fileStore/master/2020.03/Collapse_animation_debugger.gif)

相关文章

- [React组件设计模式-组合组件](https://segmentfault.com/a/1190000019411474)
- [从jQuery分析隐藏元素的尺寸获取方法](http://acgtofe.com/posts/2013/11/getting-the-dimension-of-a-hidden-element)
&emsp;

&emsp;
&emsp;


&emsp;
&emsp;


&emsp;
&emsp;


&emsp;


over.