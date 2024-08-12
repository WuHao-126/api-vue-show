import request from 'axios'
export const userLogout = ()=>{
    return request.post("/api/user/logout")
}

export const getNotice = () =>{
    return request.get("/api/web/notice")
}