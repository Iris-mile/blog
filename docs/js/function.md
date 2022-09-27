---
title: 函数多种写法
# sidebar: auto
---
## 函数的定义
函数可以氛围声明函数和匿名函数
```
a. 函数声明
            function 函数名(){
                函数体;
            }

        b. 匿名函数（函数表达式）
            var 变量名=function(){
                函数体;
            };
```

数组中的函数：
```
arr.forEach(function(value, index){
            index   下标
            value   元素值
        });
```
## 事件注册方式
```
 a. 在标签上注册事件
            <button onclick="事件处理函数()"></button>

        b. DOM对象注册事件
            btn.onclick=function(){
                ...
            }

        c. W3C标准方法注册事件
            btn.addEventListener('click', function(){
                ...
            });
```

## JQ文档加载
```
  //原生的窗口加载事件，窗口所有资源加载完才执行
        window.onload=function(){
            ...
        }

        //jQuery的文档加载事件，HTML文档加载完成就执行
        $(function(){
           
           ...
        });

    2) 绑定事件
        //绑定事件
        $('事件源').on('事件类型', function(){
            ...
        });
```

## 箭头函数
+ 省略function,在()和{}之间添加=>
+ 如果函数体只有一行代码,{}和return省略
+ 如果形参只有一个,（）省略

```
function 函数名(){
                函数体;
            }

            更替：()=>{}
```

## 对象中方法函数
```js
// ES5
let name = '小貂蝉'
let o = {
    name: name,
    show: function () {
        return '蒂花之秀'
    }
}

// ES6
let name = '小貂蝉'
let o = {
    name, // key和value相同 （略）
    show () {   // 略 ：function
        return '蒂花之秀'
    }
}
```