---
# sidebar: auto
title: 业务需求1
---
**需求背景**：在角色列表中，当点击列表中某行角色进行匹配人员时弹出人员列表弹框。弹框内容有：人员分页列表，角色下已经存在和勾选人员总数统计。

**难点**：
- 统计总的勾选人员
- 初始默认勾选回显
- 分页切换对默认勾选和性能优化的处理

**ui效果图如下：**
![ui图](/blog/assets/img/project1-1.jpg)

### 所用到函数和字段介绍
 + 表格绑定属性:row-key="getRowKey"，用于分页切换表格记忆之前选中
 ```js
 getRowKey(row) {
      return row.userId
    },
 ```
+ 表格方法统计选择项：@selection-change="handleSelectionChange"
```js
handleSelectionChange(selection) {
      this.checkArr = selection.map(item => item.userId)
      console.log(this.checkArr, 'this.checkArr')
    },
```
+ 处理表格回显默认已有数据选中：setCheckedRows.主要用到el表格方法toggleRowSelection去匹配选中某行。该方法在分页切换获取人员表格数据后调用进行选中。后面将详细阐述这个方法的逻辑处理区别和性能影响（此处性能主要指减少平凡操作dom）
```js
 this.$refs.table.toggleRowSelection(item, true)

   /**
     * @function 获取所有人员
     */
    async getUserPage() {
      const params = { ...this.pageParams, status: 0 }
      const { data: { records, total }} = await userPage(params)
      this.total = total
      this.tableData = records
      this.setCheckedRows()
    },
```
+ 所用data字段：
```js
 checkArr: [],//表格统计已经勾选数组
 defaultSelectIds: []//该条数据初始的时候已经有的人员数组，需要默认勾选的表格数据。
```

### setCheckedRows的各种处理
 下面将阐述用于勾选默认初始内容回显勾选setCheckedRows方法的处理对于最后统计表格选择数据人员handleSelectionChange方法的影响
#### 一、大众普遍方法
这个处理主要借鉴了网上以及其他伙伴的处理：匹配到需要勾选内容后进行选中行。
```js
 setCheckedRows() {
      this.$nextTick(() => {
        this.tableData.forEach((item) => {
          const i = this.defaultSelectIds.indexOf(item.userId)
          if (i > -1) {
            this.$refs.table.toggleRowSelection(item, true)
          }
        })
      })
    },
```
**bug** ：当我将第一页需要默认选中的回显选中后，手动取消勾选切换到第二页。第一页的默认选中会再次被勾选，原因是分页回来再次调用setCheckedRows方法勾选了，即便切换分页前前取消了勾选。

**fix** ：已经选中过后就将存储默认选中的defaultSelectIds的已选过项删除
```js
setCheckedRows() {
      this.$nextTick(() => {
        this.tableData.forEach((item) => {
          const i = this.defaultSelectIds.indexOf(item.userId)
          if (i > -1) {
            this.$refs.table.toggleRowSelection(item, true)
            this.defaultSelectIds.splice(i, 1)
          }
        })
      })
    },
```
** result**：最后也能实现业务需求的啦，但是后面将讲一下这种方法实现的本质和缺陷。

#### 二、本人初始方法
本人初始方法，与大众的方法在于没有使用this.$nextTick。那么问题来了，那就是对于handleSelectionChange的影响。
```js
setCheckedRows() {
        this.tableData.forEach((item) => {
          const i = this.defaultSelectIds.indexOf(item.userId)
          if (i > -1) {
            this.$refs.table.toggleRowSelection(item, true)
          }
        })
    },
```
**problem** ：在我没有使用this.$nextTick的情况下，此时表格的handleSelectionChange的会重复统计。比如我第一页勾选了默认2号，方法统计了一个2，切换到其他页再次切换回来，**最后我的统计勾选里面就有2个2号**。

