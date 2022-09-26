---
title: Vue3 学习笔记
sidebar: auto
---
## 提要
 + 插件：volar(vscode海贼王插件 官方推荐)
 + 安装项目：Yarn 的安装 yarn create vite   
 + 模板组件指令：v3p

::: tip
更改package.json中script的启动指令  "dev": "vite --host",以此可以通过本机服务器iP打开访问
:::
## 创建路由
先在项目安装 yarn，Yarn add vue-router   新建一个views router文件夹 router/index.js  
1. router/index.js 文件
```js
// / 1)路由配置文件
import { createRouter, createWebHashHistory } from "vue-router"

// 2)配置路由数组
const routes = [
    {
        path: "/setup",
        component: () => import("@/views/setup/Index.vue")
    }
]

// 3)创建路由实例
let routers = createRouter({
    history: createWebHashHistory(),  // 历史模式
    routes
})

// 4)暴露创建的路由实例
export default routers
```
2. 在main.js中 引入路由对象,并注入到app中
```js
//  引入路由对象
import routers from "@/router"
let app = createApp(App);
// 注入路由
app.use(routers)
app.mount('#app')
```
3. 在App.vue顶层组件中,添加一个路由出口**router-link**标签

## css预处理器
  
 #### 一、直接引入css
 在main.js的入口文件引入css如下，方法2见vite.config配置的css预处理器
 ```js
 import '@/assets/css/reset.css'
 ```
  #### 二、css预处理器
vite.config配置的css预处理器，使用scss前先Yarn add sass安装sass模块
 ```js
css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import 'src/assets/css/reset.css';",
      },
    },
  },
 ```
 ## ref 
 1. ref可以定义基本类型数据，实现数据响应。但是要修改基本类型数据的值，必须通过**点value形式赋值**
 2. ref还可以获取dom节点，但是注意ref初始必须为**ref(null)**,且接收变量名必须和**html里面的ref名一致**才能获取
 ```js
 <template>
    <h3 ref="divRef">ref</h3>
    <p ref="domRef">dom节点</p>
    <div>{{username}}</div>
    <button @click="changeName">修改值</button>
</template>

<script setup>
    import {ref} from 'vue'
    let username=ref('测试ref')//基本数据定义ref

    /* 函数定义 */
    let changeName=()=> { 
      username.value='新的数据'//修改值.value
    }


    /* 通过ref获取dom节点 ,接收变量名与ref的id名一致*/
    let divRef=ref(null)
    console.log('divRef',divRef);

    let domRef=ref(null)
    console.log('domRef',domRef);
</script>
 ```

 ## reactive
 用于定义对象数据类型，做为响应式数据并且深入响应。**v3引用类型数据不能直接赋值,响应链条被影响**
 ```js
 <template>
  <h3>reactive页面</h3>
  <p>这个用户的名字：{{user.name}} <button @click="fn">修改对象</button></p>
  <p>这个用户的名字年龄：{{user.age}}</p>
  
  <button @click="fn1">修改数组</button> 
  <p>数组：{{arr}}</p>
</template>

<script setup>
      import {reactive} from 'vue'
      let user=reactive({
        name:'Iris',
        age:'18'
      })//引用数据定义ref
      console.log(user);

      let arr=reactive([])
      /* ！！！！！！！！！！只有基本类型的赋值需要.value */


      //可以监听对象属性的变化反映在视图
      let fn=() => { 
        user.name='Iris-mile'

        //!!!!!!!!!!!!!!!v3引用类型数据不能直接赋值,响应链条被影响
      //   user={
      //   name:'王五',
      //   age:'23'
      // }
      // console.log(user);
      }

      //可以监听数组的变化反映在视图
      let fn1=() => { 
        arr.length=3
      }
</script>
 ```

 ## toRef
 用于把引用类型的某一个数据单独提出，格式为 /*2参数，数据对象，属性名 */
 ```js
 <template>
  <h3>toRef:把引用类型的某一个数据单独提出</h3>
  <div>{{user.name}} </div>
  <div>{{name}} </div>
</template>

<script setup>
      import {reactive,toRef} from 'vue'
      let user=reactive({
        name:'Iris',
        age:'18',
      })

      /*2参数，数据对象，属性名 */
      let name=toRef(user,'name')
      console.log(name);
</script>
 ```

 
 ## toRefs
 toRefs:把引用类型的多个数据单独提出,类似es6的解构
 ```js
      <template>
        <h3>toRefs:把引用类型的多个数据单独提出</h3>
        <div>{{name}} </div>
        <div>{{age}} </div>
      </template>

      <script setup>
      import {reactive,toRefs} from 'vue'
      let user=reactive({
        name:'Iris',
        age:'18',
      })

      /*数据对象，解构多个对象属性 */
      /*!!!!!!!!不可用ES6解构会影响数据链条 */
      let {name,age}=toRefs(user)
</script>
 ```

 ## 计算属性computed
 有两种方法，通用方法1直接计算结果。但也有set和get函数去修改计算属性的值
 ```js
 <template>
  <div>
   {{str}}
   <h3>计算结果：{{comStr}}</h3>
  </div>
</template>

<script setup>
      import {ref,computed} from 'vue'
      let str=ref('abcdefg')
      //通过计算属性把所有小写改为大写>>>计算属性成为方法
      // let comStr=computed(() =>str.value.toUpperCase())

      //方式2：set和get
      let comStr=computed({ 
      get(){
        console.log('调用了');
        return str.value.toUpperCase()//调用comStr就会触发get这个方法，<h3>{{comStr}}</h3>
      },
      set(val){
        //修改comStr触发set, comStr='xiugaizhi'
        str.value=val
        console.log(val,'修改了');
      }
      });
      comStr.value='xiugaizhi'

      </script>
 ```

 ## watch监听
 ```js
 <template>
  <div>
    watch监听器
    <div>
      <input type="text" v-model="str"/>{{str}}
    </div>
    <p>
      <span>{{user}}</span>
      <button @click="user.name='七天'">修改user用户</button>
    </p>
    <p>
      <span>{{user}}</span>
      <button @click="user.sex.no='女'">watch深度监听</button>
    </p>
  </div>
</template>

<script setup>
      import {ref,reactive,watch,watchEffect} from 'vue'
      let str=ref('绿野')
      let user=reactive({
        name:'Iris',
        age:12,
        sex:{
          no:"男"
        }
      });


      //1、基本类型监听
      watch(str,(newValue, oldValue) => {
        console.log(newValue,'新的值');
        console.log(oldValue,'旧的值');
      })

      //2、引用监听watch可以监听到对象属性的变化
      watch(user,(newValue, oldValue) => {
        console.log(newValue,'新的值');
        console.log(oldValue,'旧的值');
      },
      {
        immediate:true, //立即执行
        deep:true //默认就是深度监听
      }
      )

      //3、注重监听过程
      watchEffect(() => {
        console.log(str.value)
      })
      </script>
 ```
