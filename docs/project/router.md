---
# sidebar: auto
title: 路由配置
---

路由可分为多级路由，都是在组件嵌套里面实现样式。比如二级路由组件在一级路由组件样式下，所以在区分页面几级路由时可以看页面变动切换的部分内容。通常简单的管理系统登录页分为一级路由页面，系统内部右下内容分为二级路由页面，包括首页在内。
## 一级路由配置
```js
 {
    path: '/login',
    component: Login
  },
```
## 初始系统进入重定向页面
   也就是所谓的打开地址见到的默认页面。网址的默认地址是"/"。redirect重定向地址到你想要进入的第一个页面地址，实际项目通常是定向到登录页。**但在开发中为了便于开发可以更改到正在开发中的页面**，就不用每次都要切换点击到自己正在开发中的页面啦。
   ```js
   {
    path: '/',
    redirect: '/login'
  },

  // or配置path为""
  {
    path: '',
    redirect: '/login'
  },
   ```

  ## 二级路由
  + 当二级路由里面只有一个页面，说明children只有一个。这个时候path可以将一级或二级配置为""都行，但更多的是将二级配置为""
  ```js
  {
    path: "/home",
    component: Layout,
    children: [{
      path: '',
      component: () => import("@/views/home/index.vue")
    }]
  },

  <!-- or配置一级为空"" -->
  {
    path: "",
    component: Layout,
    children: [{
      path: '/home',
      component: () => import("@/views/home/index.vue")
    }]
  },
  ```
  + 当二级有多个时候,通常配置如下：
  ```js
   {
    path: "/examine",
    component: Layout,
    redirect: '/examine/seller',
    children: [{
        path: 'seller',//注意不用："/seller"否则加载不出来。会自动拼接一级
        component: () => import("@/views/examine/SellExamine.vue")
      },
      {
        path: 'master',
        component: () => import("@/views/examine/MasterExamine.vue")
      }
    ]
  },
  ```
  这种方法呢是一般配置，需要注意的是二级在一级拼接的时候不需要"/xx"，比如"/seller"否则加载不出来导致最终加载不出来相应组件。但在项目中也有灵活配置，看项目菜单的点击需求。比如在项目**中点击二级的父级也可以跳转页面**，可参考如下配置：
  ```js
  {
    path: "/examine/seller",
    component: Layout,
    children: [{
        path: '/examine/seller',//不用重定向redirect时，path改为这个，一级path也是如此!!!!!!
        component: () => import("@/views/examine/SellExamine.vue")
      },
      {
        path: '/examine/master',
        component: () => import("@/views/examine/MasterExamine.vue")
      }
    ]
  }
  ```

  ::: tip
   + 当要去掉路由中的#时，路由模式改为history。当注意一定需要后端配置完成，否则部署上去将报错找不到路由
   + 当涉三级、四级路由等时，相应的都需要一个router-view路由出口。
  :::
  ### 多级路由
  ```js
  <!-- 1)抽离成单独组件将路由出口，在此layout下的切换路由页面 -->
  <template>
  <div>
    <Bread />
    <router-view :key="key" />
  </div>
</template>

<script>
import Bread from './Bread.vue'

export default {
  name: 'Box',

  components: { Bread },

  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<!-- 2）路由配置中父级component更改上面路由出口组件： -->
component: Box,
  children: [{}]
  ```