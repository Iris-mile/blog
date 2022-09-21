---
title: project questions
---

## 一、关于style

主要是：style="{样式名：”样式值“，}"

```js
0、#行内样式;隔开style="color:#F00; font-weight:bold"
<div style="color:#F00; font-weight:bold">模式</div>
<p style=" color:#090; font-size:16px">形式</p>
```

```js
1、
 # :style="{ width: w + 'px' }"
 w: document.body.clientWidth - 300,1
     
    // 窗口大小变化函数
    resize() {
      this.w = document.body.clientWidth - 300;
    },
```

```js
2、 # :style="{display: item.isMenu ? '' : 'none'}"
<el-menu-item
                v-for="item in v.children"
                :index="item.path"
                :key="item.path"
                :style="{display: item.isMenu ? '' : 'none'}"
              >
```

```js
3、# <div class="box" :style="{width: `${width}px`, height: `${height}px`}">
```

```js
  4、#绑定计算属性：
  <span class="cat-name" :style="comStyle">{{ catName }}</span>

   comStyle () {
      return {
        fontSize: this.titleFontSize + 'px',
        color: getThemeValue(this.theme).titleColor
      }
    },
        
        另：<img :src="logoSrc" alt="" />
computed: {
    logoSrc () { return '/static/img/' + getThemeValue(this.theme).logoSrc},
            }
```



## 二、关于class

1、主要是：class="{css选择器名：true/false，}"——————用于选择器css

2、数组写法：class="['xx','mm']"  对象写法：class="{'xx'：true/false,'mm':true}"————用与类名

```js
0、# :class="{highlight: v.isMenu}"
    <el-submenu
              v-else
              :index="v.path"
              :key="v.path"
              :class="{highlight: v.isMenu}"
            >
```



```js
1、 # :class="{'icon-eye-close': passwordInputType === 'password','icon-eye-open': passwordInputType === 'text' }"
比如：

    1)html:
    <i
              @click="changeType"
              slot="suffix"
              class="iconfont"
              :class="{
                'icon-eye-close': passwordInputType === 'password',
                'icon-eye-open': passwordInputType === 'text',
              }"
            ></i>
  2）data:
    passwordInputType: "password", // 密码框类型
	 // 切换密码框类型
     
  3)methods:
    changeType() {
      if (this.passwordInputType === "password") {
        this.passwordInputType = "text";
      } else {
        this.passwordInputType = "password";
      }
    },
```

```js
2、多元判断
# :class="item < 0.3? uncrowdedColor1 : item > 0.3 && item < 0.5? normalColor1: crowdedColor1"

1)html:
 <li
        v-for="(item, index) in rate"
        :key="index"
        :class="
          item < 0.3
            ? uncrowdedColor1
            : item > 0.3 && item < 0.5
            ? normalColor1
            : crowdedColor1
        "
      >
    2）data:
      uncrowdedColor1: { c1: true, c2: false, c3: false },
      normalColor1: { c1: false, c2: true, c3: false },
      crowdedColor1: { c1: false, c2: false, c3: true },
    3)css:   
  .c1 {color: #39b54a !important;}
  .c2 {color: #d6f36a !important;}
  .c3 { color: #d6295f !important;}
```

```js
3、# :class="loadColorClass(item)"绑定方法

         <svg-icon 
              v-for="(item, index) in weightRate.up"
              :key="index + item"
              class="people"
              :class="loadColorClass(item)"
              icon-class="stand"
            />
                  
           方法methods：
      loadColorClass(rate) {
      if (rate < 0.3) return { uncrowded: true };
      if (rate < 0.5) return { normal: true };
      return { crowded: true };
    }

#  :class="{ warning: item.status }">     ______________item.staus=1时为true
.warning {
    color: #DC143C;
    .equip-icons {
      border-color: #DC143C;
      .icon {
        color: #DC143C;
      }
    }
  }

# :class="itemActive === 0?'active':''"
```

```js
5、数组写法：class="['xx','mm']"  对象写法：class="{'xx'：true/false,'mm':true}"

         #:class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"
        # :class="{'icon-eye-close': passwordInputType === 'password','icon-eye-open': passwordInputType === 'text' }"
        
 <span @click="changeSize('rank')"  :class="['iconfont', fullScreenStatus.rank ? 'icon-compress-alt' : 'icon-expand-alt']"></span>
```





