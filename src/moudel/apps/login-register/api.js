import request from 'axios'
export const login = (param)=>{
    return request.post("/api/user/login",param)
}
export const register = (param)=>{
    return request.post("/api/user/register",param)
}
