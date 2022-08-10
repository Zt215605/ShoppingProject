import { reqGoodsInfo, reqAddOrUpdataShopCart } from "@/api";
// 封装临时游客身份模块uuid  生成一个随机的字符串
import { getUUID } from "@/utils/uuid_token";
const state = {
    goodInfo: {},
    // 游客临时身份
    uuid_token:getUUID()
}
const actions = {
    async getGoodInfo({ commit }, skudId) {
        let result;
        try {
            result = await reqGoodsInfo(skudId);
            if (result.code === 200) {
                commit('GETGOODINFO', result.data);
            }
        } catch (e) {
            console.warn(e);
        }
    },
    // 将产品添加到购物车中或者修改某一个产品的数量
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        let result;
        /* 这个try ...catch 一直都是个人所添加的，主要是防止返回的结果是失败的promise对象
        （处理结果使用了await，如果为失败的则需要使用try...catch处理） */
        try {
            // 加入购物车返回的结果
            // 加入购物车以后，前台将参数带给服务器
            // 服务器写入数据库成功并没有返回其它数据，只返回code=200代表本次成功
            // 故可以不调用commit存储数据
            result = await reqAddOrUpdataShopCart(skuId, skuNum);
            // console.log('result :>> ', result);
            // 判断请求是否成功
            if (result.code === 200) {
                // 当前这个函数如果执行返回promise
                return '成功!';
            } else {
                // 加入购物车失败
                return Promise.reject(new Error('failed'));

            }
        } catch (e) {
            console.warn('e :>> ', e);
            return Promise.reject(new Error('failed'));
        }
    }

}
const mutations = {
    GETGOODINFO(state, goodInfo) {
        state.goodInfo = goodInfo;
    }
}
const getters = {
    // 路劲导航的简化信息数据
    categoryView(state) {
        // state.goodInfo初始状态为空对象
        return state.goodInfo.categoryView || {};
    },
    // 简化产品的信息
    skuInfo() {
        return state.goodInfo.skuInfo || {};
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodInfo.spuSaleAttrList || [];
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}