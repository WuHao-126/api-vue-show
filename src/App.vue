<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',

  data(){
    return{
    }
  },
  mounted() {
  },
  methods:{

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
