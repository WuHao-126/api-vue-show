<template>
    <div style="z-index: 100;border-bottom: 1px solid #eeeeee;height: 57px">
        <div class="log" />
        <a-menu v-model="current" mode="horizontal" style="height: 49px;display: inline-block;margin-left: 20px;opacity: 1">
            <a-menu-item key="1" @click="page('/index')"> <a-icon type="home" />网站首页 </a-menu-item>
            <a-menu-item key="2" @click="page('/interface')"> <a-icon type="api" />接口商城 </a-menu-item>
            <a-menu-item key="3" @click="page('/interface/apply')"> <a-icon type="solution" />开源项目</a-menu-item>
            <a-menu-item key="4" @click="page('/forum')"><a-icon type="mail" />开发论坛</a-menu-item>
        </a-menu>
        <div style="float: right;display: inline-block">
            <a-popover placement="bottom">
                <template slot="content" v-if="!user.userAvatar">
                    <a @click="$router.push('/login')">立即登录</a>
                </template>
                <template slot="content" v-if="user.userAvatar">

                </template>
                <template slot="content" v-if="user.userAvatar">
                    <div>
                        <a href="javascript:void(0)" @click="$router.push('/user/detail/'+ user.id)">我的主页</a><br>
                    </div>
                  <div style="margin-top: 10px">
                    <a href="javascript:void(0)" @click="clock('/clock/'+user.id)">我的打卡</a><br>
                  </div>
                    <div style="margin-top: 10px">
                        <a href="javascript:void(0)" @click="applyKey">我的密钥</a><br>
                    </div>
                    <div style="margin-top: 10px">
                        <a href="javascript:void(0)" @click="logout()">退出登录</a><br>
                    </div>

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
    import {
        userLogout,
        getNotice
    } from './api'
    export default {
        data() {
            return {
                current: ['mail'],
                user:{},
                notice:''
            };
        },
        mounted() {
            this.getCurrentLoginUser()
            this.getNotice()
        },
        methods:{
            clock(url){
              if (url === this.$route.path) {
                // 如果点击的是当前活动的路由，则刷新页面
                this.$router.go(0);
              } else {
                // 否则进行正常的路由跳转
                this.$router.push(url);
              }
            },
            async getCurrentLoginUser(){
               let res= await this.$utils.getCurrentLoginUser();
               if(res!=null){
                   if(res.data.code===0){
                       //已登录
                       this.user=res.data.data
                   }else{
                       //未登录
                       this.$message.error(res.data.message)
                   }
               }
            },
            async logout(){
              let res=await userLogout()
              let flag=this.$utils.dataCheck(res,"退出成功","","")
              if(flag){
                 localStorage.removeItem("token")
                 window.sessionStorage.removeItem("token")
                 this.user={}
                 this.$router.go(0)
              }
            },
            async getNotice(){
                let res=await getNotice();
                if(res.data.code===0){
                    this.notice=res.data.data
                    this.openNotification()
                }
            },
            async applyKey(){
                let res=await this.$utils.getCurrentLoginUser();
                if(res===null){
                    this.$message.error("请先登录")
                    this.$router.push("/login")
                    return
                }
                let user = res.data.data
                if (user.isExistKey){
                    this.$store.commit("updateApplyCurrent",2)
                }else if (user.email === null || user.email ===''){
                    this.$store.commit("updateApplyCurrent",0)
                }else{
                    this.$store.commit("updateApplyCurrent",1)
                }
                if (this.$route.path === "/interface/apply/key"){

                }else{
                    this.$router.push("/interface/apply/key")
                }

            },
            openNotification() {
                this.$notification.open({
                    message: '今日公告',
                    description:this.notice,
                    onClick: () => {
                        console.log('Notification Clicked!');
                    },
                });
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
        background-image: url("http://101.126.87.57:9090/api/logo.gif");
        background-size: 100% 100%;
    }
</style>