import request from 'axios'
export const userLogout = ()=>{
    return request.post("/api/user/logout")
}