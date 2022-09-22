---
# sidebar: auto
title: 主题切换theme
---

+ 1.定义主题js文件,对象动态键名获得值theme[themeName]，暴露主题名方法出去
```js
const theme = {
  chalk: {
    // 背景颜色
    backgroundColor: '#161522',
    // 标题的文字颜色
    titleColor: '#ffffff',
    // 左上角logo的图标路径
    logoSrc: 'logo_dark.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_dark.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_dark.png'

  },
  vintage: {
    // 背景颜色
    backgroundColor: '#eeeeee',
    // 标题的文字颜色
    titleColor: '#000000',
    // 左上角logo的图标路径
    logoSrc: 'logo_light2.png',
    // 切换主题按钮的图片路径
    themeSrc: 'qiehuan_light.png',
    // 页面顶部的边框图片
    headerBorderSrc: 'header_border_light.png'
  }
}

export function getThemeValue (themeName) {
  return theme[themeName]
}
```
::: tip 动态属性
+ theme['chalk']
+ 或者let ar='chalk'  theme[ar]动态放入键名变量
:::
+ 2、主题名存入状态机，改变和存取
```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'chalk'
  },
  mutations: {
    changeTheme (state) {
      if (state.theme === 'chalk') {
        state.theme = 'vintage'
      } else {
        state.theme = 'chalk'
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
```
+ 3.对应界面改变状态机值
```js
handleChangeTheme () {
      // 修改VueX中数据
     this.$store.commit('changeTheme')
    },
```

+ 4.界面使用:计算属性更换样式》》拿到状态机them值》》》再拿js文件里主题配置them下的具体每个值
```js

//1.获取
import { mapState } from 'vuex'
computed: {
    ...mapState(['theme'])
  },

      //2计算样式
      containerStyle () {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    },

    //3绑定
  <div class="screen-container" :style="containerStyle">
```