## 生命周期
::: tip
因为 `setup` 是围绕 `beforeCreate` 和 `created` 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 `setup` 函数中编写。
:::
```js
<script setup>
import { ref ,onMounted,onUnmounted } from "vue";
let domRef=ref(null)
onMounted(() => {
  console.log(domRef,'创建后')
})
console.log(domRef);//先打印这个，其后打印上面。因为setup本身围绕oncreated生命周期


onUnmounted(() => {
  clearInterval(timer)
  console.log(domRef,'销毁后')
})
let timer=setInterval(() => {
  console.log('定时器计时');
}, 1000);

</script>
```

## 父子传参
 ### 父传子
   通过属性名动态传参或者传固定值，与vue2类似
 ```js
 <Children msg='父组件数据' :user='user' v-model:count.sync='count'  @sendMsg='getMsg'/>
 ```
  子组件通过defineProps方法，可有变量接收使用也可以不用，建议有
  ```js
  let propsObj=defineProps({
  msg:{
    type:String,
    default:"默认信息"
  },
  count:{
    type:Number,
    default:3
  },
  user:{
    type:Object,
    default:()=>({})
  }
})

// 使用
 <p>{{propsObj.msg}}</p>
  ```
 ### 子传父
   通过defineEmits方法
 ```js
 //1.通过方法修改父组件数据
// let $emit=defineEmits(['sendMsg'])
// let changeFather=() => { 
//   $emit('sendMsg','子组件来修改啦')
//  }

 //2.子组件直接修改父组件,配合父组件v-model:count.sync='count'
 let $emit=defineEmits(['update:count'])
let changeFather=() => { 
  $emit('update:count',propsObj.count+1)
 }
 
 //子组件
 <button @click="changeFather">修改父组件数据</button>

 //父组件
  <Children msg='父组件数据' :user='user' v-model:count.sync='count'  @sendMsg='getMsg'/>
 ```

## 子组件暴露数据方法defineExpose

```js
// 子组件
<script setup>
import { ref } from 'vue';
let a=10
defineExpose({ 
a,
sayHi:()=>{ 
  console.log('大子组件方法暴露了奥');
 }
 })
</script>


// 父组件
<BigSon ref="bigSon"/>

 let bigSon=ref(null)
//  注意！！！！ 在生命周期onMounted 才能接受子组件暴露的数据和方法
//  注意！！！！ 通过.value的形式获取
onMounted(() => {
bigSon.value.sayHi()
})

```
## 自定义Hooks函数
  与vue2的mixins功能类似
  ```js
  import { ref,onUnmounted,onMounted } from 'vue';

export default function(){
  let w=ref(600)

  let getWidth=function(){
    let width=document.body.clientWidth
    w.value=width-200
  }
  getWidth()//初始化计算宽度

  window.addEventListener('resize',getWidth)//窗口尺寸发生变化监听
  onUnmounted(() => {
  window.removeEventListener('resize',getWidth)//组件销毁时清除监听
  })

  return {
    w
  }
}
  ```
  ```js
  <template>
  <div>
      <div :style="{width:`${w}px`}" class="hooks">
        hook函数封装
      </div>
  </div>
</template>

<script setup>
import widthHooks from './widthHooks';
const {w}=widthHooks()
</script>
  ```