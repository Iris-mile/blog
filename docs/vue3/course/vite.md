# Vite 构建项目

Vite（法语意为 "快速的"，发音 `/vit/`发音同 "veet")是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://vitejs.cn/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://vitejs.cn/guide/features.html#hot-module-replacement)。
- 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。

Vite 意在提供开箱即用的配置，同时它的 [插件 API](https://vitejs.cn/guide/api-plugin.html) 和 [JavaScript API](https://vitejs.cn/guide/api-javascript.html) 带来了高度的可扩展性，并有完整的类型支持。

## 运作方式

Vite 以 [原生 ESM](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 方式提供源码。这实际上是让浏览器接管了打包程序的部分工作：Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码，即只在当前屏幕上实际使用时才会被处理。

- Vite 将会使用 [esbuild](https://esbuild.github.io/) [预构建依赖](https://vitejs.cn/guide/dep-pre-bundling.html)。Esbuild 使用 Go 编写，并且比以 JavaScript 编写的打包器预构建依赖快 10-100 倍。

![](https://vitejs.cn/assets/bundler.37740380.png)

![](https://vitejs.cn/assets/esm.3070012d.png)

## 安装 & 启动

![image-20220704092128035](imgs/image-20220704092128035.png)

- 注意：Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。

- 不使用模板 【推荐】

```js
#使用 NPM:  
npm init vite@latest
#yarn 【推荐】
yarn create vite
#pnpm
pnpm create vite
```

- 填写项目名
- 选择vue
- 选择vue
- 安装依赖包
- 启动项目

```js
 "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "preview": "vite preview"
  },
```

## vscode 插件推荐 Vue Language Features (Volar) 

- 禁用 vetur插件

## Vite.config.js配置

```js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
#path resolve方法获取本地绝对路径
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    #别名处理
    alias: {
      '@': resolve(__dirname, 'src'), //别名 @相当于src 文件夹目录
      //remove i18n waring
    },
    // why remove it , look for https://github.com/vitejs/vite/issues/6026
    // extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.vue', '.mjs']
  },
  //本地代理服务器 跨域处理
  server: {
    host: '0.0.0.0',
    open: true,
    proxy: {
      // 前缀写法
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
 //scss预处理
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: "@import '@/assets/scss/_index.scss';",
      },
    },
  },
})

```

## 安装sass 

```js
pnpm i sass -D
yarn add sass -D
```

