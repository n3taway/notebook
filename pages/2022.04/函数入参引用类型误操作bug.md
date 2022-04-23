# 函数入参引用类型误操作bug

背景如下：
需求中要使用树组件实现某个功能。查看了项目中有类似的树组件，但不满足业务场景，需要重新封装一个树组件。在封装的时候使用了前同事的偏平数据转树的方法，发现了这个bug。奇怪的是这个转换函数在项目中使用了2年，都没出现问题，怎么我一使用就寄了呢？查看了之前使用树组件的场景，都是一个页面使用了一次组件，故只调用了一次转换数据的方法。而我这边的需求要在页面中多次使用树组件，调用了多次转换数据的方法，bug就出现了。。。。。


```js
const treeData1 = [
    {
      categoryName: 'Node1',
      id: 4,
      parentId:0
    },
    {
      categoryName: 'Node1',
      id: 41,
      parentId:4
    },
   
  ];
  function convert(list) {
    const res = []
    // res[v.id] = v 副作用：对入参的引用
    const map = list.reduce((res, v) => (res[v.id] = v, res), {})
    // fix {...v} 如果元素中的值有复杂对象，用深拷贝处理
    // const map = list.reduce((res, v) => (res[v.id] = {...v}, res), {})

    for (const item of list) {
        if (item.parentId === 0) {
            res.push(item)
            continue
        }
        if (item.parentId in map) {
            // parent已经合list中的元素有引用关系了
            const parent = map[item.parentId]
            parent.children = parent.children || []
            parent.children.push(item)
        }
    }
    return res;
}
convert(treeData1);
console.log('JSON.stringify -> treeData1: ', JSON.stringify(treeData1));
// JSON.stringify -> treeData1:  [{"categoryName":"Node1","id":4,"parentId":0,"children":[{"categoryName":"Node1","id":41,"parentId":4}]},{"categoryName":"Node1","id":41,"parentId":4}]
convert(treeData1);
// 由于有convert函数对入参有引用操作，改变了入参的值，所以后续调用就会将错误数据继续改变
console.log('JSON.stringify -> treeData1: ', JSON.stringify(treeData1));
// JSON.stringify -> treeData1:  [{"categoryName":"Node1","id":4,"parentId":0,"children":[{"categoryName":"Node1","id":41,"parentId":4},{"categoryName":"Node1","id":41,"parentId":4}]},{"categoryName":"Node1","id":41,"parentId":4}] 
```
