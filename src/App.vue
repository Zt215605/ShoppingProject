<template>
  <div>
    <Header/>
    <router-view></router-view>
    <!-- 在home或search下是显示的 -->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from './components/Footer';

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  mounted() {
    // 派发一个action，获取数据
    this.$store.dispatch("categoryList");
  },
};
</script>

<style scoped lang="less">
  //对于使用到less的同时有想要使用css可以写两个style 
  // 同理对于scoped也可以写多个来控制是否限制当前页使用
</style>