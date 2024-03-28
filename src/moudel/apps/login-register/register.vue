<template>
    <div>
        <div class="box">
            <div class="gradient-border"/>
            <div class="content">
                <div>
                    <span class="title">API-接口开放平台</span>
                </div>
                <div style="text-align: center;margin-top: 10px">
                    <a-tabs default-active-key="1">
                        <a-tab-pane key="1" tab="账号注册">
                            <div class="login-account">
                                <div class="components-input-demo-presuffix">
                                    <a-input class="input" size="large" v-model="userRegisterRequest.userName" placeholder="请输入昵称">
                                        <a-icon slot="prefix" type="idcard" />
                                    </a-input>
                                    <a-input class="input" size="large" v-model="userRegisterRequest.userAccount"  placeholder="请输入账号">
                                        <a-icon slot="prefix" type="user" />
                                    </a-input>
                                    <a-input-password class="input" size="large" v-model="userRegisterRequest.userPassword" placeholder="请输入密码">
                                        <a-icon slot="prefix" type="lock" />
                                    </a-input-password>
                                    <a-input-password class="input" size="large" v-model="userRegisterRequest.checkPassword" placeholder="请确认密码">
                                        <a-icon slot="prefix" type="lock" />
                                    </a-input-password>
                                </div>
                            </div>
                            <div style="width:80%;margin: 10px auto;text-align: right;">
                                <a style="text-align: right" href="javascript:void(0)" @click="skip">已注册账号？点击登录</a>
                            </div>
                            <a-button style="width: 80%;margin-top: 10px;height: 45px" @click="register" type="primary">
                                注册
                            </a-button>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="邮箱注册" force-render>
                            <div class="login-email">
                                <div class="components-input-demo-presuffix">
                                    <a-input class="input" size="large" ref="userNameInput" placeholder="请输入邮箱">
                                        <a-icon slot="prefix" type="mail" />
                                    </a-input>
                                    <a-input-password class="input" size="large" placeholder="请输入密码">
                                        <a-icon slot="prefix" type="lock" />
                                    </a-input-password>
                                </div>
                            </div>
                            <a-button style="width: 80%;margin-top: 20px;height: 45px" type="primary">
                                登录
                            </a-button>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {register} from './api'
    export default {
        name: "index",
        data(){
            return{
                userRegisterRequest:{
                    userName:'',
                    userAccount:'',
                    userPassword:'',
                    checkPassword:''
                }
            }
        },
        mounted() {
            document.addEventListener('keydown', this.handleKeyPress);
        },
        methods:{
            skip(){
                this.$router.push('/login')
            },
            async register(){
              let param ={
                  ...this.userRegisterRequest
              }
              let res= await register(param);
              if(res.data.code===0){
                  this.$message.success("注册成功")
                  document.removeEventListener("keydown")
                  this.$router.push('/login')
              }else{
                  this.$message.error("注册失败")
              }
            },
            handleKeyPress(event) {
                // 监听键盘事件，按下 "Enter" 键时触发登录按钮的点击事件
                if (event.key === 'Enter') {
                    this.register();
                }
            }
        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    body,html{
        height: 100%;
    }
    .gradient-border {
        position: absolute;
        margin:  100px auto;
        left: 665px;
        width: 500px;
        height: 520px;
        background: linear-gradient(90deg, #44ff9a -.55%, #44b0ff 22.86%, #8b44ff 48.36%, #f64 73.33%, #ebff70 99.34%);
        overflow: hidden;
        filter: blur(20px);
    }
    .content{
        position: absolute;
        top:100px;
        left: 660px;
        width: 510px;
        height: 520px;
        background-color: white;
        border-radius: 20px;
        padding: 20px;
        text-align: center;
    }
    .box{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .title{
        font-size: 35px;
        font-weight: 800;
        color: black;
    }
    .input{
        width: 80%;
        margin-top: 20px;
    }
</style>