---
# sidebar: auto
title: css中的class
---

::: tip 格式
1. 主要是：class="{css选择器名：true/false，}"
2. 数组写法：class="['xx','mm']" 对象写法：class="{'xx'：true/false,'mm':true}"
:::


::: warning
+ 单个类名可以不用引号，如下
+ 绑定类名可嵌套，下面样式都生效
:::
1. :class="{warning: v.isMenu}"
```js
  <el-submenu
    v-else
    :index="v.path"
    :key="v.path"
    :class="{warning: v.isMenu}"
      >

        .warning {
            color: #DC143C;
            .equip-icons {
              border-color: #DC143C;
              .icon {
                color: #DC143C;
              }
            }
          }   
```

2. 多个类名，如控制密码显示隐藏:class="{'icon-eye-close': passwordInputType === 'password','icon-eye-open': passwordInputType === 'text' }"
```js
 <i
    @click="changeType"
    slot="suffix"
    class="iconfont"
    :class="{
      'icon-eye-close': passwordInputType === 'password',
      'icon-eye-open': passwordInputType === 'text',
    }"
></i>

passwordInputType: "password",  // 切换密码框类型

methods:
    changeType() {
      if (this.passwordInputType === "password") {
        this.passwordInputType = "text";
      } else {
        this.passwordInputType = "password";
      }
    },

```

3.多元判断:class="item < 0.3? uncrowdedColor1 : item > 0.3 && item < 0.5? normalColor1: crowdedColor1"
```js
//1）html
 <li
        v-for="(item, index) in rate"
        :key="index"
        :class="
          item < 0.3
            ? uncrowdedColor1
            : item > 0.3 && item < 0.5
            ? normalColor1
            : crowdedColor1
        ">

          // 2）data:
              uncrowdedColor1: { c1: true, c2: false, c3: false },
              normalColor1: { c1: false, c2: true, c3: false },
              crowdedColor1: { c1: false, c2: false, c3: true },

    //3)css:   
  .c1 {color: #39b54a !important;}
  .c2 {color: #d6f36a !important;}
  .c3 { color: #d6295f !important;}
```
4. 绑定方法：:class="loadColorClass(item)"绑定方法
```js
<svg-icon 
        v-for="(item, index) in weightRate.up"
        :key="index + item"
        class="people"
        :class="loadColorClass(item)"
        icon-class="stand"
            />
                  
           //方法methods：
          loadColorClass(rate) {
          if (rate < 0.3) return { uncrowded: true };
          if (rate < 0.5) return { normal: true };
          return { crowded: true };
        }
```
5. 非对象写法
```css
:class="itemActive === 0?'active':''"
```

6. 数组写法：class="['xx','mm']" 
```css
:class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"
```