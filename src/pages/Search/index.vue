<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <!-- bread：面包屑，带有x的结构的 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removetradeMark">×</i>
            </li>
            <!-- 平台的售卖的属性值展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1] }}<i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>
        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />
        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格结构 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a href="javascript:;"
                    >综合<span
                      v-show="isOne"
                      class="iconfont"
                      :class="{
                        'icon-direction-up': isAsc,
                        'icon-direction-down': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a href="javascript:;"
                    >价格<span
                      v-show="isTwo"
                      class="iconfont"
                      :class="{
                        'icon-direction-up': isAsc,
                        'icon-direction-down': isDesc,
                      }"
                    ></span
                  ></a>
                </li>
              </ul>
            </div>
          </div>
          <!-- 销售的产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 路由跳转的时候别忘记带上id -->
                    <router-link :to="`/detail/${good.id}`">
                      <img :src="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- pageNo：当前所在页数   pageSize：每页数据条数     total：总共数据条数    continues：连续页数 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 名称
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序顺序:初始状态应该是综合:降序
        order: "1:desc",
        // 分页器参数：代表的是当前是第几页
        pageNo: 1,
        // 代表的是每一页展示数据的个数
        pageSize: 10,
        // 平台售卖属性的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 当组件挂载之前执行一次【先于mounted之前】
  beforeMount() {
    // 整理数据
    // 复杂的写法
    // this.searchParams.category1Id=this.$route.query.category1Id;
    // this.searchParams.category2Id=this.$route.query.category2Id;
    // this.searchParams.category3Id=this.$route.query.category3Id;
    // this.searchParams.categoryName=this.$route.query.categoryName;
    // this.searchParams.keyword=this.$route.params.keyword;
    // Object.assign ：ES6新增语法，可以合并对象     个人注释：这里也可以使用es6的扩展运算符来合并
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  mounted() {
    // 在发请求之前把参数带给服务器【searchParams参数发生变化有数据带给服务器】
    this.getData();
  },
  computed: {
    // 下面这种写太麻烦了，最好就是在仓库getters中整理好了直接获取
    // ...mapState({goodsList:state=>state.search.searchList.goodsList})
    // mapGetters里面的写法：传递的数组，因为getters计算是没有划分模块[Home|Search]    个人注释：是否开启模块化主要还是看是否开启了namespaced
    ...mapGetters(["goodsList"]),
    isOne() {
      return this.searchParams.order.indexOf("1") !== -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") !== -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") !== -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") !== -1;
    },
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    getData() {
      // 向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
      // 获取Search组件数据
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName() {
      // 把带给服务器的参数置空了，还需要再次发请求
      // 带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器，但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = "";
      this.searchParams.category1Id = undefined; //正常来说应该是置空，但是置为undefined就不会把数据带给服务器了性能更好  个人注释：其实watch中也可以这样优化
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      // 地址栏也需要修改：进行路由跳转（跳转自己）       个人注释：这里我测试了一下修改$route中的参数是不允许的，参数属性只能靠传入来改，不可以直接改
      // this.$router.push({name:'search'});  这样写不严谨，虽然数据传递给服务器正常的，但是地址栏该有的数据也被删了（不能再展示）
      // 严谨：如果路径中出现params参数不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        //个人注释：其实这样判断无效，这是一个对象即使为空对象也为真，但是把params参数带上就不影响
        this.$router.push({ name: "search", params: this.$route.params });
      }
    },
    // 删除关键字
    removeKeyword() {
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      // 再次发送请求
      this.getData();
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear");
      // 进行路由的跳转
      // this.$router.push({name:'search'});  不严谨，应该带上该有的参数
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      // 整理品牌字段参数  "ID":"品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发送请求进行展示
      this.getData();
    },
    // 删除品牌的信息
    removetradeMark() {
      // 将品牌信息置空
      this.searchParams.trademark = undefined;
      // 再次发请求
      this.getData();
    },
    // 手机平台属性的回调函数
    attrInfo(attr, attrValue) {
      // 参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 数组去重
      if (this.searchParams.props.indexOf(props) === -1) {
        this.searchParams.props.push(props);
      }
      // 再次发送请求
      this.getData();
    },
    // 删除售卖的属性
    removeAttr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1);
      // 再次发请求
      this.getData();
    },
    // 排序的操作
    changeOrder(flag) {
      // flag形参：代表用户点击的是综合（1）或价格（2）
      let originOrder = this.searchParams.order;
      // 获取到的是最开始的状态
      let originFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      // 准备一个新的order属性值
      let newOrder = "";
      // 点击的是综合
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        // 点击的是价格
        newOrder = `${flag}:${"desc"}`;
      }
      // 将新的order赋予searchParams
      this.searchParams.order = newOrder;
      // 再次发送请求
      this.getData();
    },
    // 自定义事件的回调函数获取 获取当前页数据
    getPageNo(pageNo) {
      // 整理数据带给服务器
      this.searchParams.pageNo = pageNo;
      // 再次发送请求
      this.getData();
    },
  },
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发请求
    $route(newValue, oldValue) {
      // 每次请求完毕，应该把相应的1，2，3级分类的id置空，让他接受下一次相应的1，2，3级分类
      // 分类名字与关键字不用清理：因为每一次路由发生变化，都会给它赋予新数据
      this.searchParams.category1Id = ""; //可以直接置为undefined优化性能，置为undefined的如果没有被赋值不会带给服务器
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
      // 再次发请求之前整理参数给服务器
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      // 再次发请求
      this.getData();
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>