import request from "axios";
//写博客
export const insertBlog = (param) =>{
    return request.post("/api/blog/insert",param)
}
//博客列表
export const getBlogList = (param)=>{
    return request.post("/api/blog/page",param)
}
//标签
export const getBlogTagList = ()=>{
    return request.get("/api/blog/tag")
}
//获取博客详细信息
export const getBlogDetailInfo = (param) =>{
    return request.get("/api/blog/get/"+param)
}
//添加评论
export const insertComment = (param) =>{
    return request.post("/api/blog/insert/comment",param)
}
//删除评论
export const deleteComment = (param) =>{
    return request.post("/api/blog/delete/comment",param)
}
//根据文章ID获取评论列表
export const getCommentListByAuthorId = (param) =>{
    return request.get("/api/blog/comment/list/"+param)
}
//给博客点赞
export const blogLike = (param) => {
    return request.post("/api/blog/like",param)
}
//收藏博客
export const blogCollect = (param) => {
    return request.post("/api/blog/collect",param)
}
//删除博客
export const deleteBlog = (param) => {
    return request.post("/api/blog/delete",param)
}
//修改博客
export const updateBlog = (param) => {
    return request.post("/api/blog/update",param)
}
//修改博客
export const getHotBlog = () => {
    return request.get("/api/blog/hot/blog")
}
export const getHotUser = () => {
    return request.get("/api/blog/hot/user")
}