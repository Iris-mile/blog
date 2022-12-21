---
title: websocket
---
## websocket简介
### 介绍
  + 在网络中的两个应用程序（进程）需要**全双工相互通信**（全双工即双方可同时向对方发送消息），需要用到的就是socket，它能够提供端对端通信。
  + websocket是html5规范中的一个部分，通常它表示为：ws://echo.websocket.org/?encoding=text HTTP/1.1
  + 返回的**状态码为101**表示建立连接，握手成功并且基于http协议。websocket提供两种数据传输：文本数据和二进制数据。
  + 不同与之前web开发的请求处理响应模式，它提供了一种真正意义上的客户端请求，服务器推送数据的模式，特别适合**实时数据交互应用开发**

### 简单使用
 + 初始化建立连接
   let ws=**new WebSocket('ws地址')**
 + WebSocket事件

   1. **连接成功建立的回调方法**

        ws.onopen = function () {
            alert("WebSocket连接成功");
        }

    2. **接收到消息的回调方法，websocket的controller里的onMessage方法session_to传过来的值**

        ws.onmessage = function (event) {
            alert(event.data);
        }

    3. **连接关闭的回调方法**

        ws.onclose = function () {
            alert("WebSocket连接关闭");
        }

    4.  **连接发生错误的回调方法**

        ws.onerror = function () {
            alert("WebSocket连接发生错误");
        };
  + websocket方法
   1. 发送消息：ws.send()
   2. 关闭连接： ws.close()
## websocket在mixins中使用
  ### 使用场景：
  项目中有多个websocket地址，需要new不同个ws连接。因此可以简单利用mixins，在需要的地方组件引入使用
  ### mixins文件
  将websocket的初始化，销毁以及接收相关重复内容写入mixins
  ``` js
      export default {
        data() {
          return {
            websocket: null,
            count: 0
          }
        },
        created() {
          this.initWebSocket()
        },
        destroyed() {
          this.websocket && this.websocket.close()
          this.websocket = null
        },
        methods: {
          initWebSocket() {

            if (typeof WebSocket === 'undefined') {
              alert('您的浏览器不支持WebSocket')
              return false
            }

            const { protocol } = window.location
            const prefix = protocol === 'https:' ? 'wss:' : 'ws:'
            const { hostname } = new URL(window.VUE_APP_BASE_API || process.env.VUE_APP_BASE_API)
            const suffixName = 'xx'
            const { port, name } = this.wsInitialParams
            const wsUri = `${prefix}//${hostname}:${port}/${name}/${suffixName}`

            this.websocket = new WebSocket(wsUri)
            this.websocket.onopen = this.websocketOnopen
            this.websocket.onmessage = this.websocketOnmessage
            this.websocket.onerror = this.websocketOnerror
            this.websocket.onclose = this.websocketOnclose
          },
          // 连接成功
          websocketOnopen() {
            // console.log('WebSocket连接成功')
          },
          // 连接建立失败重连
          websocketOnerror(e) {
            // console.log(`连接失败的信息：`, e)
            if (this.count < 3) {
              this.initWebSocket() // 连接失败后尝试重新连接
              this.count++
            }
          },
          // 关闭连接
          websocketOnclose(e) {
            // console.log('断开连接',e)
          }
        }
      }
  ```
 ### 组件内部
 将websocket相关的mixins引入，并且在data里面准备好mixins需要的socket地址相关内容。组件里面可以单独处理接收这个websocket消息内容，接收方法对应mixins里面websocketOnmessage方法
 ```js
   mixins: [socket],

   data(){
    return{
       wsInitialParams: { port: 9098, name: 'xx' },
    }
   }

   method(){
     // 接收后端返回的数据
    websocketOnmessage(e) {
      const res = JSON.parse(e.data)
      //处理页面需要数据逻辑
    }
   }
 ```
 ### 注意点
   需要注意的是，有可能一个组件里面需要两个不同的socket，这个时候就不能只用一个mixins，这时候会造成不对应接收混乱最后只有一个socket。这会就需要new两个mixins文件。
## websocket在ES6类中实现使用
 ### 场景
   这种多用于只有一个socket，前后端定义好需要接收和发送的数据类型（如果没有约定，可以自行删除相关无用代码直接接收消息处理数据），并且做了相关断链优化处理。下面做了些小改动，应该同样适用于多个socket,new不同个socket实例化对象。
 ### js文件
 ```js
 class SocketService {
  // static instance = null
  // // 初始化创建对象，通过SocketService.Instance
  // static get Instance() {
  //   if (this.instance === null) {
  //     this.instance = new SocketService()
  //   }
  //   return this.instance
  // }
constructor(url){
  this.url=url
}

  ws
  callBackFunction = {} //注册函数对象
  isConnect = false //是否链接
  reconnectCount = 0 //重连次数
  sendCount = 0 //重连次数

  //创建链接方法
  connect() {
    if (!window.WebSocket) {
      alert('你的浏览器不支持WebSocket')
      return
    }
    this.ws = new WebSocket(this.url)

    //链接成功回调
    this.ws.onopen = () => {
      this.isConnect = true
      this.reconnectCount = 0
    }

    //链接关闭回调:连接服务端失败,or连接成功之后服务器关闭的情况
    this.ws.onclose = () => {

      this.isConnect = false
      if (this.reconnectCount > 10) {
        return
      }

      setTimeout(() => {
        this.reconnectCount++
        this.connect()
      }, this.reconnectCount * 1000)//优化：间隔一定时间链接，不要一失败就重连
    }

    //接收消息回调
    this.ws.onmessage = (evt) => {
      let revData = JSON.parse(evt.data)
      let socketType = revData.socketType

      //接收到消息调用相关组件内处理函数
      if (this.callBackFunction[socketType]) {
        this.callBackFunction[socketType].call(this, revData)
      }
    }
    //链接失败的回调
    this.ws.onerror = (e) => {
      console.log(e)
    }
  }
  //注册函数
  resignCallbackFunction(name, func) {
    this.callBackFunction[name] = func
  }

  //注销函数
  unRegisterCallBack(name) {
    this.callBackFunction[name] = null
  }

  //发送消息
  send(data) {
    if (this.isConnect) {
      this.sendCount=0//发送成功
      this.ws.send(JSON.stringify(data))
    } else {//链接失败的情况再次定时重发
      setTimeout(() => {
        this.sendCount++
        this.send()
      }, this.sendCount * 1000)
    }
  }
}
let ws1=new SocketService(ws1地址)
// let ws2=new SocketService(ws2地址)
export default ws1
 ```

### 使用在全局引入main.js
```js
import ws1 from '@/utils/socket'
// 对服务端进行websocket的连接
ws1.Instance.connect()
// console.log(SocketService.Instance.connect);

