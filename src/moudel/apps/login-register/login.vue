<template>
        <div class="box">
            <div class="gradient-border"/>
            <div class="content">
                <div>
                    <span class="title">API-接口开放平台</span>
                </div>
                <div style="text-align: center;margin-top: 10px">
                    <a-tabs default-active-key="1" @change="callback">
                        <a-tab-pane key="1" tab="账号登录">
                            <div class="login-account">
                                <div class="components-input-demo-presuffix">
                                    <a-input class="input" size="large" v-model="loginRequest.userAccount" ref="userNameInput" placeholder="请输入账号">
                                        <a-icon slot="prefix" type="user" />
                                    </a-input>
                                    <a-input-password class="input" v-model="loginRequest.userPassword" size="large" placeholder="请输入密码">
                                        <a-icon slot="prefix" type="lock" />
                                    </a-input-password>
                                </div>
                            </div>
                            <div style="width:80%;margin: 10px auto;display: flex;justify-content: space-between;">
                                <a-checkbox style="" @change="onChange">
                                    自动登录
                                </a-checkbox>
                                <a style="text-align: right" href="javascript:void(0)" @click="recoverPassword">忘记密码？点击找回</a>
                            </div>
                            <a-button @click="login" style="width: 80%;margin-top: 10px;height: 45px" type="primary">
                                登录
                            </a-button>
                            <div style="width:80%;margin: 30px auto;text-align: left;font-size: 16px">
                                <span style="float: right"> <a style="font-size: 14px" href="javascript:void(0)" @click="skip">还没有账号？点击注册</a></span>
                                <span>其他登录方式：</span>
                                <a-icon style="margin-left: 5px;font-size:18px" type="qq" />
                                <a-icon style="margin-left: 5px;font-size:18px" type="wechat" />
                                <a-icon style="margin-left: 5px;font-size:18px" type="alipay-circle" theme="filled" />
                            </div>
                        </a-tab-pane>
                        <a-tab-pane key="2" tab="邮箱登录" force-render>
                            <div class="login-email">
                                <div class="components-input-demo-presuffix">
                                    <a-input class="input" v-model="loginRequest.email" size="large" ref="userNameInput" placeholder="请输入邮箱">
                                        <a-icon slot="prefix" type="mail" />
                                    </a-input>
                                    <a-input-password class="input" v-model="loginRequest.userPassword" size="large" placeholder="请输入密码">
                                        <a-icon slot="prefix" type="lock" />
                                    </a-input-password>
                                </div>
                            </div>
                            <div style="width:80%;margin: 10px auto;display: flex;justify-content: space-between;">
                                <a-checkbox style="" @change="onChange">
                                    自动登录
                                </a-checkbox>
                                <a style="text-align: right" href="javascript:void(0)" @click="skip">还没有账号？点击注册</a>
                            </div>
                            <a-button  @click="login" style="width: 80%;margin-top: 20px;height: 45px" type="primary">
                                登录
                            </a-button>
                            <div style="width:80%;margin: 50px auto;text-align: left;font-size: 16px">
                                <span>其他登录方式：</span>
                                <a-icon style="margin-left: 5px;font-size:18px" type="qq" />
                                <a-icon style="margin-left: 5px;font-size:18px" type="wechat" />
                                <a-icon style="margin-left: 5px;font-size:18px" type="alipay-circle" theme="filled" />
                            </div>
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </div>
        </div>
</template>

<script>
    import {login} from './api'
    export default {
        name: "index",
        data(){
            return{
                checked:false,
                loginRequest:{}
            }
        },
        mounted() {
            // document.addEventListener('keydown', this.handleKeyPress);
        },
        methods:{
            skip(){
                this.$router.push('/register')
            },
            onChange(e) {
                this.checked = e.target.checked;
            },
            callback(){
                this.loginRequest={}
            },
            recoverPassword(){
              this.$message.error("此功能正在实现，请耐心等待")
            },
            async login(){
               let param={
                   ...this.loginRequest
               }
               let res=await login(param)
               // let flag=this.$utils.dataCheck(res,"登录成功",null,"/")
                if(res.data.code===0){
                    let token=res.data.data.token
                    // if(this.checked){
                  if(true){
                        localStorage.setItem("token",token)
                    }else{
                        window.sessionStorage.setItem("token",token)
                    }
                    this.$utils.routerPush('/')
                }else{
                    this.$message.error(res.data.message)
                }
            },
            handleKeyPress(event) {
                // 监听键盘事件，按下 "Enter" 键时触发登录按钮的点击事件
                if (event.key === 'Enter') {
                    this.login();
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
        width: 100%;
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
        background-image: url("../../../assets/loginbg.png");
        background-size: 100% 100%;
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