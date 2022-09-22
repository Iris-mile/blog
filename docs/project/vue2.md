---
# sidebar: auto
title: vue2
---

## 父传子
```js
1、props: {
    height: {
      type: String,
      default: '2.5rem'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
     
2、  props: ["weightRate"],
```
## 监听watch

```js
1、watch: {
    trainArriveInfo: {
      //解决异步没有获取到状态机数据
      handler: function (val, oldVal) {
        this.showArrive();
      },
      deep: true,
    },
  },
2、 watch: {
    editBtnShow(newVal, oldVal) {
        
      });
    },
  }
```

## computed
```js
// #一般只用getters,当依赖发生改变，key才改变
 computed: {
    key() {
      return this.$route.path
    }
  }
// #setters使用：先执行get，当currentPage被改变时候触发set再执行get。比如应用场景分页封装
 currentPage: {
      get() {
        return this.current
      },
      set(val) {
        this.$emit('update:current', val)
      }
    },
```

## 路由跳转
```js
1、this.$router.push({
            path: '/equipment/trouble',
            query: {deployId: data.deploymentId, }
          })

2、this.$router.push('/equipment/plan')
```
## 导出和引入export

````js
// #方式一：暴露单个，变量引入
    导出：export default {        
                xx:xx,
                hh:hh
            }
            or export default a
    引入：import 变量名 from '........'
    使用：变量名.xx,变量名.hh

// #方式二：暴露多个，解构引入
    导出：export const a=       export const b=  
    引入：import {a,b} from '........'
    使用：a,b
````