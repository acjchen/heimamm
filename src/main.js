import Vue from 'vue'
import App from './App.vue'
//整和路由
import router from '@/router'
// 整合Element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// use Element-ui
Vue.use(ElementUI);



// 导入全局样式
// import "@/styles/base.less";


//是否显示生产环境
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  //挂载到vue实例上
  router
}).$mount('#app')
//挂载到id为app的div上
