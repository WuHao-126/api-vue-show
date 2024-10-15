<template>
    <div class="content-center">
        <div class="content" :style="{ background: '#fff', padding: '10px', minHeight: '800px' }">
            <div class="header" >
                <a-input-search
                        v-model="requestParam.title"
                        placeholder="请输入您所需要的内容"
                        enter-button
                        size="large"
                        @search="onSearch"
                />
                <a-layout-header style="height: 40px;background-color: white;width: auto;padding: 0">
                    <a-menu
                            theme="light"
                            mode="horizontal"
                            style="margin-top: 10px;background-color: white;"
                    >
                        <a-menu-item @click="newBlog" class="tag">
                            最新
                        </a-menu-item >
                        <a-menu-item  class="tag">
                            最热
                        </a-menu-item >
                        <a-menu-item @click="tagSearch(item)" class="tag" v-for="(item,index) in tags" :key="index">
                            {{item.name}}
                        </a-menu-item >
                    </a-menu>
                </a-layout-header>
            </div>
            <a-list  item-layout="vertical" :loading=loading size="large"  :data-source="blogList">
                <div slot="footer"><b>API接口开放平台</b></div>
                <a-list-item slot="renderItem" key="item.title" slot-scope="item, index">
                    <template  slot="actions">
                        <span>
                            {{item.createtime}}
                        </span>
                        <span @click="blogcollect(item.id,index)">
                            <a-icon type="star-o" v-if="!item.isNoCollect" style="margin-right: 8px" />
                            <a-icon type="star" v-if="item.isNoCollect" style="margin-right: 8px;color: orange" theme="filled" />
                          {{item.collectNum}}
                        </span>
                        <span @click="bloglike(item.id,index)">
                           <a-icon  v-if="!item.isNoLike" type="like-o" style="margin-right: 8px" />
                           <a-icon  type="like" v-if="item.isNoLike" theme="filled" style="margin-right: 8px;color: red"/>
                          {{item.likeNum}}
                        </span>
                        <span>
                          <a-icon type="message" style="margin-right: 8px" />
                          {{item.messageNum}}
                        </span>
                        <a-popconfirm v-if="user.id === item.authorid"  title="确定要删除吗?" okText="确定" cancelText="取消"  @confirm="() =>deleteBlog(item.id)">
                            <span>删除</span>
                        </a-popconfirm>
                        <span v-if="user.id === item.authorid" @click="$router.push('/forum/update/'+item.id)">
                          修改
                        </span>
                    </template>
                    <img
                            slot="extra"
                            width="272"
                            height="172px"
                            alt="logo"
                            v-if="item.cover"
                            :src="$store.state.blogImgUrl+item.cover"
                    />
                    <a-list-item-meta  style="font-weight: 800;font-size: 60px">
                        <a slot="title">{{ item.authorname }}</a>
                        <a-avatar v-if="item.authoravatar" shape="square" :size="40" slot="avatar" :src="$store.state.userImgUrl+item.authoravatar" />
                    </a-list-item-meta>
                    <a class="blog-title" @click="$router.push('/forum/detail/'+item.id)" href="javascript:void(0)">{{item.title}}</a><br>
                    <p class="blog-content" v-html="getIntroduction(item.content)"></p>
                    <div>
                        <a-tag :color="color[index]" v-for="(item,index) in item.tag" :key="index">
                            {{item}}
                        </a-tag>
                    </div>
                </a-list-item>
            </a-list>
            <div style="text-align: right">
                <a-pagination :default-current="1" :total=total @change="pageMethod"/>
            </div>
        </div>
        <div class="side">
            <a-card hoverable style="width: 100%">
                <img
                        style="height: 150px"
                        slot="cover"
                        alt="example"
                        src="../../../assets/advertisement.png"
                />
                <template v-if="user!==''" slot="actions" class="ant-card-actions">
                    <a-icon key="setting" type="home" @click="$router.push('/user/detail/'+user.id)"/>
                    <a-icon key="edit" type="edit" @click="$router.push('/forum/write')" />
                    <a-icon key="ellipsis" type="ellipsis" />
                </template>
                <a-card-meta v-if="user.userName" :title="user.userName" :description="user.description">
                    <a-avatar
                            slot="avatar"
                            :src="$store.state.userImgUrl+user.userAvatar"
                    />
                </a-card-meta>
            </a-card>
            <div class="hot-blog" >
                <div class="hot-blog-header" >
                    🔥 热门文章
                </div>
              <a-list size="small"  :data-source="hotBlogList">
                <a-list-item slot="renderItem" slot-scope="item, index">
                  <a class="hot-blog-title"  @click="$router.push('/forum/detail/'+item.blogId)" href="javascript:void(0)">
