<template>
  <div>
    <div class="swiper-container" ref="cur">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(carousel, index) in list"
          :key="carousel.id"
        >
          <img :src="carousel.imUrl" />
        </div>
      </div>
      <!-- 如果需要分页器 -->
      <div class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div class="swiper-button-prev"></div>
      <div class="swiper-button-next"></div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carousel",
  props:['list'],
  watch: {
    //   watch监听不到list，因为数据是父组件直接传递过来的
    list: {
      // 立即监听：因为floor组件中的数据是父组件给的，故上来需要调用一次
      immediate: true,
      handler() {
        this.$nextTick(()=>{
          var mySwiper = new Swiper(this.$refs.cur, {
          loop: true,
          //   如果需要分页
          pageination: {
            el: ".swiper-pagination",
            // 点击小球的时候也切换图片
            clickable: true,
          },
          //   如果需要前进后退按钮
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
        });
        })
      },
    },
  },
};
</script>

<style scoped lang="less">
</style>