// 其他的组件  this.$socket
Vue.prototype.$socket = ws1.Instance
```

### 组件内接收约定的相关数据

```js
<script>
  export default {
    methods: {
      getData(ret) {
        this.allData=ret
      }
    },
    mounted () {
      //进入组件注册当接收到消息需要调用的处理函数方法到实例化对象上
      this.$socket.resignCallbackFunction('mapData',this.getData)

      //给socket发送你需要的数据内容
      this.$socket.send({
      action: 'getData',
      socketType: 'mapData',
      chartName: 'map',
      value: ''
    })

    },

    beforeDestroy(){
      this.$socket.unRegisterCallBack('mapData')//销毁组件时注销实例化对象上的方法
    }
  }
</script>
```
## js形式封装websocket
  + 在项目中定义一个socket.js文件，在需要建立socket的页面引入此js文件
  + 设置了心跳包防止链接中断
  ```js
        import Vue from 'vue'
        import { Message } from 'element-ui'
        let v = new Vue()
        v.$message = Message;
        var webSocket = null;
        var isConnect = false; //连接状态
        var globalCallback //定义外部接收数据的回调函数
        var reConnectNum = 0;//重连次数

        //var websocketUrl =  process.env.VUE_APP_API_WEBSOCKET_URL;


      //______________________________________________________________________________________________________________________
        //心跳设置
        var heartCheck = {
            heartbeatData:'心跳内容',//心跳包
            timeout: 60 * 1000, //每段时间发送一次心跳包 这里设置为60s
            heartbeatTimer: null, //延时发送消息对象（启动心跳新建这个对象，收到消息后重置对象）
            start: function () {
                this.heartbeatTimer = setInterval(()=>{
                    if (isConnect){
                        webSocketSend(this.heartbeatData);
                    }else{
                        this.clear();
                    }
                }, this.timeout);
            },
            reset: function () {
                clearInterval(this.heartbeatTimer);
                this.start();
            },
            clear:function(){
                clearInterval(this.heartbeatTimer);
            }
        }

      //______________________________________________________________________________________________________________________
        //初始化websocket
        function initWebSocket(websocketUrl,callback) {
            //此callback为在其他地方调用时定义的接收socket数据的函数
            if(callback){
                if(typeof callback == 'function'){
                    globalCallback = callback //！！！！！！！！！！1·初始化的时候将处理数据函数放在这里    
                }else{
                    throw new Error("callback is not a function")
                }
            }
            if ("WebSocket" in window) {
                webSocket = new WebSocket(websocketUrl);//创建socket对象
            } else {
                Message({
                    message: '该浏览器不支持websocket!',
                    type: 'warning'
                });
                return
            }
            //打开
            webSocket.onopen = function() {
                webSocketOpen();
            };
            //收信
            webSocket.onmessage = function(e) {
                webSocketOnMessage(e);// ！！！！！！！！！！3`链接成功调用
            };
            //关闭
            webSocket.onclose = function(e) {
                webSocketOnClose(e);
            };
            //连接发生错误的回调方法
            webSocket.onerror = function(e) {
                webSocketonError(e);
            };
        }


          //______________________________________________________________________________________________________________________
        //连接socket建立时触发
        function webSocketOpen() {
            console.log("WebSocket连接成功");
            //首次握手
            webSocketSend(heartCheck.heartbeatData);
            isConnect = true;
            heartCheck.start();//建立连接后就启用心跳包，定时向服务端发送心跳保证链接
            reConnectNum = 0;
        }

        //客户端接收服务端数据时触发,e为接受的数据对象
        function webSocketOnMessage(e) {
            console.log("websocket信息:");
            console.log(e.data)
            const data = JSON.parse(e.data);//根据自己的需要对接收到的数据进行格式化

            globalCallback(data);//将data传给在外定义的接收数据的函数，至关重要。2·！！！！！！！建立连接就处理相关数据的函数
        }

        //socket关闭时触发
        function webSocketOnClose(e){
            heartCheck.clear();
            isConnect = false; //断开后修改标识
            console.log(e)
            console.log('webSocket已经关闭 (code：' + e.code + ')')

            //被动断开，重新连接
            if(e.code == 1006){
                if(reConnectNum < 3){
                    initWebSocket();
                    ++reConnectNum;
                }else{
                    v.$message({
                        message: 'websocket连接不上，请刷新页面或联系开发人员!',
                        type: 'warning'
                    });
                }
            }
        }

        //连接发生错误的回调方法
        function webSocketonError(e){
            heartCheck.clear();
            isConnect = false; //断开后修改标识
            console.log("WebSocket连接发生错误:");
            console.log(e);
        }

        //发送数据
        function webSocketSend(data) {
            webSocket.send(JSON.stringify(data));//在这里根据自己的需要转换数据格式
        }


      //____________________________________________________________________________________________________________________________

        //组件内需要socket地方主动关闭socket
        function closeWebSocket(e) {
            webSocket.close();
            heartCheck.clear();
            isConnect = false;
            reConnectNum = 0;
        }

        //组件内需要socket地方调用的函数，用来发送数据及接受数据
        function sendSock(agentData) {
            //下面的判断主要是考虑到socket连接可能中断或者其他的因素，可以重新发送此条消息。
            switch (webSocket.readyState) {
                //CONNECTING：值为0，表示正在连接。
                case webSocket.CONNECTING:
                    setTimeout(function() {
                        sendSock(agentData, callback);
                    }, 1000);
                break;
                //OPEN：值为1，表示连接成功，可以通信了。
                case webSocket.OPEN:
                    webSocketSend(agentData);
                break;
                //CLOSING：值为2，表示连接正在关闭。
                case webSocket.CLOSING:
                    setTimeout(function() {
                        sendSock(agentData, callback);
                    }, 1000);
                break;
                //CLOSED：值为3，表示连接已经关闭，或者打开连接失败。
                case webSocket.CLOSED:
                // do something
                break;
                default:
                // this never happens
                break;
            }
        }

        export default {
          initWebSocket,
          closeWebSocket,
          sendSock,
        };
  ```


   ### 组件内
   ```js
   import socketApi1 from "./utils/socket";//找到封装的socket.js文件
   export default {
        mounted(){
          // 建立socket连接， 并设置socket信息返回接受函数   
          socketApi1.initWebSocket(this.websocketUrl,this.dealSocketData);
        },
        beforeDestroy(){
         socketApi1.closeWebSocket();
        },
        methods(){
          // socket信息返回接受函数
          dealSocketData(data) {
            console.log(data);
          },
          //发送socket信息
          websocketSend(data) {
            socketApi1.sendSock(data);
          }
        }
  }
   ```