## 三、关于图片

```css
1、满屏背景
  background-image: url("../../assets/imgs/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;

```



## 四、关于父传子

```js
1、props: {
    height: {
      type: String,
      default: '2.5rem'
    },
    options: {
      type: Object,
      default: ()=>({})
    }
  },
     
2、  props: ["weightRate"],
```

## 五、关于监听watch

```js
1、watch: {
    trainArriveInfo: {
      //解决异步没有获取到状态机数据
      handler: function (val, oldVal) {
        this.showArrive();
      },
      deep: true,
    },
  },
2、 watch: {
    editBtnShow(newVal, oldVal) {
        
      });
    },
  },
```

## 六、关于主题切换

```js
1、定义主题js文件,对象动态键名获得值theme[themeName]，暴露主题名方法出去
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

#》》》》》》》》》》比如：theme['chalk']
#>>>>>>>>>>>>>>>>let ar='chalk'  theme[ar]动态放入键名变量，值“”

export function getThemeValue (themeName) {
  return theme[themeName]
}
```

```js
2、主题名存入状态机，改变和存取
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


#对应界面改变状态机值
点击方法：handleChangeTheme () {
      // 修改VueX中数据
     this.$store.commit('changeTheme')
    },
```

```js
state: {
    theme: 'chalk'
  },
      
3、界面使用
import { mapState } from 'vuex'
computed: {
    ...mapState(['theme'])
  },
      
      4、计算属性更换样式》》拿到状态机them值》》》再拿js文件里主题配置them下的具体每个值
  <div class="screen-container" :style="containerStyle">
      
      containerStyle () {
      return {
        backgroundColor: getThemeValue(this.theme).backgroundColor,
        color: getThemeValue(this.theme).titleColor
      }
    },
```

## 七、状态机使用vuex

```js
1、模块化暴露
#接口数据mutations存入状态机，getters处理需要数据
const state = {
  trainArriveInfo: null
}

#参数(state, getters)
const getters = {
          // 车厢拥挤度
          weightRate() {
           # if (!state.trainArriveInfo) return {};
            const { upList, downList } = state.trainArriveInfo;
            const up = upList[0].vehicleWeightVOList.map(v => {
              return (v.fullVehicleWeight - v.nowVehicleWeight) / (v.fullVehicleWeight - v.emptyVehicleWeight)
            })
            const down = downList[0].vehicleWeightVOList.map(v => {
              return (v.fullVehicleWeight - v.nowVehicleWeight) / (v.fullVehicleWeight - v.emptyVehicleWeight)
            })
            //处理下行数据默认向右
            return { up, down: down.reverse()}
          }
        
    
          isCenter: (state, getters) => getters.centerIp.includes(hostname),
          currentStationName: state => state.stationIPList.find(item => {
            return state.centerDisplayStation ? item.ip === state.centerDisplayStation : item.ip.includes(hostname)
          })?.name,
          stationIPListByFilter: state => state.stationIPList.filter(item => !item.isCenter)
    
}

#参数(state, payload)
const mutations = {
  SET_ARRIVE: (state, data) => {
    state.trainArriveInfo = data
  },
}

#参数({ commit }，payload)
const actions = {

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
```

```js
2、getters暴露(state, getters)
const getters = {
  trainArriveInfo: state => state.websocket.trainArriveInfo,
  weightRate: (state, getters) => getters['websocket/weightRate'],
}
export default getters
```

```js
3、#index集中模块暴露
import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules,
  getters
})

export default store

```

