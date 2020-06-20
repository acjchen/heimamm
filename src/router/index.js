//导入vue
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
import login from '@/views/login/login.vue'
//注册路由
Vue.use(VueRouter);
//创建路由规则
//创建路由对象
const router = new VueRouter({
    routes: [
        {
            path:'/login',
            component:login
        }
    ]
});
//暴露出去
export default router;

