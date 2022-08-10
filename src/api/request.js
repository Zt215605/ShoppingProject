// 对于axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css';
// start :进度条开始  done:进度条结束

// 在当前模块中引入store
import store from '@/store';

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.requests就是axios，只不过稍微配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径：发请求的时候，路径当中会出现api
    baseURL: '/api',
    // baseURL:"http://localhost:8080/api",   //个人发现
    // 代表请求超时的时间5s
    timeout: 5000
});
// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始动
    nprogress.start();

    if (store.state.detail.uuid_token) {
        // 请求头添加一个字段(userTempId)，注意这个字段是需要和后端人员商量好的
        config.headers.userTempId = store.state.detail.uuid_token;
    }
            //思考？ 这里严格来说我觉得应该携带了token就不应该再带着临时uuid身份了，应该是先判断token然后再判断uuid 

    // 需要携带token带给服务器
    if (store.state.user.token) {    //请求头中的关键字段是不能乱写的如token和userTempId这类字段是需要和后端协商好的
        config.headers.token = store.state.user.token;
    }
    // 下面这种方式是我解决登录后刷新失去登录效果的解决方案，其实这种方案没有教学中的那种效果好
    /* 
        else if (localStorage.getItem('TOKEN')) {
        config.headers.token = localStorage.getItem('TOKEN');
        }
    */
    return config;

});

// 响应拦截器
requests.interceptors.response.use((res) => {
    // 成功的回调函数：服务器响应数据回来以后，相应拦截器可以检测到，可以做一些事情
    // 进度条结束
    nprogress.done();
    // console.log(res);        
    return res.data;              //个人注释：拦截器返回的数据是promise对象中的PromieResult，而并不是将原来的promise对象修改为这个数据，也就是说axios请求返回的始终是promise对象
}, (error) => {
    // 服务器响应失败的回调函数
    return Promise.reject(new Error('failed'));

});


// 对外暴露
export default requests;



