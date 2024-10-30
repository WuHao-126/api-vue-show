import Vue from 'vue'
import router from "@/router";
import route from '@/router'
import request from '../config/axios'
export const utils = {
    dataCheck (res,success,error,url){
        if(res!=null){
            if(res.data.code===0){
                if(success!== null && success!== ''){
                    Vue.prototype.$message.success(success)
                }
                if(url !== 'null' && url !=='' && url!='null'){
                    router.push(url)
                }
                return true
            }else if(res.data.code === 40100 || res.data.code === 40102){
                Vue.prototype.$message.error("未登录/登录过期")
                router.push("/login")
            }else{
                let dataMessage=res.data.message
                if(dataMessage === null || dataMessage ===''){
                    Vue.prototype.$message.error(error)
                }else{
                    Vue.prototype.$message.error(dataMessage)
                }
            }
        }else{
            Vue.prototype.$message.error("数据请求失败")
        }

        return false
    },
    async getCurrentLoginUser(that){
        let sessionStorageToken = window.sessionStorage.getItem("token");
        let localStorageToken = localStorage.getItem("token");
        let res = await  request.get("/api/user/current")
        if(res === null){
            return null;
        }
        if(res.data.code === 0 && res.data.data != null){
            return res;
        }else if(localStorageToken != null){
            that.$message.error("登录状态已过期，请重新登录")
            localStorage.removeItem("token")
        }else if(sessionStorageToken != null){
            that.$message.error("登录状态已过期，请重新登录")
            window.sessionStorage.removeItem("token")
        }
        return null;
    },
    routerPush(url){
        if (url === route.path) {
            // 如果点击的是当前活动的路由，则刷新页面
            router.go(0);
        } else {
            // 否则进行正常的路由跳转
            router.push(url);
        }
    }
    // 其他工具方法...
};
export default utils