```js
4、界面使用
import { mapGetters,mapMutations, mapActions} from "vuex";

#取数据方法
  computed: {
    ...mapGetters(["trainArriveInfo", 'weightRate']),
    ...mapState("center", ['centerDisplayStation']),
  },
            #or：统一用mapState通过参数获得
            ...mapState('center', {
              centerDisplayStation: state => state.centerDisplayStation,
              isCenter: (state, getters) => getters.isCenter,
            }),
    
   methods: {
    ...mapMutations('cctv', ['SET_CCTV_AREA_LIST', 'SET_CCTV_LIST']),
    ...mapActions('cctv', ['getCCTVParams']),
   }
      
                                 #，v-if="weightRate.up"解决状态机的接口数据异步没拿取到
                                 #  # if (!state.trainArriveInfo) return {};配合状态机没有数据时处理
                                 <div v-if="weightRate.up" class="picture">
                                        <svg-icon 
                                          v-for="(item, index) in weightRate.up"
                                          :key="index + item"
                                          class="people"
                                          :class="loadColorClass(item)"
                                          icon-class="stand"
                                        />
                                      </div>
       
 #or
 	1、mutations:this.$store.commit('websocket/SET_NowDate', nowObj)
    2、actions:this.$store.dispatch('user/login', this.loginForm)
    3、satte:this.$store.state('user/ip')
    4、getters:this.$store.state('user/ip')
     
```

```js
5、js文件中使用状态机
import store from './store'
            store.getters.userInfo
            await store.dispatch('user/getInfo')
            store.state.user.userMenus
```



八、组件封装

```html
##一、卡片组件：父传子props、插槽
<template>
  <div class="box" :style="{width: `${width}px`, height: `${height}px`}">
    <div v-if="title" class="head">
      <span class="title">{{ title }}</span>
      <div v-if="showMore" @click="toMore" class="more">more ></div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BoxWrapper',
  props: {
    title: {
      type: String,
      required: false
    },
    showMore: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      require: true,
    },
    height: {
      type: Number,
      require: true,
    }
  },
  methods: {
    toMore() {
      this.$emit('toMore')
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  background-color: rgba(43, 78, 94, 0.6);
}
.head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 10px;
  background: linear-gradient(to right, #4691b4, rgba(43, 78, 94, 0.6));
}

.title {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.more {
  color: #778899;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
}
</style>
```

```html
#主要：子传父
<template>
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    hide-on-single-page
    :current-page="current"
    :page-sizes="[10, 20]"
    :page-size="size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    current: {
      type: Number,
      default: 1,
    },
    size: {
      type: Number,
      default: 20,
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    handleCurrentChange(page) {
      this.$emit('changePage', page)
    },
    handleSizeChange(size) {
      this.$emit('changePagesize', size)
    },
  },
}
</script>

<style lang="scss" scoped>
.pagination {
  margin-top: 20px;
  text-align: right;
}
</style>


使用组件
 <Pagination
      :current="current"
      :size="size"
      :total="total"
      @changePage="changePage"
      @changePagesize="changePagesize"
    />
```

## 八、接口数据处理

```js
 data() {
    return {
      form: {
        taskName: null,
        taskType: null,
        taskState: null,
        date: null,
      },
      tableData: [],
      current: 1,
      size: 20,
      total: 0,
    }
  },


查询：async handleGetVideoCheckList() {
      const { current, size, form } = this
      const { date, ...rest } = form
      const [startTime, endTime] = date || [null, null]
      const params = { current, size, startTime, endTime, ...rest }
      const {
        data: { records, total },
      } = await getVideoCheckList(params)
      this.tableData = records
        this.total = total
    },
```

```js
echarts表数据
# import { FAULT_REPAIR_ORDER_STATUS } from '@/utils/constants';
 async handleGetFaultOrderMsg() {
      const { data } = await getFaultOrderMsg();
      this.faultInfo = data;
      this.handleDrawChart();
    },
   
   
      series: [
          {
           # data: Object.keys(this.faultInfo).map(item => ({
              value: this.faultInfo[item],
              name: FAULT_REPAIR_ORDER_STATUS[item]
            })),
          },
        ],
         
  
            
 #js文件拼接：EQUIPMENT_STATUS[v.status]》》》》》》》》EQUIPMENT_STATUS['1']>>>得到：“在线设备”
export const EQUIPMENT_STATUS = {
  '1': '在线设备',
  '2': '离线设备',
  '3': '异常设备',
  '4': '总设备数',
}
```





## 九、接口数据模拟

```js
   /**
     * @function 模拟表格数据
     */
    const data = new Array(7).fill(1)
    this.tableData = data.map(() => ({
      branch: '产品部',
      name: '张三',
      role: '安全员',
      empno: 'K13084849',
      tel: '345903284754389',
      email: '123@qq.com',
      status: '启用/禁用',
      updateTime: '2021-09-23 15:34:21'
    }
    ))

```

