import request from "@/config/axios";
export const uploadFile = ()=>{
    return request.post("/api/upload/file");
}

export const getToolFileList = (param)=>{
    return request.get("/api/upload/tool/list",{
        params:param
    });
}