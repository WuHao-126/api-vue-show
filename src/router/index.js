import Vue from 'vue'
import VueRouter from 'vue-router';
Vue.use(VueRouter)
const router=new VueRouter({
    routes:[
        {
          path: '/login',
          component: ()=> import('../moudel/apps/login-register/login')
        },
        {
            path: '/register',
            component: ()=> import('../moudel/apps/login-register/register')
        },
        {
            path:'/',
            component: ()=> import('../components/layout/index'),
            redirect: "/index",
            children:[
                {
                    path:'/index',
                    component: () => import('../moudel/apps/home-page/index')
                },
                {
                    path:'/interface',
                    component: () =>  import('../moudel/apps/interface-shop/index')
                },
                {
                    path:'/interface/apply',
                    component: () =>  import('../moudel/apps/interface-apply/index')
                },
                {
                    path: '/interface/apply/key',
                    component: () => import('../moudel/apps/interface-apply/components/apply-key')
                },
                {
                    path: '/interface/apply/add',
                    component: () => import('../moudel/apps/interface-apply/components/apply-add')
                },
                {
                    path: '/interface/apply/customized',
                    component: () => import('../moudel/apps/interface-apply/components/apply-customized')
                },
                {
                    path: '/interface/apply/customized/table',
                    component: () => import('../moudel/apps/interface-apply/components/apply-customized-table')
                },
                {
                    path:'/interface/detail/:id',
                    component: () =>  import('../moudel/apps/interface-shop/components/interface-detail')
                },
                {
                    path:'/forum',
                    component: () => import('../moudel/apps/developer-forum/index')
                },
                {
                    path:'/forum/write',
                    component: () => import('../moudel/apps/developer-forum/components/write-blog')
                },
                {
                    path:'/forum/update/:id',
                    component: () => import('../moudel/apps/developer-forum/components/update-blog')
                },
                {
                    path:'/forum/detail/:id',
                    component: () => import('../moudel/apps/developer-forum/components/detail-blog')
                },
                {
                    path: '/user/detail/:id',
                    component: () => import('../moudel/apps/user-info/index')
                }
            ]
        }
    ]
})
export default router


