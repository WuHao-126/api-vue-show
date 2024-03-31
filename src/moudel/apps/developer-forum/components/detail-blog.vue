<template>
    <div class="content-center">
        <div>
            <div class="user-content">
                <a-avatar :src="$store.state.userImgUrl+blog.authoravatar" :size="60" icon="user" />
                <span style="font-size: 16px;margin-left: 20px;color: black">{{blog.authorname}}</span><br>
                <h1>{{blog.title}}</h1>
            </div>
            <div>
                <mavon-editor class="markdown"
                              v-model="blog.content"
                              :toolbarsFlag=false
                              :subfield=false
                              defaultOpen="preview"
                              :boxShadow="false"
                              style="z-index:0"
                ></mavon-editor>
            </div>
            <a-card class="user-comment" title="评论区" style="min-height: 200px;border-radius: 15px">
                <div>
                    <div>
                        <a-avatar
                                :size=38
                                :src="$store.state.userImgUrl+currentUser.userAvatar"
                                shape="square"
                        />
                        <a-input-search
                                :disabled="flag"
                                :placeholder="inputPlaceholder"
                                enter-button="评论"
                                size="large"
                                style="width: 95%;margin-left: 20px"
                                v-model="comment.commentContent"
                                @search="submitComment"
                        />
                    </div>
                    <!--                评论列表-->
                    <div class="comment-list" v-for="(item,index) in comments" :key="index">
                        <div class="comment-content">
                            <a-avatar
                                    slot="avatar"
                                    :size=45
                                    :src="$store.state.userImgUrl+item.userAvatar"
                                    alt="Han Solo"
                            />
                            <span style="margin-left: 10px;font-size: 16px;font-weight: 800">{{item.userName}}</span>
                            <p>
                                {{item.commentContent}}
                            </p>
                            <div>
                                <span>{{item.createTime}}</span>
                                <a style="margin-left: 20px;color: #44b0ff" @click="reply(item.id,item.userName)">回复</a>
                                <a v-if="item.userId===currentUser.id" @click="deleteComment(item.id)" style="margin-left: 20px;color: #44b0ff;">删除</a>
                            </div>
                            <!--                        子评论列表-->
                            <div class="comment-content-child" v-for="(child,index) in item.childCommentList" :key="index">
                                <a-avatar
                                        slot="avatar"
                                        :size=35
                                        :src="$store.state.userImgUrl+child.userAvatar"
                                        alt="Han Solo"
                                />
                                <span style="margin-left: 10px">{{child.userName}}</span>
                                <p>
                                    {{child.commentContent}}
                                </p>
                                <span>2023-16-17</span>
<!--                                <a style="margin-left: 20px;color: #44b0ff" @click="reply(item.id,child.userName)">回复</a>-->
                                <a style="margin-left: 20px;color: #44b0ff" @click="deleteComment(child.id)">删除</a>
                            </div>
                            <div style="width: 90%;margin: 20px auto" v-if="showReply[item.id]">
                                <a-avatar
                                        :size=38
                                        :src="$store.state.userImgUrl+currentUser.userAvatar"
                                        shape="square"
                                />
                                <a-input-search
                                        :disabled="flag"
                                        :placeholder="childInputPlaceholder"
                                        v-model="comment.commentContent"
                                        enter-button="评论"
                                        size="large"
                                        style="width: 90%;margin-left: 20px"
                                        @search="submitCommentChild(item.id,index)"
                                />
                            </div>
                        </div>
                        <a-divider orientation="right" style="font-size: 4px">
                            API
                        </a-divider>
                    </div>
                </div>
            </a-card>
        </div>
    </div>

</template>

<script>
    import {
        getBlogDetailInfo,
        insertComment,
        getCommentListByAuthorId,
        deleteComment
    } from '../api'
    export default {
        name: "detail-blog",
        data(){
            return{
                current: 0,
                preview:'preview',
                blog:{},
                comments: [],
                inputPlaceholder:'请先登录',
                childInputPlaceholder:'',
                flag:true,
                comment:{
                    articleId:'',
                    commentContent:'',
                    replyId:'',
                    parentId:'',
                    level:''
                },
                showReply:{},
                index:'',
                currentUser:''
            }
        },
        mounted() {
            this.getBlogDetailInfo();
            this.getCurrentLoginUser();
            this.getCommentListByAuthorId()
        },
        methods:{
            async getBlogDetailInfo(){
               let id=this.$route.params.id
                let res=await getBlogDetailInfo(id)
                if(res.data.code===0){
                   this.blog=res.data.data
                }
            },
            async getCommentListByAuthorId(){
                let id=this.$route.params.id
                let res=await getCommentListByAuthorId(id)
                if(res.data.code===0){
                    this.comments=res.data.data
                }
            },
            async getCurrentLoginUser(){
                let res= await this.$utils.getCurrentLoginUser();
                if(res!=null){
                    this.currentUser=res.data.data
                    this.inputPlaceholder="请输入评论"
                    this.flag=false
                }
            },
            async submitComment(){
               this.comment.articleId=this.$route.params.id
               this.comment.level=0
               this.comment.parentId=0
               this.comment.replyId=0
               let param={
                   ...this.comment
               }
               let res=await insertComment(param)
               if(res.data.code===0){
                   this.comment={}
                   this.getCommentListByAuthorId();
                   this.$message.success("评论成功")
               }
            },
            reply(id,name){
                this.$set(this.showReply, id, !this.showReply[id]);
                this.index=id
                this.childInputPlaceholder='回复：'+name
                for (const id in this.showReply) {
                    if (id !== id) {
                        this.$set(this.showReply, id, false);
                    }
                }
            },
            async submitCommentChild(parentId,replyId,userName){
                console.log(userName)
                this.comment.articleId=this.$route.params.id
                this.comment.level=1
                this.comment.parentId=parentId
                this.comment.replyId=replyId
                let param={
                    ...this.comment
                }
                let res=await insertComment(param)
                if(res.data.code===0){
                    this.$message.success("评论成功")
                    this.getCommentListByAuthorId();
                    this.comment={}
                }
            },
            async deleteComment(id){
                let param={
                    id:id
                }
                let res = await deleteComment(param)
                if(res.data.code===0){
                    this.$message.success("删除成功")
                    this.getCommentListByAuthorId();
                }else{
                    this.$message.error(res.data.message)
                }

            }
        }
    }
</script>

<style scoped>
.user-content{
    position: relative;
    padding: 10px;
    border: 1px solid whitesmoke;
}
    .user-comment{
        margin-top: 20px;
    }
    .comment-list{
        margin: 30px auto;
        width: 95%;;
        position: relative;
    }
    .comment-content{
        /*padding: 5px;*/
    }
    .comment-content-child{
        width: 95%;
        margin-left: 60px;
        margin-top: 5px;
    }
    p{
        width: 100%;
        text-indent: 60px;
        font-size: 16px;
    }
</style>