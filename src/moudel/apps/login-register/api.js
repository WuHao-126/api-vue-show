import request from 'axios'
//登录
export const login = (param)=>{
    return request.post("/api/user/login",param)
}
//注册
export const register = (param)=>{
    return request.post("/api/user/register",param)
}
//发送验证码
export const sendCode = (param)=>{
    return request.post("/api/email/send",param)
}
//验证验证码
export const checkCode = (param)=>{
    return request.post("/api/email/check/code",param)
}
