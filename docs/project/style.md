---
# sidebar: auto
title: css中的style
---
::: tip 格式
style="{样式名：”样式值“，}"
:::

## 行内样式style
;隔开style="color:#F00; font-weight:bold"
```html
<div style="color:#F00; font-weight:bold">模式</div>
<p style=" color:#090; font-size:16px">形式</p>
```

## 动态:style
 1. :style="{ width: w + 'px' }"
```js
 w: document.body.clientWidth - 300,
// 窗口大小变化函数
resize() {
 this.w = document.body.clientWidth - 300;
    },
```


2. :style="{display: item.isMenu ? '' : 'none'}"
```vue
<el-menu-item
    v-for="item in v.children"
    :index="item.path"
    :key="item.path"
    :style="{display: item.isMenu ? '' : 'none'}"
  >
```


3. 字符串拼接:style="{width: `${width}px`}"
```vue
<div class="box" :style="{width: `${width}px`, height: `${height}px`}">
```

4. 绑定计算属性：
```js
  <span class="cat-name" :style="comStyle">{{ catName }}</span>

   comStyle () {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    }          
```
5. 另外：
```js
<img :src="logoSrc" alt="" />
computed: {
    logoSrc () { return '/static/img/' + getThemeValue(this.theme).logoSrc}
    }
```