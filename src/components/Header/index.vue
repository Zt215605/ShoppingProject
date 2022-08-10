<template>
  <header class="header">

    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p>尚品汇欢迎您！</p>
          <p v-if="!userName">
            <span>请</span>
            <!-- 声明式路由导航，务必要有to属性 -->
            <router-link to="/login">登录</router-link>
            <router-link class="register" to="/register">免费注册</router-link>
          </p>
          <p v-else>
            <a href="">{{userName}}</a>
            <a class="register" href="" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center/myOrder">我的订单</router-link>
          <router-link to="/shopCart">我的购物车</router-link>
          <router-link to="/">我的尚品汇</router-link>
          <router-link to="/">尚品汇会员</router-link>
          <router-link to="/">企业采购</router-link>
          <router-link to="/">关注尚品汇</router-link>
          <router-link to="/">合作招商</router-link>
          <router-link to="/">商家后台</router-link>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <router-link class="logo" to="/home">
          <img src="./images/logo.png" alt="" />
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <input
            type="text"
            id="autocomplete"
            class="input-error input-xxlarge"
            v-model="keyword"
          />
          <button
            class="sui-btn btn-xlarge btn-danger"
            type="button"
            @click="goSearch"
          >
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>

export default {
  name: "Header",
  data() {
    return {
      keyword: "",
    };
  },
  methods: {
    //   搜索按钮的回调函数：需要向search路由进行跳转
    goSearch() {
      //#region 
      //   路由传递参数
      // 第一种：字符串形式
      //   this.$router.push("/search/"+this.keyword+"?k="+this.keyword.toUpperCase());
      //   第二种：模板字符串
      //   this.$route.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase}`);
      // 第三种：对象
      // this.$route.push({
      //     name:'search',
      //     params:{
      //         keyword:this.keyword
      //     },
      //     query:{
      //         k:this.keyword.toUpperCase()
      //     }
      // })
      //#endregion
      //#region 
        /* 
            面试题1：路由传递参数（对象写法），path是否可以结合params参数一起使用？
            答：路由传递参数的时候，对象的写法可以是name，path形式，但是需要注意的是，path这种写法不能和params参数一起使用

            面试题2：如何指定params参数可传可不传？
            如果路由要求传递params参数，但是你就不传递params参数，发现一件事情，URL会有问题
            如何指定params参数可以传递或者不传递，在配置路由的时候在占位的后面加上一个问号【params可以传递或者不传递】
            this.$router.push({name:'search',query:{k:this.keyword.toUpperCase()}});

            面试题3：params参数可以传递也可以不传递，但是如果传递是空串，如何解决？
            使用undefined解决：params参数可以传递，不传递（空的字符串）
            this.$router.push({name:'search',params:{keyword:''||undefined},query:{k:this.keyword.toUpperCase()}});
        
            面试题4：路由组件可不可以传递props数据？
            可以的：三种写法 
        */
       //#endregion

      //#region 
      // this.$router.push(
      //   {
      //     name: "search",
      //     params: {
      //       keyword: this.keyword||undefined,
      //     }
      //   },
      //   (response) => {},   //这里传入回调函数是为了防止多次点击出现报错，但是已经通过重写push和replace方法来实现了 这种处理可以作为参考
      //   (error) => {     
      //     console.log(error);
      //   }
      // );
      // console.log(this.$router);
      //#endregion
      
      if(this.$route.query){       //个人注释：这里的判断意义不大，即使判断了也要执行，这里明显是一个对象，写个判断只是看着更便于理解
        // 如果有query参数需要带过去
        let location={name: "search",params: {keyword: this.keyword||undefined}};
        location.query=this.$route.query;
        this.$router.push(location);   
      }
    },
    // 退出登录
    async logout(){
      // 发请求通知服务器退出登录
      // 清除项目当中的数据【userInfo，token】
      try{
        let result=await this.$store.dispatch('userLogout');
        this.$router.push('/home');
      }catch(e){
        console.log('e :>> ', e);
      }
    }
  },
  mounted() {
    // 通过全局事件总线清除关键字
    this.$bus.$on('clear',()=>{
      this.keyword='';
    });

  },
  computed:{
    userName(){
      return this.$store.state.user.userInfo.name;
    }
  }
};
</script>

<style scoped lang="less">
.header {
  & > .top {
    background-color: #eaeaea;
    height: 30px;
    line-height: 30px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
          }
        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;

          & + a {
            border-left: 1px solid #b3aeae;
          }
        }
      }
    }
  }

  & > .bottom {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {
        img {
          width: 175px;
          margin: 25px 45px;
        }
      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 490px;
          height: 32px;
          padding: 0px 4px;
          border: 2px solid #ea4a36;
          float: left;

          &:focus {
            outline: none;
          }
        }

        button {
          height: 32px;
          width: 68px;
          background-color: #ea4a36;
          border: none;
          color: #fff;
          float: left;
          cursor: pointer;

          &:focus {
            outline: none;
          }
        }
      }
    }
  }
}
</style>
