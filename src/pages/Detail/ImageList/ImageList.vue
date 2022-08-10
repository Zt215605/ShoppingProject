<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper" ref="ceshi1">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id">
        <img  :src="slide.imgUrl" :class="{active:currentIndex==index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<script>

  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    data() {
      return {
        currentIndex:0,
      }
    },
    props:['skuImageList','spuSaleAttrList'],
    // 个人注释（很重要）
    //#region 
    // mounted() {
    //   // console.log(this.$refs.ceshi1)  将网络调慢测试可以发现结构没有出来，是因为数据还没有回来，所以这个轮播图严格来说是不能写在mounted中，避免网络慢的问题
    //   // console.log(this.skuImageList)  
    // },       //渲染过程中数据进行了一次更新，只是网络加载快看不出来，网络慢了就很明显
    // updated() {
    //   console.log('imageList组件数据更新了',this.skuImageList); 
    // },
    //#endregion
    watch:{
      skuImageList(newValue,oldValue){
        this.$nextTick(()=>{
          var mySwiper = new Swiper(this.$refs.cur, {
            // 显示个数
            // sildesPerView:3,
            // 每次切换图片的个数
            // slidesPerGroup:1,
            //   如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }
          });
        });
      }
    },
    methods: {
      changeCurrentIndex(index){
          this.currentIndex=index;
          this.$bus.$emit('getIndex',index);
      }
    },  
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
  

        // &:hover {
        //   border: 2px solid #f60;
        //   padding: 1px;
        // }
      }
    }
    .active{
      border: 2px solid orange ;
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>