<!--                    <span style="color: black;margin-right: 5px">{{index+1+""}}</span>-->
                    {{ item.title }}
                  </a>
                  <span style="margin-right: 10px"><a-icon type="fire" />{{item.likeCount}}</span>
                </a-list-item>
              </a-list>
            </div>
          <div class="hot-user" >
            <div class="hot-user-header" >
              🔥 用户活跃表
            </div>
            <a-list size="small"  :data-source="hotUserList">
              <a-list-item slot="renderItem" slot-scope="item, index">
                <a class="hot-user-title"  @click="" href="javascript:void(0)">
                  <!--                    <span style="color: black;margin-right: 5px">{{index+1+""}}</span>-->
                  {{ item.username }}
                </a>
                <span style="margin-right: 10px"><a-icon type="fire" />{{item.writeCount}}</span>
              </a-list-item>
            </a-list>
          </div>
          <a-card hoverable style="width: 100%;margin-top: 30px">
            <a-row>
              <a-col :span="24">
                <a-icon type="crown" />
                <span style="margin-left: 5px">站长：聪明的小猫猫</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-icon type="mail" />
                <span style="margin-left: 5px">邮箱：1345498749@qq.com</span>
              </a-col>
            </a-row>
            <a-row>
              <a-col :span="24">
                <a-icon type="github" />
                <span style="margin-left: 5px">github：<a href="https://github.com/WuHao-126/api-project">仓库地址</a></span>
              </a-col>
            </a-row>
          </a-card>
        </div>
    </div>
</template>
<script>
    import {
        getBlogList,
        getBlogTagList,
        blogLike,
        blogCollect,
        deleteBlog,
        getHotBlog,
        getHotUser
    } from './api'
    import MarkdownIt from 'markdown-it';
    export default {
        data() {
            return {
                url:'http://localhost:9000/api/user/',
                pagination: {
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 10,
                },
                actions: [
                    { type: 'star-o', text: '156' },
                    { type: 'like-o', text: '156' },
                    { type: 'message', text: '2' },
                ],
                requestParam:{
                  title:'',
                  tag:'',
                  current:1,
                  pageSize:10
                },
                // total:'',
                loading:true,
                blogList:[],
                hotBlogList:[],
                hotUserList:[],
                color:["#f50","#2db7f5","#87d068","#108ee9","#F56C6C","#909399","#CC901F","#C731E6","#E631B9","#EE1245"],
                user:'',
                tags:{},
                total:0
            };
        },
        mounted() {
            this.getBlogList();
            this.getCurrentLoginUser();
            this.getBlogTagList();
            this.getHotBlog();
            this.getHotUser();
        },
        methods:{
          pageMethod(page){
                this.requestParam.current=page
                this.getBlogList()
            },
            async getHotBlog(){
              let res = await getHotBlog()
              if(res.data.code===0){
                this.hotBlogList=res.data.data
              }else{
                this.$message.error("获取热门文章列表失败")
              }
            },
          async getHotUser(){
            let res = await getHotUser()
            if(res.data.code===0){
              this.hotUserList=res.data.data
            }else{
              this.$message.error("获取热门文章列表失败")
            }
          },
            async getBlogList(){
                this.loading=true
                let param={
                    ...this.requestParam
                }
                let res=await getBlogList(param);
                const {records,total} =res.data.data
                this.blogList=records
                this.total=total
                for (let i = 0; i < this.blogList.length; i++) {
                    this.blogList[i].tag=JSON.parse(this.blogList[i].tag)
                }
                this.loading=false
            },
            async blogcollect(id,index){
                let newData=[...this.blogList]
                let param={
                    id:id
                }
                let res=await blogCollect(param)
                if(res.data.code===0){
                    let num = res.data.data
                    newData[index].collectNum+=num
                    if(num<0){
                        newData[index].isNoCollect=false
                    }else{
                        newData[index].isNoCollect=true
                    }
                }else{
                    this.$message.error(res.data.message)
                }
                this.blogList=newData
            },
            async bloglike(id,index){
              let newData=[...this.blogList]
              let param={
                  id:id
              }
              let res=await blogLike(param)
              if(res.data.code===0){
                 let num = res.data.data
                 newData[index].likeNum+=num
                  if(num<0){
                      newData[index].isNoLike=false
                  }else{
                      newData[index].isNoLike=true
                  }
              }else{
                  this.$message.error(res.data.message)
              }
              this.blogList=newData
            },
            newBlog(){
              this.requestParam.tag='',
              this.requestParam.title=''
              this.getBlogList()
            },
            onSearch(){
                this.getBlogList();
            },
            tagSearch(item){
                this.requestParam.tag=item.name
                this.getBlogList()
            },
            async getCurrentLoginUser(){
              let res=await this.$utils.getCurrentLoginUser();
              if(res){
                  this.user=res.data.data
              }
            },
            async getBlogTagList(){
                let res= await getBlogTagList()
                this.tags=res.data.data
            },
            //md格式
            getIntroduction(content) {
                // 获取 Markdown 文本的前 100 个字符作为简介
                const md = new MarkdownIt();
                const tokens = md.parse(content, {}); // 解析 Markdown 文本
                let introText = '';

                // 获取 Markdown 文本的前 100 个字符作为简介
                for (const token of tokens) {
                    if (token.type === 'inline') {
                        introText += token.children.reduce((text, child) => text + child.content, '');
                    }
                    if (introText.length >= 300) {
                        break;
                    }
                }

                return introText.length > 300 ? introText.substring(0, 300) + '...' : introText;
            },
            async deleteBlog(id){
                let param={
                    id:id
                }
                let res = await deleteBlog(param)
                if(res.data.code===0){
                    this.$message.success("删除成功")
                    this.getBlogList()
                }
            }
        }
    };
