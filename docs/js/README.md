---
# sidebar: auto
title: js数据处理
---



## 处理树形组件需要数据
```js
 /* @function 处理菜单树*/

    handleTree(data, id, parentId, children, rootId) {
      id = id || 'id'
      parentId = parentId || 'parentId'
      children = children || 'children'
      rootId = rootId || 0
      // 对源数据深度克隆
      const cloneData = JSON.parse(JSON.stringify(data))
      // 循环所有项
      const treeData = cloneData.filter(father => {
        const branchArr = cloneData.filter(child => {
          // 返回每一项的子级数组
          return father[id] === child[parentId]
        })
        father.children = branchArr.length > 0 ? branchArr : ''
        // 返回第一层
        return father[parentId] === rootId
      })
      this.menuOptions = treeData
    }
```
tips：第二层filter的主要目的在于筛选出id为xx下的children子级节点内容。由于处理数据是对象类型，处理时数据共享对象本身被改变，所以导致
最后结果二级中包含三级内容，三级中包含四级等等。最后找到了每个id下内容的树形结构，筛选出从根节点的树形节点得到结果。数据本身样例如下：
```js
 const dataArr = [
        { name: '一级1', id: '1', pid: '0' },
        { name: '一级2', id: '2', pid: '0' },
        { name: '一级3', id: '3', pid: '0' },
        { name: '二级1', id: '11', pid: '1' },
        { name: '二级2', id: '12', pid: '1' },
        { name: '三级1', id: '111', pid: '11' },
        { name: '三级2', id: '121', pid: '12' },
        { name: '三级3', id: '123', pid: '12' },
    ]
```
## 标题 3



