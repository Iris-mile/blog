---
# sidebar: auto
title: css
---

## 符号&

```md
 .box{
            &:before{
                border-color: red;
            }
        }
    & 表示在嵌套层次中回溯一层，即&:before相当于.box:before
    
<div class="a b"></div>编译结果：.a.b
                a{
                    &b{}
                }
    <div class="a">编译结果：.a   .b
        <div class="b"></div>
    </div>
                a{
                    b{}
                }
```

## 符号+
+表示选择元素后面紧紧相邻的一个兄弟（间隔不可）
```html
/* 如 ：h1 + p {color: red;}
区别 h1 ~ p {color: red;}表示h1后所有兄弟p不管是否间隔 */
    <h1>测试一下选择器</h1>
    <p>呵呵哈哈哈</p>
    <p>呵呵哈哈哈</p>
```
另类相同元素：li+li表示除去第一个后面li都起效应
 ```js
               如：li + li { color: green;}
                  <li>s是吗</li>
                  <li>s是吗</li>
                  <li>s是吗</li>
```