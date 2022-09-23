
# Vue3 使用文档 Composition API 组合式 api【重点】

## vue3 特性

* Vue.js 3.0 "One Piece"  2019年发布
* 新的响应式原理 ref reactive
* **diff 算法优化**

  + Vue 2 中的虚拟 Dom 是全量比较。Vue 3 新增静态标记（PatchFlag）。在与数据变化后，与上次虚拟 DOM 节点比较时，只比较带有 PatchFlag 标记的节点。并且可以从 flag 信息中得知具体需要比较的内容。
  + **重写虚拟 DOM 的实现和 Tree-Shaking**
* **组合式 api（composition api） setup 函数** 【99%代码都在里面写】
* 新的计算属性 computed 新的侦听器 watch
* **hooks 语法** （当然是抄 react 的啦）
* 生命周期变化
* vue2 v-for 优先级高于 v-if **vue3 v-if 优先级高于 v-for**
* v-model的本质变化
  - prop：value -> modelValue；
  - event：input -> update:modelValue；
* .sync修改符已移除, 由v-model代替
* 其他组件和 api 变化

## vue3 router配置

### 路由使用三步骤

- 建 【views 文件夹下面简历里面级别组件    如果是后台框架就在src文件夹下 建立layout文件夹】
- 配 【router/index.js 里面配置页面级别组件和路由地址的一一对应关系】 
- 测 【输入地址测试 要给出口】 
  - 路由视图组件<router-view />  
  - 路由导航组件<router-link />

### router/index.js

```js
#createRouter 创建路由工厂函数
#createWebHashHistory 选用hash模式
#createWebHistory 或者选用历史模式 vue3 历史模式刷新不报错
import { createRouter, createWebHashHistory } from "vue-router";

#静态引入路由组件
import 静态组件 from '组件地址'

#配置路由地址和页面级别组件的一一对应关系
const routes = [
  {
	path:'/路由地址',
    component:()=>import('组件地址')  #懒加载路由组件
  },
  {
	path:'/路由地址',
    component:静态组件
  },
    
    
  
   # 404 修改了 /:pathMatch(.*)匹配所有路由
  {
    path: '/:pathMatch(.*)',
    redirect: '/404'
  },
  {
    path: '/404',
    component: () => import('@/views/not-found/index.vue'),
    hidden: true,
  }
]

#创建路由
const router = createRouter({
    history: createWebHashHistory(), #hash模式
    routes #导入路由配置
})

#导出配置好的路由
export default router
```

### main.js 导入

```js
#导入 createApp 工厂函数
import { createApp } from 'vue'
#导入App.vue 
import App from './App.vue'

//导入路由
import router from './router'

//拆解工厂函数创建对象
const app = createApp(App)
//使用路由
app.use(router)

//挂载在#app的div上
app.mount('#app')
```

## Composition API VS Option API

- 配置项 Option API 数据,方法,计算属性等等 写在规定的配置项里面

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f84e4e2c02424d9a99862ade0a2e4114~tplv-k3u1fbpfcp-watermark.image)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5ac7e20d1784887a826f6360768a368~tplv-k3u1fbpfcp-watermark.image)

- Composition API  组合式API 
- 我们可以更加优雅的组织我们的代码，函数。让相关功能的代码更加有序的组织在一起

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bc0be8211fc54b6c941c036791ba4efe~tplv-k3u1fbpfcp-watermark.image)

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cc55165c0e34069a75fe36f8712eb80~tplv-k3u1fbpfcp-watermark.image)

- 配置项API vs 组合式API

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2c421e5392504ecc94c222057dba338a~tplv-k3u1fbpfcp-watermark.image)

## 1 setup 函数 【重点】

* 新的 option, 所有的组合 API 函数都在此使用, 只在初始化时执行一次
* 函数如果返回对象, 对象中的属性或方法, 模板中可以直接使用

```js
在 `setup` 中你应该避免使用 `this`，因为它不会找到组件实例。`setup` 的调用发生在 `data` property、`computed` property 或 `methods` 被解析之前，所以它们无法在 `setup` 中被获取，这也是为了避免setup()和其他选项式API混淆。
```

