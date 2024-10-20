import request from "@/config/axios";
export const getInterfaceList = (param) => {
    return request.post("/api/interface/page",param)
}
// 根据ID获取接口详细
export const getByIdInterfaceInfo = (param)=>{
    return request.get("/api/interface/get/"+param)
}
//测试接口
export const invokeInteface = (param) =>{
    return request.post("/api/interface/invoke",param)
}
//获取标签
export const getTags= () =>{
    return request.get("/api/interface/tag")
}