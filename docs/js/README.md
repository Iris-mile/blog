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

## 三元判断
```js
 const code = res.data.msg ? res.data.code : res.status || 200
      const padZero = n => {
                  return n < 10 ? '0' + n : n
                }
```
## echarts图表数据处理
```js
const [xData, yData] = [[], []]   //避免多个遍历
      this.chartData.forEach(item => {
        item.time = dayjs(item.time).format('YYYY-MM-DD')
        xData.push(item.time)
        yData.push(item.value)
      })
```
## 命名变量和赋值
```js
const [startDate, endDate] = date || ['', '']
```
## 默认情况||
```js
  const msg = errorCode[code] || res.data.msg || errorCode['default']
```
## 类型转化
```js
  1、转数字：（+val） 
   2、转字符串:val+''   
   3、判断数字是整： Number.isInteger(+val)
```
## 解构赋值
```js
 const [hour, min, sec] = time.split(':')
```

## if语句处理
```js
  // 1·不同条件下return,先满足条件return
 hasPermission(vm) {
      const menus = local.get('menus')
      const { userMenus, jumpMoreUrl } = vm
      const menuName = getMenuName(menus, jumpMoreUrl)
      if (menuName === '历史事件信息' || menuName === '门禁事件信息') { 
        // 特殊处理安防历史事件页面，该页面无菜单显示
        return true
      }
      return userMenus.some(item => item.menuName === menuName)
    }
```
  ## 接口数据模拟
```js
   /**
     * @function 模拟表格数据
     */
    const data = new Array(7).fill(1)
    this.tableData = data.map(() => ({
      branch: '产品部',
      name: '张三',
      role: '安全员',
      empno: 'K13084849',
      tel: '345903284754389',
      email: '123@qq.com',
      status: '启用/禁用',
      updateTime: '2021-09-23 15:34:21'
    }
    ))

```

## 拼接
js文件拼接：EQUIPMENT_STATUS[v.status]》》》》》》》》EQUIPMENT_STATUS['1']>>>得到：“在线设备”
```js
export const EQUIPMENT_STATUS = {
  '1': '在线设备',
  '2': '离线设备',
  '3': '异常设备',
  '4': '总设备数',
}

EQUIPMENT_STATUS[v.status]
// 转化：EQUIPMENT_STATUS['1']
```
应用：
```js
import { FAULT_REPAIR_ORDER_STATUS } from '@/utils/constants';
 const  data= Object.keys(this.faultInfo).map(item => ({
              value: this.faultInfo[item],
              name: FAULT_REPAIR_ORDER_STATUS[item]
            }))
```

## 接口处理案例
主要应用解构，剩余参数，定义变量
```js
 data() {
    return {
      form: {
        taskName: null,
        taskType: null,
        taskState: null,
        date: null,
      },
      tableData: [],
      current: 1,
      size: 20,
      total: 0,
    }
  },


查询：async handleGetVideoCheckList() {
      const { current, size, form } = this//解构
      const { date, ...rest } = form//剩余参数
      const [startTime, endTime] = date || [null, null]//定义变量
      const params = { current, size, startTime, endTime, ...rest }
      const {
        data: { records, total },
      } = await getVideoCheckList(params)
      this.tableData = records
        this.total = total
    }
```