```vue

<template>
    {{msg}}
    <button @click='sayHi'>点击我</button>
</template>

//基本用法
<script>
export default {
    setup(){
        #setup 函数里面执行的代码相当于 created生命周期

        const msg = '小樱'
        const sayHi = () => {
            return 'hi'
        }
        #return的属性和方法 可以在模板里面直接用
        return {
            msg,
            sayHi
        }
    }
  }
</script>


#高级用法 推荐！！！
<template>
    {{msg}}
    <button @click='sayHi'>点击我</button>
</template>

#setup 表示script里面的代码全部都写在setup函数内部  而vue3代码全部可以在里面跑完
<script setup>
#不需要return 定义好直接可以在模板里面使用 非常的nice！
const msg = '小樱'
const sayHi = () => {
    return 'hi'
}
</script>
```

## 2 ref 数据响应 【重点】

作用： **基本数据类型**的数据响应定义 或者**dom 连接**

* 基本数据类型绑定
  + 创建 RefImpl 响应式 Proxy 对象 ref 内部: 通过给 value 属性添加 getter/setter 来实现对数据的劫持
  + 定义数据之后，模板里面直接使用值
  + 修改数据 用.value 属性修改[重要!!!]
* 响应式状态需要明确使用[响应式 APIs](https://v3.cn.vuejs.org/api/basic-reactivity.html) 来创建。和从 `setup()` 函数中返回值一样，ref 值在模板中使用的时候会自动解包

```vue
<template>
    {{变量名}}
    <button @click='change'>点击我</button>
</template>

<script setup>
#引入ref 函数
import { ref } from 'vue'

#创建响应式数据
const 变量名 = ref(初始值)

#修改响应式数据   注意别修改原数据
const change = ()=> {
  变量名.value = 修改之后的值
}
</script>
```

* dom 绑定

```vue
<template>
   <标签 ref='变量名'></标签>
</template>

<script setup>
#引入ref 函数
import { ref } from 'vue'

#创建dom 绑定必须变量名 相同
const 变量名 = ref(null)
</script>
```

## 3 reactive 数据响应 【重点】

作用： **引用类型的数据响应定义 **

* 作用: 定义多个数据的响应式
* const proxy = reactive(obj): 接收一个普通对象然后返回该普通对象的响应式代理器对象
* 响应式转换是“深层的”：会影响对象内部所有嵌套的属性
* 内部基于 ES6 的 Proxy 实现，通过代理对象操作源对象内部数据都是响应式的



- 语法

```vue
<template>
    {{state.属性1}}
</template>

<script setup>
#引入reactive 函数
import { reactive } from 'vue'

#创建响应式数据
const state = reactive({
    属性1:值1,
})
</script>
```

```vue
<template>
    {{state.name}}
    {{state.k1.k2}}
    <button @click='change'>点击我</button>
</template>

<script setup>
#引入reactive 函数
import { reactive } from 'vue'

#创建响应式数据
const state = reactive({
    name:'小樱',
    k1:{
        k2:666
    }
})

#修改响应式数据   注意别修改原数据
const change = ()=>{
    state.name = '小狼'
    state.k1.k2 = 999
}
</script>
```

## 4 toRefs 【重点】

作用：将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 [ `ref` ](https://v3.cn.vuejs.org/api/refs-api.html#ref)。

当从组合式函数返回响应式对象时， `toRefs` 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：

- 语法

```js
<script setup>
#引入reactive toRefs 函数
import { reactive, toRefs } from 'vue'

#创建响应式数据
const state = reactive({
    属性1:值1,
    属性2:值2
})

#数据解构出来,创建属性的ref,都通过value来获取值
const { 属性1, 属性2 } = toRefs(state)
</script>
```

- 示例

```vue
<template>
    {{name}}
    {{age}}
    <button @click='change'>点击我</button>
</template>

<script setup>
#引入reactive toRefs 函数
import { reactive, toRefs } from 'vue'

#创建响应式数据
  const state = reactive({
    name: '小樱',
    age: 11,
    hobs: ['唱歌', '跳舞'],
    hands: {
        left: 100
    }
})

#数据解构出来 创建属性的ref 都通过value来获取值

#响应的ref数据改变会影响原代理对象
const { name, age, hobs, hands } = toRefs(state)

const change = () => {
    name.value = '小狼'
    age.value = 12
    hobs.value[0] = '洗澡澡'
    hands.value.left = 200
}
</script>
```

## 5 toRef 

可以用来为源响应式对象上的某个 property 新创建一个 [ `ref` ](https://v3.cn.vuejs.org/api/refs-api.html#ref)。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。

- 语法

```js
const state = reactive({
    属性1:值1
})

const ref变量 = toRef(state, '属性1')

```

- 示例

```js
const state = reactive({
    foo: 1,
    bar: 2
})

const fooRef = toRef(state, 'foo')

fooRef.value++
console.log(state.foo) // 2

state.foo++
console.log(fooRef.value) // 3
```

## 6 计算属性

* computed函数:
  + 与computed配置功能一致
  + 只有getter
  + 有getter和setter

- 语法

```js
#简单用法 只有getter形式
const 计算属性变量 = computed(() => {
  return 处理好的数据
});

#有getter 有 setter形式
const 计算属性变量 = computed({
  get() {
   	return xx
  },

  set(value) {
	  
  },
});
```

- 示例

```vue
#getter
<template>
    <h1>计算属性 computed</h1>
    <div>{{ msg }}</div>
    <div>取反数据:{{ reverseMsg }}</div>
    <button @click="msg = '我是一个新数据'">修改原数据</button>
</template>

<script setup>
import { computed, ref } from 'vue';
const msg = ref('我是一个数据')

//写法1 只有getter 得到计算属性的结果数据
const reverseMsg = computed(() => [...msg.value].reverse().join(''))

</script>


#getter & setter
<template>
    <h1>计算属性 computed</h1>
    <div>{{ msg }}</div>
    <div>取反数据:{{ reverseMsg }}</div>
    <button @click="msg = '我是一个新数据'">修改原数据</button>
    <button @click="changeRes">修改计算属性</button>
</template>

<script setup>
import { computed, ref } from 'vue';
const msg = ref('我是一个数据')

#写法2 getter函数 & setter函数  可以修改计算属性的值必须用到setter
const reverseMsg = computed({
    //取值 触发 getter函数
    get() {
        return [...msg.value].reverse().join('')
    },
    #改值触发 setter函数
    set(value) {
        msg.value = value
    }
})

const changeRes = () => {
    #修改计算属性 触发计算属性的setter函数
    reverseMsg.value = '我是计算属性的setter'
}
</script>
```

## 7 侦听器 watch

* watch函数 

  + 与watch配置功能一致

  + 监视指定的一个或多个响应式数据, 一旦数据变化, 就自动执行监视回调

  + 默认初始时不执行回调, 但可以通过配置immediate为true, 来指定初始时立即执行第一次

  + 通过配置deep为true, 来指定深度监视

    

* watchEffect函数 【理解】

  + 不用直接指定要监视的数据, 回调函数中使用的哪些响应式数据就监视哪些响应式数据
  + 默认初始时就会执行第一次, 从而可以收集需要监视的数据
  + 监视数据发生变化时回调

* 语法

```js
#简单用法 
watch(ref 或者reactive 数据,(newV,oldV)=>{
     //观察数据变化执行 里面代码
 },{
    immediate:true, //立即执行
    deep:true //深度监听
 })
 
#观察多个数据变化
watch([()=>state.属性1,()=>state.属性2],()=>{
        
})
 
#watchEffect 会立即执行里面代码  监视所有回调中使用的数据
watchEffect(()=>{
     
})
```

- 示例

```js
<template>
    <h1>watch & watchEffect 侦听器</h1>
    <h3>watch监听基本类型</h3>
    <input type="text" v-model="msg" name="" id="">
    <div>{{ msg }}</div>
    <h3>监听引用类型</h3>
    <div>{{ state }}</div>
    <button @click="state.fa.fa = '奶奶'; state.age = 13">深度改变state</button>
</template>

<script setup>
import { reactive, ref, watch, watchEffect } from 'vue';

//基本类型
const msg = ref('我是初始值')

//引用类型
const state = reactive({
    name: '小樱',
    age: 11,
    fa: {
        fa: '爷爷'
    }
})

//监听基本类型
watch(msg, (newV, oldV) => {
    //观察数据执行你想执行的一切代码
    console.log('oldV :>> ', oldV);
    console.log('newV :>> ', newV);
}, {
    immediate: true,//立即执行
    deep: true//深度监听
})

//监听引用类型  可以监听深度改变
watch(state, (newV) => {
    console.log('newV :>> ', newV);
})

//监听多个类型 基本类型直接写,引用类型用回调函数形式监听属性变化
watch([msg, () => state.age], (newV) => {
    console.log('多个监听 :>> ', newV);
})

//只要回调函数里面有数据被引用 就会执行回调函数代码 --[注重过程]
watchEffect(() => {
    console.log(666);
    console.log('观察 :>> ', msg.value);
})

</script>
```

## 8  生命周期

因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。

下表包含如何在 [setup ()](https://v3.cn.vuejs.org/guide/composition-api-setup.html) 内部调用生命周期钩子：

| 选项式 API        | Hook inside `setup`                      |
| ----------------- | :--------------------------------------- |
| `beforeCreate`    | Not needed*    不需要                    |
| `created`         | Not needed*    不需要                    |
| `beforeMount`     | `onBeforeMount` 挂载之前                 |
| `mounted`         | `onMounted`    页面加载完成时执行    ### |
| `beforeUpdate`    | `onBeforeUpdate`                         |
| `updated`         | `onUpdated`                              |
| `beforeUnmount`   | `onBeforeUnmount`                        |
| `unmounted`       | `onUnmounted`  页面销毁时执行   ###      |
| `errorCaptured`   | `onErrorCaptured`                        |
| `renderTracked`   | `onRenderTracked`                        |
| `renderTriggered` | `onRenderTriggered`                      |
| `activated`       | `onActivated`                            |
| `deactivated`     | `onDeactivated`                          |

```js
<script setup >
import { onMounted, onActivated, onUnmounted, onUpdated, onDeactivated } from 'vue';

 onMounted(() => {
	 console.log("组件挂载")
 })

 onUnmounted(() => {
 	console.log("组件卸载")
 })

 onUpdated(() => {
 	console.log("组件更新")
 })
 onActivated(() => {
 	console.log("keepAlive 组件 激活")
 })

 onDeactivated(() => {
	 console.log("keepAlive 组件 非激活")
 })
</script>
```

## 9 defineProps 和 defineEmits 父子传参

**`注意：defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的编译器宏**

```js
为了声明 `props` 和 `emits` 选项且具备完整的类型推断，可以使用 `defineProps` 和 `defineEmits` API，它们在 `<script setup>` 中都是自动可用的：

- **`defineProps` 和 `defineEmits` 都是只在 `<script setup>` 中才能使用的****编译器宏**。他们不需要导入，且会在处理 `<script setup>` 的时候被编译处理掉。
- `defineProps` 接收与 `props` 选项相同的值，`defineEmits` 也接收 `emits` 选项相同的值。
- `defineProps` 和 `defineEmits` 在选项传入后，会提供恰当的类型推断。
- 传入到 `defineProps` 和 `defineEmits` 的选项会从 setup 中提升到模块的范围。因此，传入的选项不能引用在 setup 范围中声明的局部变量。这样做会引起编译错误。但是，它*可以*引用导入的绑定，因为它们也在模块范围内。
```

### 父传子

```vue
#父组件
<template>
  <子组件 自定义属性1='静态' :自定义属性2='动态值'></子组件>
</template>

#子组件
<template>
  {{自定义属性1}}
  {{自定义属性1}}
</template>
<script setup>
  import { toRefs } from 'vue';
  #通过defineProps 接受的数据都在左侧自定义变量 props上[props变量是响应式的]
  #props接收的数据可以直接渲染
  const props = defineProps({
        自定义属性1:{
          type: 类型,
          default: () => 默认值
        },
        自定义属性2:{
          type: 类型,
          default: () => 默认值
        }
  })

</script>
```

### 子传父

```vue
#子组件
<script setup>

#定义子组件的自定义事件 -- 注册自定义事件
const emits = defineEmits(['自定义事件1','自定义事件2'])

#触发子传父事件
emits('自定义事件1', 数据)
</script>

#父组件
<template>
    <子组件 @自定义事件1="处理函数"></子组件>
</template>

<script setup>

#子组件 触发自定义事件1 父组件的处理函数 收到子传父的数据
const 处理函数 = (data) => {
    
}
</script>
```

## 10  defineExpose 子组件暴露数据方法

使用 `<script setup>` 的组件是**默认关闭**的，也即通过模板 ref 或者 `$parent` 链获取到的组件的公开实例，不会暴露任何在 `<script setup>` 中声明的绑定。

为了在 `<script setup>` 组件中明确要暴露出去的属性，使用 `defineExpose` 编译器宏：

- 语法

```vue
#子组件
<script setup>

#子组件暴露
defineExpose({
  属性1:值1,
  方法1() {}
})

</script>

#父组件
<template>
    <子组件 ref='子组件ref'></子组件>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const 子组件ref = ref(null)
#注意 在生命周期onMounted 才能接受子组件暴露的数据和方法
onMounted(() => {
    子组件ref.value.方法1();
    子组件ref.value.属性1
})

</script>
```

## 11 自定义hooks函数

- 使用Vue3的组合API封装的可复用的功能函数
- 用来取代vue2 mixin 目的也是抽离公共js逻辑
- 命名 userXxx开头的函数 一般会把一个功能封装在一个js中

### 例如 封装一个table宽度动态变化功能的hooks函数 

- hooks/useTableWidth.js

```js
/* table 宽度动态变化 */
import { onMounted, onUnmounted, ref } from 'vue'

/* 表单宽度设置 */
const useTableWidth = () => {
  //dom
  const tableRef = ref(null)

  const w = ref('')

  //计算宽度
  const calcTableWidth = () => {
    // 这个不能自动修改 有点怪
    // table.value.style.width = document.body.clientWidth - 280 + 'px'
    w.value = document.body.clientWidth - 280 + 'px'
  }

  //挂载后
  onMounted(() => {
    //初始化计算一次
    calcTableWidth()
    //窗口宽度变化计算一次
    window.addEventListener('resize', calcTableWidth)
  })

  //销毁后
  onUnmounted(() => {
    window.removeEventListener('resize', calcTableWidth)
  })

  return {
    tableRef,
    w,
  }
}

export default useTableWidth
```

- 使用

```vue
<template>
<!-- 表格 -->
<el-table ref="tableRef"  :style="{ width: w }" ></el-table>
</template>

<script setup>
    
import useTableWidth from '@/hooks/useTableWidth';
//计算table宽度

const { tableRef, w } = useTableWidth()
</script>

```

## 12 其他新组件

###  Fragment(片断)

- 在Vue2中: 组件必须有一个根标签
- 在Vue3中: 组件可以没有根标签, 内部会将多个标签包含在一个Fragment虚拟元素中
- 好处: 减少标签层级, 减小内存占用

```js
#其实 两个div被包在Fragment 虚拟元素中 感觉没有根元素
<template>
   <div></div>
   <div></div>
</template>
```

### Teleport(传送门)

- Teleport 提供了一种干净的方法, 让组件的html在父组件界面外的特定标签 
  - 例如：可以把一个组件里面的弹窗popUp 直接插进body标签里面 

```js
#相当于 body.appendChild(弹窗)
<teleport to="body">
   <div class="pop">
      弹窗
   </div>
</teleport>
```

