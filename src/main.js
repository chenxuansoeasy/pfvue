// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import './components/model/pf'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Vuex)
/* eslint-disable no-new */
const graph = new Vuex.Store({
  state: {
    count: 0,
    // x6 图对象
    graphX6: {},
    // x6 图对象信息  id:data
    graphInfo: {
      nodeList: {
        id: {
          attr: {
          }
        }
      }
    },
    // graph.history 实现撤销重做操作
    undoManager: {},
    // 某一属性框显示
    showAttrConfig: false,
    // 当前节点
    currentNode: {}
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
new Vue({
  render: h => h(App),
  store: graph
}).$mount('#app')
