---
title: 数组方法运用
# sidebar: auto
---
## find
在数组里面找到某个元素
```js
 const data = res.data.find((item) => item.name === '纠正性工单流程')
```

## findIndex
findIndex找到元素的下标，没有就返回-1
```js
 const index = this.msgBoxList.findIndex(item => [1, 2].includes(item.params.model))
```

## some
数组中有一个满足条件就返回true
```js
 const hasPermission = store.state.user.userMenus.some(item => item.menuName === to.meta.title)

handleCheckLocation(locationList) {
      const isEmpty = locationList.some(item => !item.planId || !item.checkContent)
      if (isEmpty) {
        this.$message.warning('请选择位置或检测内容')
        return false
      } else {
        return true
      }
```

## sort
sort按照自定义排序
```js
const sourtList = ['系统管理', '设备管理', '设备事件管理];
  arr.sort((a, b) => {
    const aIndex = sourtList.indexOf(a.name);
    const bIndex = sourtList.indexOf(b.name);
    return aIndex - bIndex;
  })
```

## spilce
用于删除spilce a.splice(i, j, e1, e2, ...)表示从数组下标i开始删除j个替换成e1...。改变原数组
```js
const index = this.msgBoxList.findIndex(item => [1, 2].includes(item.params.model))

            if (index > -1) {
              this.msgBoxList.splice(index, 1)
            }
```

## slice
用于截取arr.slice(i, j) 表示将数组/字符串从 [i, j)（分界是前开后闭）切片，然后返回取出的片段，非原地操作。不改变原数组/字符串
```js
  var arr = [1, 2, 3, 4, 5]
    var sub = arr.slice(1, 4)
    console.log(sub) // [2, 3, 4]
```

## reduce
reduce和递归prev前一次循环结果，cur当前循环值，[]初始值
```js
 function filterMenus(menus, userMenus) {
  if (menus?.length) {
    return menus.reduce((prev, curr) => {
              const hasMenuItem = userMenus.some(item => item.menuName === curr.meta.title)
              if (hasMenuItem) {
                                                        if (curr?.children?.length > 1) {
  curr.children = filterMenus(curr.children, userMenus)
                        }                     
    return [...prev, curr]
                      } else {
                        return prev
                      }
            }, [])
          }
          return []
}
```

## filter
筛选出符合条件的组成新数组
filter筛选数组结合权限
```js
 /* 判断是否有权限 */
    const hasPermissioin = (router, role) => {
      if (router.meta && router.meta.roles) {
        return router.meta.roles.includes(role)
      } else {
        return true; // 没有配置roles（默认就是可以访问）
      }
    }
        
/* 计算出哪些路由是可以访问的 */
const calcPermisstionRoutes = (dynamicRoutes, role) => {
  // 把有权限的动态路由 计算出来
  let temp = dynamicRoutes.filter(v => {
    if (hasPermissioin(v, role)) { // 如果有权限 就返回true 把这个单个路由对象 放入temp
          if (v.children && v.children.length) { // 递归算儿子的权限
            v.children = calcPermisstionRoutes(v.children, role)
          }
          return true;
    } else {
      return false; // 否则 就是没有权限 就返回false 不放入temp
    }
  })
  return temp
}
```
## 递归+for跳出循环
```js
function getMenuName(menus, url) {
      let name = null
      function findMenuNameByUrl(menus, url) {
        for (const item of menus) {
          if (item.path === url) {
            name = item.meta.title
            break
          } else if (item?.children?.length) {
            findMenuNameByUrl(item.children, url)
          }
        }
      }
      findMenuNameByUrl(menus, url)
      return name
}
```

:::warming
改变原数组方法：pop,push,shift,unshift,reverse,sort,splice
:::