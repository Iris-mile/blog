---
# sidebar: auto
title: 图片处理
---

## 满屏背景
```css
  background-image: url("../../assets/imgs/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
```

## Public、assets下图片区别
vue-cli3 里面有两个可以存放图片的位置：public、assets，这两个的区别下面3点：
+ 两者存放什么图片，什么时候使用，在某种情况下应该使用哪种方式；
+ 使用方式；
+ 图片路径转换；

::: tip 静态资源可以通过两种方式进行处理：
在 JavaScript 被导入或在 template/CSS 中通过**相对路径**被引用。这类引用会被 webpack 处理。
放置在 public 目录下或通过**绝对路径**被引用。这类资源将会直接被拷贝，而不会经过 webpack处理。
:::

  1. 第一种方式：例如在某个 .vue 文件中通过 import "./" 的方法引入某个组件、js方法，或者像我之前在项目中写的 “./imgs/图片.png”，这就是采用相对路径引用资源的方法。
  2.  第二种方式：例如在 public/index.html 中 <link rel="icon" href="<%= BASE_URL %>favicon.ico"> 通过 <%= BASE_URL %> 引用 favicon.icon，这是绝对路径

### 一、相对路径，assets下，webpack打包图片
1. 导入图片，我们在模板中使用，需要通过 require 的这种方法去引入：
```js
<img :src="logo" />
export default {
  data(){
    return {
     //相对路径不一定都是./，也可能是../，按照图片存放位置来决定
      logo: require("./imgs/logo.png") 
    }
  }
}
```
2. 写背景图样式的时候，直接引入： 
```vue
<template>
  <div>
    <div class="login"></div>
  </div>
</template>
 
 <style scoped lang="scss">
  .login{background: url("./imgs/login.png") no-repeat center;}
  <style/>
```
3. 动态背景图： 
```vue
<template>
  <div>
    <div class="login" :style="{backgroundImg: url(loginImg)}"></div>
  </div>
</template>
 
<script>
  export default{
    data(){
      return {
        loginImg: require('./imgs/login.png')
      }
    }
  }
</script>
 
<style scoped lang="scss">
  .login{
    background-repeat: no-repeat; background-size:100%;
  }
</style>
```

### 二、Public下，绝对路径，webpack不打包
::: danger 注意
public 目录提供的是一个应急手段，当你通过绝对路径引用它时，留意应用将会部署到哪里。如果你的应用没有部署在域名的根部，那么你需要为你的 URL 配置 publicPath 前缀
:::

1. 部署到根路径下'/'
```html
<img :src="/my-image.png">
```
2. 项目部署到其他路径
在html文件中你需要通过 <%= BASE_URL %> 设置链接前缀：<link rel="icon" href="<%= BASE_URL %>favicon.ico">，在模板中：
```vue
<img :src="`${publicPath}my-image.png`">
data () {
  return {
    publicPath: process.env.BASE_URL
  }
}
```
::: tip 使用public
+ 你需要在构建输出中指定一个文件的名字。
+ 你有上千个图片，需要动态引用它们的路径。
+ 有些库可能和 webpack 不兼容，这时你除了将其用一个独立script的标签引入没有别的选择。
:::

### 三、总结
1. public**放不会变动**的文件（相当于vue-cli2.x中的static）
public/ 目录下的文件并不会被Webpack处理：它们会直接被复制到最终的打包目录（默认是dist/static）下。必须使用绝对路径引用这些文件，这个取决于你vue.config.js中 publicPath 的配置，默认的是/。

2. assets放**可能会变动的文件**
assets目录中的文件会被webpack处理解析为模块依赖，只支持相对路径形式。
简单来说就是就是public放别人家js文件（也就是不会变动），assets放自己写的js、css文件（需要改动的文件）