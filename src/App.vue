<template>
  <div id="app">
    <a-spin v-if="loading" size="large" style="margin-left: 50%;margin-top: 300px" />
    <router-view v-else/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  // mounted() {
  //    this.getTags()
  // },
  data(){
    return{
      loading:false
    }
  },
  mounted() {
    // setTimeout(() => {
    //   // 加载完成后隐藏 loading 组件
    //   this.loading = false;
    // }, 2000); // 这里的 2000 毫秒可以根据实际情况调整，模拟数据加载时间
  },
  methods:{
    ...mapActions(['getTags'])
  }
}
</script>

<style>
.content-center{
  width: 70%;
  margin: 0 auto;
  /*box-shadow: 0px 0px 10px black;*/
}
</style>
