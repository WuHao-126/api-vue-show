import request from "axios";

/**
 * 获取我的博客
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getMyBlog = (param)=>{
    return request.post("/api/blog/my",param)
}
/**
 * 获取我的收藏
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getMyCollect = (param) =>{
    return request.post("/api/blog/my/collect",param)
}
//修改用户信息
export const updateUserInfo = (param) =>{
    return request.post("/api/user/update",param)
}
export const sendCode = (param)=>{
    return request.post("/api/user/email/code",param)
}
export const emailBind = (param)=>{
    return request.post("/api/user/email/bind",param)
}