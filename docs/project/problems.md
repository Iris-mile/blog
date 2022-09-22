---
# sidebar: auto
title: 问题累计
---

## 打包后地址切换

- 原因：项目打包后地址不易更改，要更换项目配置地址再打包，多次重复打包操作

- 解决：vue项目下public/config.js，然后将文件引入到public/index.html

  ```md
  <!-- #config.js -->
      VUE_APP_BASE_API = 'http://10.166.46.125:8090/' // 智慧车站平台车站接口地址
      1、上诉方法将地址挂载了window上，通过window.获取
      2、若不想挂载window，可以const obj={xx:'hh'}通过obj获取

  <!-- #index.html -->
        <!-- built files will be auto injected -->
    <script type="text/javascript" src="/js/config.js"></script>

  <!-- #项目中配置使用： -->
      原有地址：process.env.VUE_APP_BASE_API
      更改为：window.VUE_APP_BASE_API || process.env.VUE_APP_BASE_API
      比如：request请求地方地址、websocket地址等等
      
  ```

