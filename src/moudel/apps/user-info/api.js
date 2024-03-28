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