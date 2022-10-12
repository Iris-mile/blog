---
title: vuex
---
## 模块化
1. state
```js
const state = {
  trainArriveInfo: null
}
```
2. getters,参数(state, getters)
```js
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
    return state.centerDisplayStation ? 
    item.ip === state.centerDisplayStation 
    : item.ip.includes(hostname)
  })?.name,

          stationIPListByFilter: state => state.stationIPList.filter(item => !item.isCenter)
    
}
```
3. mutations,参数(state, payload)
```js
const mutations = {
  SET_ARRIVE: (state, data) => {
    state.trainArriveInfo = data
  },
}
```

4. actions,参数({ commit }，payload)
```js
const actions = {

}
```
::: tip 模块化暴露
export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
:::

## getters提取
```js
const getters = {
  trainArriveInfo: state => state.websocket.trainArriveInfo,
  weightRate: (state, getters) => getters['websocket/weightRate'],
}
export default getters
```

## index.js集中模块
```js
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

## 界面使用
```js
import { mapGetters,mapMutations, mapActions} from "vuex";
// 1.getters、states数据通过computed获取
 computed: {
  //getters集中快下
    ...mapGetters(["trainArriveInfo", 'weightRate']),
    //center模块下
    ...mapState("center", ['centerDisplayStation']),
  }

// 2.actions mutations在methods下获取
  methods: {
    ...mapMutations('cctv', ['SET_CCTV_AREA_LIST', 'SET_CCTV_LIST']),
    ...mapActions('cctv', ['getCCTVParams']),
   }

   //原始获取方法：
    1、mutations:this.$store.commit('websocket/SET_NowDate', nowObj)
    2、actions:this.$store.dispatch('user/login', this.loginForm)
    3、satte:this.$store.state('user/ip')
    4、getters:this.$store.getters('user/ip')
```
::: warming
状态机异步数据没有拿取到时页面渲染：
+ v-if="weightRate.up"解决状态机的接口数据异步没拿取到
+ if (!state.trainArriveInfo) return {};配合状态机没有数据时处理
:::

## js文件使用vuex
```js
import store from './store'
            store.getters.userInfo//集中到getters.js的 
            //没有集中到getters.js的获取
            store.getters.user.userInfo
            store.getters['user/userInfo']
            await store.dispatch('user/getInfo')
            store.state.user.userMenus
```
