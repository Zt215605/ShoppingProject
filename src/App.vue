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

</style>