import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";
// home模块的小仓库
const state = {
    // state中数据默认初始值别瞎写，服务器返回对象就应该是对象，服务器返回是数组就应该是数组。【根据接口的返回值去初始化】
    categoryList: [],
    // 轮播图的数据
    bannerList: [],
    // floor组件的数据
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    // action:可以书写自己的业务逻辑，也可以处理异步任务
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    async categoryList({ commit }) {
        let result;
        /* 这个try ...catch 一直都是个人所添加的，主要是防止返回的结果是失败的promise对象
        （处理结果使用了await，如果为失败的则需要使用try...catch处理） */
        try {
            result = await reqCategoryList();
            if (result.code === 200) {
                commit('CATEGORYLIST', result.data);
            }
        } catch (e) {
            console.warn('e :>> ', e);
        }

    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        let result;
        try {
            result = await reqGetBannerList();
            if (result.code === 200) {
                commit('GETBANNERLIST', result.data)
            }
        } catch (e) {
            console.warn('e :>> ', e);
        }

    },
    // 获取floor轮播图的数据
    async getFloorList({ commit }) {
        let result;
        try {
            result = await reqFloorList();
            if (result.code === 200) {
                commit('GETFLOORLIST', result.data);
            }
        } catch (e) {
            console.warn('e :>> ', e);
        }

    }
};
const getters = {

};

export default {
    state,
    mutations,
    actions,
    getters
}