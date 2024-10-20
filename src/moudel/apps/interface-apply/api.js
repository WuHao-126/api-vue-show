import request from "@/config/axios";
export const sendCode = (param)=>{
    return request.post("/api/email/code",param)
}
export const emailBind = (param)=>{
    return request.post("/api/email/bind",param)
}
export const getKey = ()=>{
    return request.get("/api/user/key")
}
//添加接口
export const addInterfaceInfo = (param) =>{
    return request.post("/api/interface/add",param)
}
//获取接口标签
export const getInterfaceTags = () =>{
    return request.get("/api/interface/tag")
}
/**
 * 添加定制接口
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const customizedInterface = (param) =>{
    return request.post("/api/customized/add",param)
}
/**
 * 获取定制列表
 * @param param
 * @returns {Promise<AxiosResponse<any>>}
 */
export const getCustomizedList = (param) =>{
    return request.post("/api/customized/page",param)
}

export const deleteCustomized = (param) =>{
    return request.post("/api/customized/delete",param)
}