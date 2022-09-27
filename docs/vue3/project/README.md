---
title: svg使用和组件封装
sidebar: auto
---
## 介绍
  无论是iconfont还是svg使用，以往都是整体添加图标放入项目文件使用。但是临时添加，就得重新下载更换文件，对于团队协作开发来说无疑是一种困扰。所以在项目实践中总结了如何随时使用svg图和更改其相关属性颜色等。小篇主要介绍对其的封装和使用。
## 插件
 + 插件地址：[vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/main/README.zh_CN.md)
+ 安装：yarn add vite-plugin-svg-icons -D
::: tip
使用过程中报错fast-glob不存在时，还需安装fast-glob
:::
+ 具体配置：vite.config.ts 中的配置插件。其余使用方法细节详见官网
```js
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

export default () => {
  return {
    plugins: [
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  }
}
```
+ 注册脚本：在 src/main.ts 内引入注册脚本
```js
import 'virtual:svg-icons-register'
```

## svg原本使用
```vue
<svg class="svg-icon" aria-hidden="true">
    <use xlink:href="#icon-home" />
  </svg>
```

## svg组件封装
+ 动态封装类名class，通过使用组件的父组件传入类名，动态绑定class类名，对应css中的样式。比如修改svg的大小height,width
+ 传入哪个svg名，对应svg文件名。比如home.svg就需要传入home绑定在xlink:href属性上。
下面封装class和svg名通过计算属性做了处理渲染
::: tip
如果需要修改svg颜色，就必须注意写上下面封装的svg-icon里面的fill: currentColor样式
:::
```vue
<template>
  <svg :class="classNAme" aria-hidden="true">
    <use :xlink:href="IdName" />
  </svg>
</template>

<script setup>
  import {computed} from 'vue'
let props=defineProps({
  cName:{
    type:String,
    default:''
  },
  sName:{
    type:String,
    default:'home'
  }
})
const IdName = computed(() => `#icon-${props.sName}`)
const classNAme = computed(() => {
  if(props.cName){
    return `svg-icon ${props.cName}`
  }
  return 'svg-icon'
})
</script>

<style scope lang="scss">
.sm{
    width: 20px;
    height: 20px;
}
.md{
    width: 24px;
    height: 24px;
}
.lg{
    width: 30px;
    height: 30px;
}
.svg-icon {
  width: 1em;
  height: 1em;
  position: relative;
  fill: currentColor;
  vertical-align: -2px;
} 
</style>
```

## 全局注册组件使用
在main.js里面全局注册：
```js
import SvgIcon from '@/components/SvgIcon.vue'// 全局组件注册先引入
const app = createApp(App)
app.component('SvgIcon',SvgIcon)//组件注册传（'名'，加载组件名）
```

## 组件使用详例
```js
<SvgIcon cName="lg"  sName="home" class="svg-home"/>

.svg-home {
  color: red;
}
```

## iconfont
iconfont官网：[iconfont](https://www.iconfont.cn/)

在网站找到对应图表，选择复制svg代码到例子home.svg文件里面。就可以实现svg图片的临时添加和使用了。