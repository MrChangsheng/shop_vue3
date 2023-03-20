import { createRouter, createWebHashHistory} from 'vue-router'
// 哈希路由和历史路由
import LayOut from '../views/LayOut/LayOut.vue'
import store from "../store/index";
const routes = [
  {
    path:'/login',
    name:'login',
    component:()=>import('../views/pages/login.vue'),
    
  },{
    path: '/',//路由地址
    name: 'layout',//路由名字
    component: LayOut,
    redirect:'/index',
    // 子路由/嵌套路由
    children:[
      {
        path:'/index',
        name:'index',
        component:()=>import('../views/pages/index.vue')
        // 两种懒加载的方法
        // component:()=>resolve=>(require(['../views/pages/rolesList.vue']))
      },
      {
        path:'/roles',
        name:'roles',
        component:()=>import('../views/pages/rolesList.vue')
        // 两种懒加载的方法
        // component:()=>resolve=>(require(['../views/pages/rolesList.vue']))
      },{
        path:'/user',
        name:'user',
        component:()=>import('../views/pages/usersList.vue')
      },{
        path:'/goods',
        name:'goods',
        component:()=>import('../views/pages/goodsList.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to,form,next)=>{
  /**
   * to:从哪个页面
   * from：到哪个页面
   * next:只有执行next()页面才会进行跳转
   */
  // 判断用户是否登录
  console.log("store",store.state.uInfo);
  const uInfo = store.state.uInfo.userInfo
  if(!uInfo.username){
    // 未登录，跳转到login
    if(to.path==="/login"){
      next()
      return
    }
    next("/login")
  }
  next()
})
// 暴露路由对象
export default router
