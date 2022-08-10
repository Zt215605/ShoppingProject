import { reqGetSearchInfo } from "@/api";

// search模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    // action:可以书写自己的业务逻辑，也可以处理异步任务
    // 获取search模块数据
    async getSearchList({ commit }, params) {
        // 这个函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        // params形参：用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result;
        try {
            result = await reqGetSearchInfo(params);
            // console.log('res',result);
            if (result.code === 200) {
                commit('GETSEARCHLIST', result.data);
            }
        } catch (e) {
            console.warn('e :>> ', e);
        }

    }
};
// 计算属性
// 但是在项目中getters主要的作用是简化仓库中的数据（简化数据）
// 可以把将来组件中需要使用的数据简化一下
const getters = {
    // 当前形参是search仓库的state     注意：state参数是search仓库中的state，这一点很重要
    goodsList(state) {
        // 如果服务器数据回来了就是一个数组，如果网络等问题导致数据没有回来就使用空数组，防止undefined作为数组遍历报错
        return state.searchList.goodsList || [];
    },
    trademarkList(state) {
        return state.searchList.trademarkList || [];
    },
    attrsList(state) {
        return state.searchList.attrsList || [];
    }

};

export default {
    state,
    mutations,
    actions,
    getters
}