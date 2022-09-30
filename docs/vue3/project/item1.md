---
title: 项目问题
# sidebar: auto
---
## vue-router 4.x容错页404页面路由配置
与以往配置不一样，以往404容错页如下：为path:"*"
```js
 // 重定向404
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/404.vue')
  }
```
但在4.x中容错页path有所修改如下：
```js
 // 容错页配置
  {
    path:'/404',//注意与vue-router4不一样
    component:()=>import('@/views/error/index.vue')
  },
  {
    path:'/:pathMatch(.*)',
    redirect:'/404'
  }
```

## transition动画
vue3自带有transition动画，地址：[vue3:transition动画](https://cn.vuejs.org/guide/built-ins/transition.html#css-based-transitions)
应用如下,
```js
// html
    <router-view v-slot="{ Component }">
        <transition name='fade'>
          <component :is="Component" />
        </transition>
      </router-view>
// css：fade对应名字name='fade'
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(10px);
}
```

## 组件route使用
vue3中没有this，所以使用时候都需要在相应包中解构出使用方法，router使用同理如下：
```js
import {useRoute} from 'vue-router'
let $route =useRoute()

// 页面使用 
<p  :default-active="$route.path"> </p>
```

## 分模块状态机vuex
+ 目录结构
```
  ├─ store
    ├─ modules
        ├─ userState.js
        └─ menuState.js
    ├─ getters.js
    └─ index.js
 ```
+ index.js文件
```js
import {createStore} from 'vuex'//注意区分与vue2的方法

import menuState from './modules/menuState.js'
import getters from './getters'

let store=createStore({//实例化
  modules:{
    menuState,
  },
  getters
})
export default store
```
 + getter.js集中获取仓库state数据
```js
const getters={
  isShow:(state)=>state.menuState.isShow
}
export default getters
```

+ 在main.js中引入仓库
```js
import store from "/@store/index.js"
app.use(store)
```

+ vue组件中引用
```js
import {useStore} from 'vuex'
let $store=useStore()
console.log($store);

//集中getters.js目的和区别
 $store.getter.isShow//集中
 $store.state.menuState.isShow//不集中

 const isShow = computed(() =>$store.getters.isShow)
```
+ vuex结构
通过打印获取vuex的$store目录结构
![$store目录结构](/assets/img/vuex.jpg)
