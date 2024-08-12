<template>
  <div id="app">
    <Loading :is-loading="isLoading"></Loading>
    <router-view v-if="!isLoading"/>
  </div>
</template>

<script>
  import Loading from "@/components/Loading";
export default {
  name: 'App',
  components:{
    Loading
  },
  data(){
    return{
      isLoading: true
    }
  },
  mounted() {
    const _this = this;
    const timer = setInterval(function() {
      // 判断文档和所有子资源(图片、音视频等)已完成加载
      if (document.readyState === 'complete') {
        // 执行方法
        _this.checkLoad()
        window.clearInterval(timer);
      }
    }, 500);
  },
  methods:{
    checkLoad(){
      this.isLoading=false
    }

  }
}
</script>

<style>
#app{
  width: 100%;
  height: 100%;
}
.content-center{
  width: 70%;
  margin: 0 auto;
  /*box-shadow: 0px 0px 10px black;*/
}
</style>