</script>
<style scoped>
    .header{
        display: inline-block;
        width: 100%;
        height: 120px;
    }
    .content{
        display: inline-block;
        width: 80%;
    }
    .side{
        margin-top: 10px;
        display: inline-block;
        width: 20%;
        height: auto;
        min-height: 300px;
        float: right;
    }
    .tag{
        height: 40px;
        line-height: 40px;
        background-color: whitesmoke;
        margin-left: 2px;
    }
    .blog-title{
        font-size: 20px;
        color: black;
        font-weight: 800
    }
    .blog-title:hover{
        color: #44b0ff;
    }
    .blog-content{
        margin-top: 10px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 3; /* 显示三行，后面省略 */
        word-break: break-all;
        word-wrap: break-word;
        overflow: hidden;
    }
    .hot-blog{
        width: 100%;
        height: auto;
        margin-top: 20px;
        background-color: white;
        box-sizing: border-box;
        border: 1px solid #eeeeee;
        border-radius: 10px;
        overflow: hidden;
    }
    .hot-blog-header{
      height: 40px;
      width: 100%;
      padding: 5px 10px;
      font-size: 16px;
      background-image: linear-gradient(to bottom, #409EFF, #F2F6FC);
    }
    .hot-blog-title{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      width: 75%;
      height: 20px;
      margin-left: 15px;
      color: black;
    }
    .hot-blog-title:hover{
      color: #409EFF;
    }
    .hot-user{
      width: 100%;
      height: auto;
      margin-top: 20px;
      background-color: white;
      box-sizing: border-box;
      border: 1px solid #eeeeee;
      border-radius: 10px;
      overflow: hidden;
    }
    .hot-user-header{
      height: 40px;
      width: 100%;
      padding: 5px 10px;
      font-size: 16px;
      background-image: linear-gradient(to bottom, #F56C6C, #F2F6FC);
    }
    .hot-user-title{
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      display: block;
      width: 75%;
      height: 20px;
      margin-left: 15px;
      color: black;
    }
    .hot-user-title:hover{
      color: #409EFF;
    }
</style>