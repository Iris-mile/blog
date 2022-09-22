---
# sidebar: auto
title: 数据请求
---



## Content-type请求头
::: tip 提示：
下面展示的都是请求方式为post下，各种请求头下的请求处理方式
axios默认Content-type 为 ’application/json;charset=utf-8’
:::
### 1. application/x-www-form-urlencoded;charset=utf-8

 请求体中的数据以表单形式（键值对）发送给后端,可以使用qs库编码数据,引入 qs ，这个库是 axios 里面包含的，不需要再下载了。
```js
import qs from 'qs';
const data = { 'bar': 123 };
const options = {
  method: 'POST',
  headers: { 'content-type': 'application/x-www-form-urlencoded' },
  data: qs.stringify(data),
  url,
};
```

### 2. Content-Type:application/json

告诉服务端消息是序列化之后的JSON字符串，axios默认的就是'application/json'
```js
let params = {title:'aa',content:'ssssssss'}
axios({
    method:'post',
    url:'/api/url',
    data:JSON.stringify(params)
    })
 最终发送的是：'{"title":"aa","content":"ssssssss"}'
```

### 3. Content-Type:multipart/form-data

般文件上传都是通过该数据格式提交的，例如图片上传
```js
import axios from 'axios'
let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');
axios({
    url:`${this.$url}/test/testRequest`,
    method:'post',
    data，
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then(res=>{
        console.log('res=>',res);            
    })
```


## 请求数据格式
数据请求格式有三种方式，分别为Query String Parameters、Form Data、 Request Payload 三种格式。
因为**Content-Type 与请求方式 method 不同** ，导致传递的数据格式不同。
### 1. Query String Parameters 格式： ?key=value&key=value

  ?后的字符串则为其请求参数，并以&作为分隔符。常用在 GET 请求方式时使用。 其他请求方式也可以使用，拼接在接口地址 url? 后面。

### 2. Form Data 格式：key=value&key=value

 当 Content-type 为 application/x-www-form-urlencoded;charset=utf-8 时，参数会以 Form Data 的形式(数据为 String 键值对格式)传递给接口，并且不会显示在接口 url 上。

### 3. Request Payload 格式：{key: value, key: value}

当 Content-type 为 application/json;charset=utf-8 时，参数会以 Request Payload 的形式(数据为 json 格式)传递给接口，并且不会显示在接口 url 上。




## 实例处理
### 一、get请求方式
请求头一般Content-type 为 application/x-www-form-urlencoded;charset=utf-8 时请求格式为：**Query String Parameters**。在地址栏后?key=value&key=value呈现
1. params参数
```js
export function getEventDetail(params) {
  return request({
    url: '/sts/equipment/v1/event/e_ec_details',
    method: 'get',
    params
  })
}
```
2. get的path类型
```js
export function deleteEvent(query) {
  return request({
    url:`/sts/equipment/v1/emergency/delete_event/${query}`,
    method: 'get'
  })
}
```
::: warning
请求内容最后在地址栏后?key=value&key=value呈现
:::

### 二、post请求方式
1. axios默认Content-type 为 application/json;charset=utf-8,data参数。请求格式为：**request payload**
```js
export function ptzControl(data) {
  return request({
    url: '/sts/equipment/v1/cctv/ptz_control',
    method: 'post',
    data
  })
}
```
2. post传**单个字符串**：更改请求头
```js
export function roleDelete(data) {
  return request({
    url: '/sts/uaa/v1/role/delete',
    method: 'post',
    headers: {
      'Content-Type': 'text/plain; charset=utf-8'
    },
    data
  })
}
```
3. 请求头Content-type 为 application/x-www-form-urlencoded;charset=utf-8.请求格式为：**Form Data**
```js
import qs from 'qs'
export function roleMultipleDelete(data) {
  return request({
    url: '/sts/uaa/v1/role/delete_Ids',
    method: 'post',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    data: qs.stringify(data)
  })
}
```

4. 请求头Content-type 为 multipart/form-data;charset=utf-8.请求格式为：**Form Data**.文件上传使用
```js
let data = new FormData();
data.append('code','1234');
data.append('name','yyyy');
axios({
    url:`${this.$url}/test/testRequest`,
    method:'post',
    data，
    headers: {
    'Content-Type': 'multipart/form-data'
    }})
    .then(res=>{
        console.log('res=>',res);            
    })
```

5. promise.all请求
```js
  //promise.all（['xx','hh'])
async getEnvironmentInfo({ commit }, payload) {
    const types = Object.keys(ENVIRONMENT_TYPE)
    const arr = await Promise.all(types.map(type => getEnvironmentIndicator(type, payload)))
    let indicators = {}
    types.forEach(type => {
      const { data } = arr.find(v => v.data[ENVIRONMENT_TYPE[type]] !== undefined)
      if (data) {
        indicators = { ...indicators, ...data }//合并对象{...a,...b}
      }
    })
    commit('SET_ENVIRONMENT_INFO', indicators)
      }
```


