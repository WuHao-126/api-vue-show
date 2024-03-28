<template>
    <div style="z-index: 100;border-bottom: 1px solid #eeeeee;height: 57px">
        <div class="log" />
        <a-menu v-model="current" mode="horizontal" style="height: 49px;display: inline-block;margin-left: 20px;opacity: 1">
            <a-menu-item key="1" @click="page('/index')"> <a-icon type="home" />网站首页 </a-menu-item>
            <a-menu-item key="2" @click="page('/interface')"> <a-icon type="api" />接口商城 </a-menu-item>
            <a-menu-item key="3" @click="page('/interface/apply')"> <a-icon type="solution" />接口申请 </a-menu-item>
            <a-menu-item key="4" @click="page('/forum')"><a-icon type="mail" />开发论坛</a-menu-item>
        </a-menu>
        <div style="float: right;display: inline-block">
            <a-popover placement="bottom">
                <template slot="content" v-if="!user.userAvatar">
                    <a @click="$router.push('/login')">立即登录</a>
                </template>
                <template slot="content" v-if="user.userAvatar">
                    <a href="javascript:void(0)" @click="logout()">退出登录</a>
                </template>
              <a-badge :count="1" v-if="user.userAvatar">
                  <a-avatar  :src="$store.state.userImgUrl+user.userAvatar" shape="square" icon="user"/>
              </a-badge>
             <a-badge :count="1" v-if="!user.userAvatar">
                  <a-avatar shape="square"   icon="user"/>
              </a-badge>
            </a-popover>
        </div>
    </div>
</template>
<script>
    import {userLogout} from './api'
    export default {
        data() {
            return {
                current: ['mail'],
                user:{}
            };
        },
        mounted() {
            this.getCurrentLoginUser()
        },
        methods:{
            async getCurrentLoginUser(){
               let res= await this.$utils.getCurrentLoginUser();
               if(res!=null){
                   if(res.data.code===0){
                       //已登录
                       this.user=res.data.data
                   }else{
                       //未登录
                   }
               }
            },
            async logout(){
              let res=await userLogout()
              let flag=this.$utils.dataCheck(res,"退出成功","","")
              if(flag){
                 localStorage.removeItem("user")
                 window.sessionStorage.removeItem("user")
                  this.user={}
              }
            },
            page(url){
                if (url === this.$route.path) {
                    // 如果点击的是当前活动的路由，则刷新页面
                    this.$router.go(0);
                } else {
                    // 否则进行正常的路由跳转
                    this.$router.push(url);
                }
            },
        }
    };
</script>
<style scoped>
    .log{
        display: inline-block;
        float: left;
        line-height: 40px;
        margin-top: 10px;
        width: 60px;
        height: 40px;
        /*background-color: black;*/
        background-image: url("http://182.92.7.24:9090/api/logo.gif");
        background-size: 100% 100%;
    }
</style>