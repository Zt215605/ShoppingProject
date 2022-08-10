<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <!--banner轮播-->
        <!-- 
          原本结构
          <div class="swiper-container" id="mySwiper" ref="mySwiper">
				<div class="swiper-wrapper" v-for="(carousel, index) in bannerList" :key="carousel.id">
					<div class="swiper-slide">
						<img :src="carousel.imgUrl" />
					</div>
				</div>
				如果需要分页器
				<div class="swiper-pagination"></div>

				如果需要导航按钮
				<div class="swiper-button-prev"></div>
				<div class="swiper-button-next"></div>
			  </div> -->
        <!-- 封装轮播组件之后，上面注释部分替换为这样
          <Carousel  :list="bannerList"/>
         -->
        <el-carousel
          :interval="5000"
          arrow="always"
          style="cursor: pointer"
          trigger="click"
          height="454px"
        >
          <el-carousel-item
            class="swiper-wrapper"
            v-for="(carousel, index) in bannerList"
            :key="carousel.id"
          >
            <img :src="carousel.imgUrl" />
            <div class="swipers-car">
              <div class="swiper-container" id="mySwiper"></div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">尚品汇快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[公告]</span>备战开学季 全民半价购数码</li>
            <li><span class="bold">[特惠]</span>备战开学季 全民半价购数码</li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class="life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
        <div class="ads">
          <img src="./images/ad1.png" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Swiper from "swiper";
export default {
  name: "ListContainer",
  mounted() {
    //   派发action ：通过Vuex发起请求，将数据存储到仓库当中
    this.$store.dispatch("getBannerList");
    // console.log(this.bannerList);  //打印空数组是因为渲染很快数据还没回来
    // setTimeout(() => {
    //     var mySwiper=new Swiper(document.querySelector('.swiper-container'),{
    //       loop:true,
    //       pageination:{
    //         el:'.swiper-pagination'
    //         },
    //         navigation:{
    //           nextEl:'.swiper-button-next',
    //           prevEl:'.swiper-button-prev',
    //         }
    //       });    //设计异步，效果很不好，使用$nextTick来代替
    //   },2000);
  },
  // 个人注释部分（很重要）：          放在update中效果可以实现但是一旦数据发生变化就又开始new swiper实例了
  //#region
  //此处注释的created与updated钩子是个人注释：通过测试发现vue渲染很快即使在created中请求数据都当数据返回来已经挂载了，
  // 故走了更新流程来重新渲染
  // created() {
  //     this.$store.dispatch('getBannerList');
  // },
  // updated() {
  //   console.log('更新了',this.bannerList);
  // },
  //#endregion
  computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
 watch:{
   bannerList: {
      handler(newValue,oldValue){
        // v-for执行完毕，才有结构【现在在watch中是没办法保证的】
        this.$nextTick(() => {
          //  当你执行这个回调函数的时候，保证服务器数据回来了，v-for执行完毕了【一定轮播图的结构有了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
            loop: true,
            pageination: {
              el: ".swiper-pagination",
              clickable: true,
            },
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      }
    },
 }
};
</script>

<style scoped lang="less">
.swipers-car {
  width: 730px;
  height: 454px;
  // background: pink;
}
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 5px;
      float: left;
    }

    .right {
      float: right;
      width: 250px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
          }

          .fr {
            float: right;
            font-size: 12px;
            font-weight: 400;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;

          .bold {
            font-weight: 700;
          }
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #e4e4e4;
          border-bottom: 1px solid #e4e4e4;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(~@/assets/images/icons.png);
            width: 61px;
            height: 40px;
            display: block;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}


</style>