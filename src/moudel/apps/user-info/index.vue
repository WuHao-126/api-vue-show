<template>
    <div class="content-center">
        <a-card class="user-box">
                    <a-avatar :size="64" icon="user" :src="$store.state.userImgUrl+user.userAvatar"/>
                    <span class="user-name">{{user.userName}}</span>
                    <span class="user-description">{{user.description}}</span>
                    <span class="user-userAccount">账号：{{user.userAccount}}</span>
                    <span class="user-email" v-if="user.email">邮箱：{{user.email}}</span>
            <a-button class="update-user" type="primary" @click="showModal">
                修改个人信息
            </a-button>
        </a-card>
        <div>
            <a-modal
                    title="修改个人信息"
                    :visible="visible"
                    :confirm-loading="confirmLoading"
                    ok-text="确认" cancel-text="取消"
                    @ok="updateUserInfo"
                    @cancel="handleCancel"
            >
                <div>
                    <div class="clearfix">
                        <a-upload
                                name="file"
                                list-type="picture-card"
                                class="avatar-uploader"
                                :show-upload-list="false"
                                :data="uploadType"
                                action="api/upload/image"
                                :before-upload="beforeUpload"
                                @change="handleChange"
                        >
                            <img style="width: 128px;height: 128px" v-if="imageUrl" :src="imageUrl" alt="avatar" />
                            <div v-else>
                                <a-icon :type="loading ? 'loading' : 'plus'" />
                                <div class="ant-upload-text">
                                    上传头像
                                </div>
                            </div>
                        </a-upload>
                    </div>
                    <div class="user-input">
                        <span>昵称：</span>
                        <a-input  style="width: 80%" v-model="updateUserParam.userName"></a-input><br>
                    </div>
                    <div class="user-input">
                        <span>账号：</span>
                        <a-input  style="width: 80%" v-model="updateUserParam.userAccount" :disabled=true></a-input><br>
                    </div>
                    <div class="user-input">
                        <span>签名：</span>
                        <a-input  style="width: 80%" v-model="updateUserParam.description"></a-input><br>
                    </div>
                    <div class="user-input" v-if="user.email">
                        <span>邮箱：</span>
                        <a-input  style="width: 80%" v-model="updateUserParam.email" :disabled=true></a-input><br>
                    </div>
                    <div class="user-input" v-else>
                       <span>邮箱：</span>
                        <a-input style="width: 80%" v-model="emailParam.email" placeholder="还没有绑定邮箱，请绑定"></a-input>
                        <div>
                            <a-input v-model="emailParam.code" style="width: 30%;margin-left: 42px;margin-top: 20px" placeholder="验证码"></a-input>
                            <a-button @click="sendCode" :disabled="isButtonDisabled" style="margin-left: 20px">
                                {{ isButtonDisabled ? '已发送 (' + countdown + 's)' : '获取验证码' }}
                            </a-button>
                            <br>
                            <a-button type="primary" @click="emailBind" style="margin-left: 41px;width: 60%;margin-top: 20px">绑定</a-button>
                        </div>

                    </div>
                </div>
            </a-modal>
        </div>
        <a-card style="margin-top: 10px;border-radius: 15px">
            <a-tabs default-active-key="1">
                <a-tab-pane key="1">
                  <span slot="tab">
                    <a-icon type="apple" />
                    我的文章
                  </span>
                    <div>
                        <a-list item-layout="horizontal" :data-source="myBlog">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a slot="actions" @click="$router.push('/forum/update/'+item.id)">修改</a>
                                <a-popconfirm slot="actions"  title="确定要删除吗?" okText="确定" cancelText="取消"  @confirm="() =>deleteBlog(item.id)">
                                    <a>删除</a>
                                </a-popconfirm>
                                <a-list-item-meta :description="item.createtime">
                                    <a slot="title" @click="$router.push('/forum/detail/'+item.id)">{{ item.title }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="2">
                  <span slot="tab">
                    <a-icon type="android" />
                    我的收藏
                  </span>
                    <div>
                        <a-list item-layout="horizontal" :data-source="myCollect">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a-popconfirm slot="actions"  title="确定要取消吗?" okText="确定" cancelText="取消"  @confirm="() =>blogcollect(item.id)">
                                    <a>取消收藏</a>
                                </a-popconfirm>
                                <a-list-item-meta :description="item.createtime">
                                    <a slot="title" @click="$router.push('/forum/detail/'+item.id)">{{ item.title }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </div>
                </a-tab-pane>
<!--                <a-tab-pane key="3">-->
<!--                  <span slot="tab">-->
<!--                    <a-icon type="android" />-->
<!--                    我的消息-->
<!--                  </span>-->
<!--                    <div>-->
<!--                        <a-list item-layout="horizontal" :data-source="myCollect">-->
<!--                            <a-list-item slot="renderItem" slot-scope="item, index">-->
<!--                                <a-list-item-meta-->
<!--                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"-->
<!--                                >-->
<!--                                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>-->
<!--                                </a-list-item-meta>-->
<!--                            </a-list-item>-->
<!--                        </a-list>-->
<!--                    </div>-->
<!--                </a-tab-pane>-->
            </a-tabs>
        </a-card>
    </div>
</template>

<script>
    function getBase64(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    import {
        getMyBlog,
        getMyCollect,
        updateUserInfo,
    } from './api'
    import {emailBind, sendCode} from "@/moudel/apps/interface-apply/api";
    import {blogCollect, deleteBlog} from "@/moudel/apps/developer-forum/api";
    export default {
        name: "index",
        data(){
            return{
                type:"user",
                isButtonDisabled: false, // 控制按钮是否禁用
                countdown: 60, // 倒计时秒数
                user:'',
                updateUserParam:{
                    id:'',
                    userName:'',
                    userAccount:'',
                    userAvatar:'',
                    description:'',
                    email:''
                },
                loading: false,
                imageUrl: '',
                emailParam:{
                    email:'',
                    code:''
                },
                data : [
                    {
                        title: 'Ant Design Title 1',
                    },
                    {
                        title: 'Ant Design Title 2',
                    },
                    {
                        title: 'Ant Design Title 3',
                    },
                    {
                        title: 'Ant Design Title 4',
                    },
                ],
                myBlog:[],
                myCollect:[],
                visible: false,
                confirmLoading: false,
            }
        },
        mounted() {
            this.getCurrentLoginUser()
        },
        beforeCreate() {
            this.form = this.$form.createForm(this, { name: 'register' });
        },
        methods:{
            uploadType(file){
              return{
                  type: "user"
              }
            },
            async getCurrentLoginUser(){
              let res = await this.$utils.getCurrentLoginUser()
                if(res.data.code === 0){
                    this.user=res.data.data
                    this.getMyBlog()
                    this.getMyCollect()
                    this.imageUrl=this.$store.state.userImgUrl+this.user.userAvatar
                }
            },
            async getMyBlog(){
                let param ={
                    id:this.user.id
                }
                console.log(param)
                let res = await getMyBlog(param);
                if(res.data.code === 0){
                     this.myBlog=res.data.data.records
                }else{
                    this.$message.error("获取数据失败")
                }
            },
            //修改用户信息
            async updateUserInfo(){
              this.confirmLoading = true;
              let param = {
                  ...this.updateUserParam
              }
              let res = await updateUserInfo(param)
                if(res.data.code===0){
                    this.$router.go(0)
                    this.$message.success("修改成功")
                    this.visible = false;
                    this.confirmLoading = false;
                }
            },
            async getMyCollect(){
                let param ={
                    id:this.user.id
                }
                param.id=this.user.id
                let res = await getMyCollect(param);
                if(res.data.code === 0){
                    console.log(res.data.data)
                    this.myCollect=res.data.data.records
                }else{
                    this.$message.error("获取数据失败")
                }
            },
            async sendCode(){
                let email=this.emailParam.email
                if(email === null || email ==='' || email === undefined){
                    this.$message.error("请输入邮箱")
                    return
                }
                let param={
                    email:email
                }
                let res = await sendCode(param)
                if(res.data.code===0){
                    this.isButtonDisabled=true
                    this.$message.success("发送成功，验证码三分钟内有效")
                    this.countdownInterval = setInterval(() => {
                        if (this.countdown > 0) {
                            this.countdown--;
                        } else {
                            clearInterval(this.countdownInterval); // 清除定时器
                            this.isButtonDisabled = false; // 重新启用按钮
                            this.countdown = 60; // 重置倒计时秒数
                        }
                    }, 1000);
                }else if(res.data.code === 4104){
                    this.$message.error("此邮箱已注册")
                }else if(res.data.code === 40000){
                    this.$message.error("请填写邮箱")
                }
            },
            async emailBind(){
                let param={
                    ...this.emailParam
                }
                let res = await emailBind(param);
                if(res.data.code === 0){
                    this.$message.success("绑定成功")
                    // this.current+=1;
                    this.emailButton=false;
                    this.$router.go(0)
                }
            },
            async deleteBlog(id){
                let param={
                    id:id
                }
                let res = await deleteBlog(param)
                if(res.data.code===0){
                    this.$message.success("删除博客成功")
                    this.getMyBlog();
                }else{
                    this.$message.error(res.data.message)
                }
            },
            async blogcollect(id){
                let param={
                    id:id
                }
                let res=await blogCollect(param)
                if(res.data.code===0){
                    this.$message.success("取消收藏成功");
                    this.getMyCollect()
                }else{
                    this.$message.error(res.data.message)
                }

            },
            showModal() {
                let param={
                    ...this.user
                }
                this.updateUserParam.id=param.id
                this.updateUserParam.userName=param.userName
                this.updateUserParam.userAvatar=param.userAvatar
                this.updateUserParam.description=param.description
                this.updateUserParam.email=param.email
                this.updateUserParam.userAccount=param.userAccount
                this.visible = true;
            },
            handleOk(e) {
                this.ModalText = 'The modal will be closed after two seconds';
                setTimeout(() => {
                    this.visible = false;
                    this.confirmLoading = false;
                }, 2000);
            },
            handleCancel(e) {
                this.visible = false;
            },
            handleChange(info) {
                this.updateUserParam.userAvatar=info.file.response.data
                if (info.file.status === 'uploading') {
                    this.loading = true;
                    return;
                }
                if (info.file.status === 'done') {
                    // Get this url from response in real world.
                    getBase64(info.file.originFileObj, imageUrl => {
                        this.imageUrl = imageUrl;
                        this.loading = false;
                    });
                }
            },
            beforeUpload(file) {
                const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isJpgOrPng) {
                    this.$message.error('请上传图片格式的文件');
                }
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                    this.$message.error('文件大小需小于 5MB!');
                }
                return isJpgOrPng && isLt2M;
            },
        }
    }
</script>

<style scoped>
  .user-box{
      position: relative;
      border-radius: 15px;
      padding: 20px;
      background-image: url("http://101.126.87.57:9090/api/667-1200x300.jpg");
      background-size: 100% 100%;
  }
    .user-name{
        position: absolute;
        top: 50px;
        left: 130px;
        font-size: 19px;
        font-weight: 800;
        color: white;
    }
    .user-description{
        position: absolute;
        top: 85px;
        left: 130px;
        color: white;
    }
    .user-userAccount{
        position: absolute;
        bottom:10px;
        left: 50px;
        font-size: 14px;
        color: white;
    }
    .user-email{
        position: absolute;
        bottom:10px;
        left: 200px;
        font-size: 14px;
        color: white;
    }
    .update-user{
        position: absolute;
        top: 75px;
        right: 20px;
    }
    .clearfix{
        margin-top: 20px;
        margin-left: 40px;
    }
    .user-input{
        margin-top: 20px;
    }
</style>