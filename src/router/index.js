import VueRouter from "vue-router";
import Vue from 'vue';
Vue.use(VueRouter);
import routes from './routes';
import store from '@/store';
// 先把VueRouter原型对象的push先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
// 重写push|replace
// 第一个参数：告诉原来的push方法，你往哪里跳转（传递哪些参数）
// 第二个参数：成功的回调
// 第三个参数：失败的回调
// call||apply区别：
// 相同点：都可以调用函数一次，都可以篡改函数的上下文一次
// 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组

VueRouter.prototype.push = function (location, resolve, reject) {
    // console.log('@@@',this);
    if (resolve && reject) {
        originPush.call(this, location, resolve, reject);
    } else {
        originPush.call(this, location, () => { }, () => { });
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}

const router = new VueRouter({
    // 配置路由
    // 第一：路径的前面需要有/ (不是二级路由)
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的这个y=0，代表的滚动条在最上方
        return { y: 0 }
    },
})
router.beforeEach(async (to, from, next) => {
    
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 登录了
    if (token) {
        if (to.path == '/login' || to.path == '/register') {
            // 登录了，去的是login
            next('/home');
        } else {
            // 登录了，去的不是login
            if (name) {
                // 如果有用户名，说明已经有用户信息
                next();
            } else {
                //没有用户名，还需获取用户信息
                try {
                    //个人错误实例：  await this.$store.dispatch('getUserInfo');     个人注释：这是我的错误示范，这里是路由器中不能使用this，而且路由器中this并不是指向vue实例或vc

                    await store.dispatch('getUserInfo');
                    // 获取用户信息成功
                    next();
                } catch (e) {
                    // 这里表示获取用户信息失败了，通常情况都是token失效了
                    // 所以应该清楚token并跳转到登录界面重新登录由服务器重新发送token
                    store.dispatch('userLogout');
                    next('/login');

                    console.log(e);
                }
            }
        }
    } else {
        // 未登录  不能去交易相关的，不能去支付相关的[pay,paysuccess],不能去个人中心
        // 未登录如果去上面这几个页面应该跳转到登录页面
        let toPath = to.path;

        /* if(toPath=='/trade'||toPath=='/pay'||toPath=='/paysuccess'||toPath=='/center'
        ||toPath=='/center/myorder'||toPath=='/center/grouporder'){  这种写法太麻烦了用下面中替换，其实也可以使用路由元信息替换 */
        if (toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1 || toPath.indexOf('/center') != -1) {
            // 把未登录的时候想去而没有去成的信息存储与路径中【地址栏】
            next('/login?redirect=' + toPath);
        } else {
            // 去的不是上面这些路由
            next();
        }
    }
});


export default router;