**思考** ：this.$nextTick的影响是什么呢？为什么不加会导致表格方法重复统计
 
 **查阅**：this.$nextTick是当我更新了dom的相关数据的时候，然后去操作dom，通过dom的属性去获取这个相关数据。没有获取到最新的数据，还是旧dom数据没有改变的，这时可以借助this.$nextTick。
  
  **解释**：大众方法用了this.$nextTick。第一页的默认勾选切换到第二页再回到第一页，此时是重新获取了新的dom表格，进行再次勾选纳入统计。舍弃了第一次第一页的统计，因为本质dom表格就不一样，所以统计的不一样。但是不用的话dom没有更新，再次勾选会纳入之前dom统计所以重复。

**fix**：不使用当然也可以修复啦。修复如下：将已经勾选过得内容进行删除。即便切换回来dom没有更新，但是已经处理过勾选内容就不会再次匹配勾选，当然也不会纳入统计啦。
```js
setCheckedRows() {
        this.tableData.forEach((item) => {
          const i = this.defaultSelectIds.indexOf(item.userId)
          if (i > -1) {
            this.$refs.table.toggleRowSelection(item, true)
            this.defaultSelectIds.splice(i, 1)
          }
        })
    },
```

#### 三、统计最终处于勾选的总和
取已经勾选，还有没有来得及分页切换勾选默认的并集去重
```js
computed: {
    userArr() {
      return [...new Set([...this.defaultSelectIds, ...this.checkArr])]
    }
  }
```

#### 四、最终优化方案
为什么要优化呢？大众方法和我的方法都可以修复bug实现需求。在说优化方案前，先说下优化原因吧。大众方法通过this.neckTick频繁操作了dom，我的方法修复bug后蹩脚实现，逻辑不是那么通透合理，每次分页都要调用默认选中方法进行遍历判断。优化方案将减少dom操作并且符合需求逻辑顺序。先上完整代码：
``` js
data() {
    return {
      tableData: [],
      pageParams: {
        current: 1,
        size: 5
      },
      total: 0,
      checkArr: [], // 表格统计选中的
      defaultSelectIds: [], // 默认需要选中的
      defaultCheckedPage: [] // 已经切换过进行默认选中的页
    }
  },
  computed: {
    userArr() {//统计最后总数
      return [...new Set([...this.defaultSelectIds, ...this.checkArr])]
    }
  },
  watch: {
    async visible(newValue) {
      if (newValue === true && this.roleId !== '') { // 打开弹窗后调接口获取人员列表和默认需要选中的
        await this.getHasUser()
        this.getUserPage()
      }
    }
  },
  methods: {
    /**
     * @function 绑定表格row-key记忆勾选翻页
     */
    getRowKey(row) {
      return row.userId
    },
    /**
     * @function 获取已选人员
     */
    async getHasUser() {
      const res = await roleUser({ roleId: this.roleId })
      this.defaultSelectIds = res.data
      console.log(res.data, '传递的需要默认选中')
    },
    /**
     * @function 获取所有人员
     */
    async getUserPage() {
      const params = { ...this.pageParams, status: 0 }
      const { data: { records, total }} = await userPage(params)
      this.total = total
      this.tableData = records
      this.setCheckedRows()//每次分页都进行了默认勾选方法调用
    },
    /**
     * @function 表格统计勾选过的选项
     */
    handleSelectionChange(selection) {
      this.checkArr = selection.map(item => item.userId)
      console.log(this.checkArr, 'this.checkArr')
    },

    /**
     * @function 表格回显选中
     */
    setCheckedRows() {
      if (this.defaultCheckedPage.includes(this.pageParams.current)) return// 已经进行过默认选中的页就不再调用setCheckedRows进行默认勾选

      this.defaultCheckedPage.push(this.pageParams.current)// 每次分页切换进行了默认勾选，就将这页纳入统计
      this.tableData.forEach((item) => {
        const i = this.defaultSelectIds.indexOf(item.userId)
        if (i > -1) {
          this.$refs.table.toggleRowSelection(item, true)
          this.defaultSelectIds.splice(i, 1)// 作用在于统计还没有分页切换需要默认勾选的内容
        }
      })
    },
```
可以发现：最后方法加了已经进行过默认勾选过页统计，最后通过判断这页是否经历过默认勾选，已经有就不再调用默认勾选。