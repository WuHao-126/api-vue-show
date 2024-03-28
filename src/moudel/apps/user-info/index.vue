<template>
    <div class="content-center">
        <div class="user-box">
            <a-avatar :size="64" icon="user" :src="$store.state.userImgUrl+user.userAvatar"/>
            <br>
            <a-descriptions :title="user.userName" style="margin-top: 10px">
                <a-descriptions-item label="账号">
                    {{user.userAccount}}
                </a-descriptions-item>
                <a-descriptions-item label="邮箱">
                    {{user.email}}
                </a-descriptions-item>
                <a-descriptions-item label="Remark">
                    empty
                </a-descriptions-item>
                <a-descriptions-item label="个性签名">
                    {{user.description}}
                </a-descriptions-item>
            </a-descriptions>
        </div>
        <div>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1">
                  <span slot="tab">
                    <a-icon type="apple" />
                    我的文章
                  </span>
                    <div>
                        <a-list item-layout="horizontal" :data-source="myBlog">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a-list-item-meta
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                >
                                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
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
                                <a-list-item-meta
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                >
                                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </div>
                </a-tab-pane>
                <a-tab-pane key="3">
                  <span slot="tab">
                    <a-icon type="android" />
                    我的消息
                  </span>
                    <div>
                        <a-list item-layout="horizontal" :data-source="myCollect">
                            <a-list-item slot="renderItem" slot-scope="item, index">
                                <a-list-item-meta
                                        description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                                >
                                    <a slot="title" href="https://www.antdv.com/">{{ item.title }}</a>
                                </a-list-item-meta>
                            </a-list-item>
                        </a-list>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script>
    import {
        getMyBlog,
        getMyCollect
    } from './api'
    export default {
        name: "index",
        data(){
            return{
                user:'',
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
                myCollect:[]
            }
        },
        mounted() {
            this.getCurrentLoginUser()
            this.getMyBlog()
            this.getMyCollect()
        },
        methods:{
            async getCurrentLoginUser(){
              let res = await this.$utils.getCurrentLoginUser()
                if(res.data.code === 0){
                    this.user=res.data.data
                }
            },
            async getMyBlog(){
                console.log(this.user.id)
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
            async getMyCollect(){
                let param ={
                    id:this.user.id
                }
                let res = await getMyCollect(param);
                if(res.data.code === 0){
                    this.myBlog=res.data.data.records
                }else{
                    this.$message.error("获取数据失败")
                }
            }
        }
    }
</script>

<style scoped>
  .user-box{
      padding: 20px;
      background-color: whitesmoke;
  }
</style>