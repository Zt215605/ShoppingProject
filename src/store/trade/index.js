import { reqAddressInfo, reqOrderInfo } from '@/api';

const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result;
        try {
            result = await reqAddressInfo();
            if (result.code == 200) {
                commit('GETUSERADDRESS', result.data);
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    },
    // 获取用户商品清单数据
    async getOrderInfo({ commit }) {
        let result;
        try {
            result = await reqOrderInfo();
            if (result.code == 200) {
                commit('GETORDERINFO', result.data);
            }
        } catch (error) {
            console.log('error :>> ', error);
        }
    }

};
const mutations = {
    GETUSERADDRESS(state, userAddress) {
        state.userAddress = userAddress;
    },
    GETORDERINFO(state, orderInfo) {
        state.orderInfo = orderInfo;
    }
};
const state = {
    userAddress: [],
    orderInfo: {}
};
const getters = {


};
export default {
    actions,
    mutations,
    state,
    getters
}

