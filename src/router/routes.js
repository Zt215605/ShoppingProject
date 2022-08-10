// 路由配置信息

import Home from '@/pages/Home';
import Search from '@/pages/Search';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Detail from '@/pages/Detail';
import AddCartSuccess from '@/pages/AddCartSuccess';
import ShopCart from '@/pages/ShopCart';
import Trade from '@/pages/Trade';
import Pay from '@/pages/Pay';
import PaySuccess from '@/pages/PaySuccess';
import Center from '@/pages/Center';
// import myOrder from '@/pages/Center/myOrder';   //使用懒加载展示一下，工作中就这样引入了
import groupOrder from '@/pages/Center/groupOrder';
export default [
    {
        path: '/home',
        component: Home,
        meta: { show: true }
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true },
        name: 'search',
        // 路由组件可不可以传递props数据？
        // 布尔值的写法  params
        // props:true
        // 对象写法
        // props:{a:1,b:2}
        // 函数写法：可以params参数，query参数，通过props传递给组件
        props: ($route) => ({ keyword: $route.params.keyword, k: $route.query.k })

    },
    {
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    {
        path: '/addcartsuccess',
        name: 'addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {

        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {

        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 去交易页面，必须是从购物车来
            if(from.path=='/shopcart'){
                next();
            }else{
                next(false);
                // 其实也可以使用next(from.path);代替   
                /*  具体参考官方文档
                    next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
                */
            }
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: { show: true },
        beforeEnter:(to,from,next)=>{
            if(from.path=='/trade'){
                next();
            }else{
                next(false);
            }
        }
    },
    {
        // 这里的进入判断使用组件内路由守卫来实现先不用独享守卫了
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        path: '/center',
        component: Center,
        meta: { show: true },
        children: [
            {
                // 二级路由写/的话就要写全（即包含父级路由的路径）
                path:'myorder',
                // component:myOrder  被访问的时候才加载
                component:()=>import('@/pages/Center/myOrder')
            },
            {
                path:'grouporder',
                component:groupOrder
            },
            // 重定向，查看订单默认重定向到我的订单，其实这里也可以直接在路由跳转中配置到指定位置
            {
                path:'/center',
                redirect:'/center/myorder'
            }
        ]

    },

    // 重定向，在项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '*',
        redirect: '/home'
    }
]