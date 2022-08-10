
import Vue from 'vue'
import App from './App.vue'
// 三级联动组件 全局组件
import TypeNav from '@/components/TypeNav'
Vue.component(TypeNav.name, TypeNav);
import Carousel from '@/components/Carousel'
Vue.component(Carousel.name, Carousel);
import Pagination from "@/components/Pagination";
Vue.component(Pagination.name, Pagination);


// import VueRouter from 'vue-router'
// Vue.use(VueRouter)   在前面路由中使用过了
// 引入路由
import router from '@/router'
import store from '@/store';

// 引入mockServe.js-----mock模拟虚拟的数据
import '@/mock/mockServe.js';
// 引入swiper样式
import 'swiper/css/swiper.css';

// 引入ElementUI样式
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 个人注释：element-ui注册组件还有种方式就是挂载到原型对象身上，不过我这里使用的是全部引入，挂载在组件上看视频里面     
Vue.use(ElementUI);

Vue.config.productionTip = false;

// 统一接收api文件夹中所有接口请求函数
// 统一引入
import * as API from '@/api';

// 引入vue-lazyload插件并注册
import VueLazyload from 'vue-lazyload';
import picture from '@/assets/picture.jpg';
// 可以传入配置对象
Vue.use(VueLazyload, {
    // 懒加载默认的图片
    loading: picture
});


// 引入自定义插件
import myPlugins from '@/plugins/myPlugins';
Vue.use(myPlugins, {
    name: 'upper'
});

// 引入表单校验插件   这里只需要执行代码，所以不用暴露
import '@/plugins/validate.js';

new Vue({
    el: '#app',
    // 全局事件总线的配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    render: h => h(App),
    // 注册路由：组件身上都拥有$route,$router
    router,
    // 注册仓库：组件身上会出现$store属性
    store,

})