## 十、请求方式

```js
1、psot形式data
export function ptzControl(data) {
  return request({
    url: '/sts/equipment/v1/cctv/ptz_control',
    method: 'post',
    data
  })
}
2、get的params参数
export function getEventDetail(params) {
  return request({
    url: '/sts/equipment/v1/event/e_ec_details',
    method: 'get',
    params
  })
}

3、get的path类型
export function deleteEvent(query) {
  return request({
    url:`/sts/equipment/v1/emergency/delete_event/${query}`,
    method: 'get'
  })
}
4、post传单个字符串：更改请求头
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

#promise.all请求
async getEnvironmentInfo({ commit }, payload) {
    const types = Object.keys(ENVIRONMENT_TYPE)
    const arr = await Promise.all(types.map(type => getEnvironmentIndicator(type, payload)))#promise.all（['xx','hh'])
    let indicators = {}
    types.forEach(type => {
      const { data } = arr.find(v => v.data[ENVIRONMENT_TYPE[type]] !== undefined)
      if (data) {
        indicators = { ...indicators, ...data }#合并对象{...a,...b}
      }
    })
    commit('SET_ENVIRONMENT_INFO', indicators)
  }
```

## 十一、computed

```js
#一般只用getters,当依赖发生改变，key才改变
 computed: {
    key() {
      return this.$route.path
    }
  }
#setters使用：先执行get，当currentPage被改变时候触发set再执行get。比如应用场景分页封装
 currentPage: {
      get() {
        return this.current
      },
      set(val) {
        this.$emit('update:current', val)
      }
    },
```

## 十二、数组方法运用

```js
#1、find在数组里面找到某个元素
 const data = res.data.find((item) => item.name === '纠正性工单流程')
#findIndex找到元素的下标，没有就返回-1
 const index = this.msgBoxList.findIndex(item => [1, 2].includes(item.params.model))
#2、some数组中有一个满足条件就返回true
 const hasPermission = store.state.user.userMenus.some(item => item.menuName === to.meta.title)
#3、sort按照自定义排序
 const sourtList = ['系统管理', '设备管理', '设备事件管理];
  arr.sort((a, b) => {
    const aIndex = sourtList.indexOf(a.name);
    const bIndex = sourtList.indexOf(b.name);
    return aIndex - bIndex;
  })
#用于删除spilce a.splice(i, j, e1, e2, ...)表示从数组下标i开始删除j个替换成e1...。改变原数组
            const index = this.msgBoxList.findIndex(item => [1, 2].includes(item.params.model))
            if (index > -1) {
              this.msgBoxList.splice(index, 1)
            }
#用于截取arr.slice(i, j) 表示将数组/字符串从 [i, j)（分界是前开后闭）切片，然后返回取出的片段，非原地操作。不改变原数组/字符串
    var arr = [1, 2, 3, 4, 5]
    var sub = arr.slice(1, 4)
    console.log(sub) // [2, 3, 4]
#reduce和递归prev前一次循环结果，cur当前循环值，[]初始值
            function filterMenus(menus, userMenus) {
                              if (menus?.length) {
                                return menus.reduce((prev, curr) => {
                                          const hasMenuItem = userMenus.some(item => item.menuName === curr.meta.title)
                                          if (hasMenuItem) {
                                                        if (curr?.children?.length > 1) {
                                                          curr.children = filterMenus(curr.children, userMenus)
                                                        }
                                                        return [...prev, curr]
                                          } else {
                                            return prev
                                          }
                                }, [])
                              }
                              return []
                    }
#filter筛选数组结合权限
            /* 判断是否有权限 */
            const hasPermissioin = (router, role) => {
              if (router.meta && router.meta.roles) {
                return router.meta.roles.includes(role)
              } else {
                return true; // 没有配置roles（默认就是可以访问）
              }
            }
                
            /* 计算出哪些路由是可以访问的 */
            const calcPermisstionRoutes = (dynamicRoutes, role) => {
              // 把有权限的动态路由 计算出来
              let temp = dynamicRoutes.filter(v => {
                if (hasPermissioin(v, role)) { // 如果有权限 就返回true 把这个单个路由对象 放入temp
                      if (v.children && v.children.length) { // 递归算儿子的权限
                        v.children = calcPermisstionRoutes(v.children, role)
                      }
                      return true;
                } else {
                  return false; // 否则 就是没有权限 就返回false 不放入temp
                }
              })
              return temp
            }
            
            ##递归+for跳出循环
            function getMenuName(menus, url) {
                  let name = null
                  function findMenuNameByUrl(menus, url) {
                    for (const item of menus) {
                      if (item.path === url) {
                        name = item.meta.title
                        break
                      } else if (item?.children?.length) {
                        findMenuNameByUrl(item.children, url)
                      }
                    }
                  }
                  findMenuNameByUrl(menus, url)
                  return name
            }

####改变原数组方法：pop,push,shift,unshift,reverse,sort,splice

```

