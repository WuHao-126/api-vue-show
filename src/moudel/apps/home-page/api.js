import request from "axios";
/**
 * 获取网站信息
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getWebInfo = ()=>{
    return request.get("/api/web")
}