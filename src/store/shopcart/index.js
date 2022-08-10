import { reqCartList, reqDeleteCartById, reqUpdateCheckedById } from "@/api";

const actions = {
    // 获取购物车列表数据
    async getCartList({ commit }) {
        let result;
        try {
            result = await reqCartList();

            // console.log(result);
            if (result.code === 200) {
                commit('GETCARTLIST', result.data);
            }
        } catch (e) {
            console.log(e);
        }
    },
    // 删除购物车某一个产品
    async deleteCartListBySkuid({ commit }, skuId) {
        let result;
        try {
            result = await reqDeleteCartById(skuId);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 修改购物车某一个产品的选中状态
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result;
        try {
            result = await reqUpdateCheckedById(skuId, isChecked);
            if (result.code === 200) {
                return 'ok';
            } else {
                return Promise.reject(new Error('failed'));
            }
        } catch (e) {
            console.log('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    },
    // 删除全部勾选的产品
    deleteAllCheckedCart({ dispatch, getters }) {
        // context:小仓库，commit【提交mutations修改state】，getters【计算属性】，dispatch【派发actions】，state【当前仓库的数据】
        // 获取购物车中全部的产品（是一个数组）
        let promiseAll = [];
        getters.cartList.cartInfoList.forEach((item) => {
            let promise;
            if (item.isChecked == 1) {
                promise = dispatch('deleteCartListBySkuId', item.skuId);
                promiseAll.push(promise);
            }
            // 下面这种是老师的写法
            // promise=item.isChecked==1?dispatch('deleteCartListBySkuId',item.skuId):'';  //测试了一下空字符串或undefined在Promise.all中也是成功（只要不是失败的promise都成功），故三元表达式也可以
            // promiseAll.push(promise);
        });
        // 只要全部的都成功返回的即为成功，如果有一个失败返回的即为失败的结果
        return Promise.all(promiseAll);
    },
    // 修改全部产品的状态
    async updateAllCartIsChecked({ dispatch, state }, isChecked) {
        let promiseAll = [];
        state.cartList[0].cartInfoList.forEach((item) => {
            let promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
            promiseAll.push(promise);
        });
        // 返回结果
        return Promise.all(promiseAll);
    }
};

const mutations = {
    GETCARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const state = {
    cartList: []
};
const getters = {
    cartList(state) {
        return state.cartList[0] || {};
    }
};
export default {
    actions,
    mutations,
    state,
    getters
}


