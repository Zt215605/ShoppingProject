// 注册与登录模块
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from "@/utils/token";
const actions = {
    // 获取验证码
    async getCode({ commit }, phone) {
        let result;
        try {
            // 获取验证码的这个接口在这里这个项目为了省钱把验证码返回了，正常开发中应该是把验证码发到用户手机上，返回状态码
            result = await reqGetCode(phone);
            console.log(result);
            if (result.code == 200) {
                // 正常情况下这里是不需要commit的，但是这个项目后台为了省钱并没有将验证码发送到手机上，我们需要打印使用验证码做调试所以才commit
                // commit('GETCODE', result.data);
                return 'ok';
            } else {
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户注册
    async userRegister({ commit }, user) {
        let result;
        try {
            result = await reqUserRegister(user);
            console.log(result);
            if (result.code == 200) {
                return 'ok';
            } else {        //个人注释：这里不同于别处的是应该是返回失败的状态码以便好做处理（如已被注册等提示），别处是只需要判断是否请求成功即可
                // 但是下面这里我在写的时候写得不严谨，直接返回了一个失败的状态
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 用户登录模块[token]
    async userLogin({ commit }, data) {
        let result;
        try {
            result = await reqUserLogin(data);
            console.log('登录模块返回数据，正常情况下后端应该只返回token，但是这里连同用户信息也一起返回来了', result);
            // 服务器下发token，用户唯一标识符
            // 将来经常通过带token找服务器要用户信息进行展示
            if (result.code === 200) {
                commit('USERLOGIN', result.data.token);
                // // 持久化存储token
                // localStorage.setItem('TOKEN',result.data.token);               //个人注释：很重要
                // 有些程序员也这样写，封装成为了一个函数引入进来
                setToken(result.data.token);      // 个人注释（很重要）：这里我原本以为通过本地存储的方式就没得必要在使用commit提交了，但实际上
                return 'ok';                     //数据回来之后不在mutation中修改状态页面数据就无法及时更新而是需要刷新一下才能更新，
            } else {                           //因为执行时机的问题，这里面是响应式数据当被修改的时候就会被调用，但是如果使用一开始就本地读取，那么数据只能下次挂在才能再次读取到
                return Promise.reject(new Error('failed'));
            }                                                        //从上面这里可以发现store中的state与getters在开始渲染页面的时候执行一次
        } catch (e) {                           
            console.log(e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 获取用户信息
    async getUserInfo({ commit }) {
        let result;
        try {
            result = await reqUserInfo();
            console.log('获取用户信息', result);
            if (result.code == 200) {
                // 提交用户信息
                commit('GETUSERINFO', result.data);
                // 这里这个函数中其实返回或不返回成功或失败状态都可以，毕竟要存入仓库，前面组件中获取就可以知道有没有存入成功
                return 'ok';
            } else {
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 退出登录
    async userLogout({ commit }) {
        let result;
        try {
            result = await reqLogout();
            if (result.code == 200) {
                // 不要在action中直接操作state
                commit('USERLOGOUT');
                return 'ok';
            } else {
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    }
};
const mutations = {
    // GETCODE(state, code) {
    //     state.code = code;
    // },
    USERLOGIN(state, token) {
        state.token = token;
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    USERLOGOUT(state) {
        // 把仓库中用户信息以及本地存储token清空
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
};
const state = {
    // code: '',   
    // token: '',    //这种写法刷新后登录失效，我的解决方式在请求拦截器中通过判断获取TOKEN
    // 下面是教学中的解决方案
    // token:localStorage.getItem('TOKEN'),
    token: getToken(),
    userInfo: {},
};
const getters = {

};
export default {
    actions,
    mutations,
    state,
    getters
}

