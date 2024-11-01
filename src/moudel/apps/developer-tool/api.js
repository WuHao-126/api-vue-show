import request from "@/config/axios";
export const uploadFile = ()=>{
    return request.post("/api/upload/file");
}

export const getToolFileList = (param)=>{
    return request.get("/api/upload/tool/list",{
        params:param
    });
}

export const uploadToolFile = (formData)=>{
    return request.post("/api/upload/tool/list",formData,{
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}