## 十三、路由跳转

```js
1、this.$router.push({
            path: '/equipment/trouble',
            query: {deployId: data.deploymentId, }
          })

2、this.$router.push('/equipment/plan')
```

## 十四、打包后地址切换

- 原因：项目打包后地址不易更改，要更换项目配置地址再打包，多次重复打包操作

- 解决：vue项目下public/config.js，然后将文件引入到public/index.html

  ```js
  #config.js
      VUE_APP_BASE_API = 'http://10.166.46.125:8090/' // 智慧车站平台车站接口地址
      1、上诉方法将地址挂载了window上，通过window.获取
      2、若不想挂载window，可以const obj={xx:'hh'}通过obj获取
  #index.html
        <!-- built files will be auto injected -->
    <script type="text/javascript" src="/js/config.js"></script>
  #项目中配置使用：
      原有地址：process.env.VUE_APP_BASE_API
      更改为：window.VUE_APP_BASE_API || process.env.VUE_APP_BASE_API
      比如：request请求地方地址、websocket地址等等
      
  ```

## 十五、数据处理

```js
#三元判断
      const code = res.data.msg ? res.data.code : res.status || 200
      const padZero = n => {
                  return n < 10 ? '0' + n : n
                }
#默认情况
      const msg = errorCode[code] || res.data.msg || errorCode['default']
#命名变量和赋值
    const [startDate, endDate] = date || ['', '']
#echarts图表数据处理
     const [xData, yData] = [[], []]   //避免多个遍历
      this.chartData.forEach(item => {
        item.time = dayjs(item.time).format('YYYY-MM-DD')
        xData.push(item.time)
        yData.push(item.value)
      })
#简单处理
    1、转数字：（+val）  2、转字符串:val+''   3、判断数字是整： Number.isInteger(+val)
#if语句处理
    1·不同条件下return,先满足条件return
 hasPermission(vm) {
      const menus = local.get('menus')
      const { userMenus, jumpMoreUrl } = vm
      const menuName = getMenuName(menus, jumpMoreUrl)
      if (menuName === '历史事件信息' || menuName === '门禁事件信息') { // 特殊处理安防历史事件页面，该页面无菜单显示
        return true
      }
      return userMenus.some(item => item.menuName === menuName)
    }
#解构赋值
const [hour, min, sec] = time.split(':')
```

## 十六、css问题

```css
1、&是并且的关系。
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

2.+表示选择元素后面紧紧相邻的一个兄弟（间隔不可）
	如  ：   h1 + p {color: red;}》》》》》》区别 h1 ~ p {color: red;}表示h1后所有兄弟p不管是否间隔
    <h1>测试一下选择器</h1>
    <p>呵呵哈哈哈</p>
    <p>呵呵哈哈哈</p>
        ###另类相同元素：li+li表示除去第一个后面li都起效应
               如：li + li { color: green;}
                  <li>s是吗</li>
                  <li>s是吗</li>
                  <li>s是吗</li>
```

## 十七、内嵌页面iframe

```

```

## 十八、导出和引入export

````js
#方式一：暴露单个，变量引入
    导出：export default {        
                xx:xx,
                hh:hh
            }
            or export default a
    引入：import 变量名 from '........'
    使用：变量名.xx,变量名.hh

#方式二：暴露多个，解构引入
    导出：export const a=       export const b=  
    引入：import {a,b} from '........'
    使用：a,b
````



