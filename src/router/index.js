import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'root',
      redirect:'home/index'
    },
    {
      path: '/home',
      name: 'home',
      redirect:'home/index',
      component: () => import('../views/Home.vue'),
      children:[
        {
          path: '/home/index',
          name: 'home.index',
          meta :{title:"首页"},
          component: () => import('../views/rightManage/Index')
        },
        {
          path: '/home/test',
          name: 'home.test',
          meta :{title:"测试tab"},//此处为规则配置页面 title为Tab显示的标题
          component: () => import('../views/rightManage/Test.vue')
        },
        {
          path: '/home/flowchart',
          name: 'home.flowchart',
          meta :{title:"flowchart"},//此处为规则配置页面 title为Tab显示的标题
          component: () => import('../views/rightManage/flowchart.vue')
        },
        {
          path: '/home/hasparam/:name',
          name: 'home.hasparam',
          meta :{title:"带参数"},//此处为规则配置页面 title为Tab显示的标题
          component: () => import('../views/rightManage/HasParam.vue'),
          props:true
        }
      ]
    },
    {
      path:      '/roleManage',
      name:      'roleManage',
      redirect:  'roleManage/index',
      component: () => import('../views/Home.vue'),
      children:  [
        {
          path:      '/roleManage/index',
          name:      'roleManage.index',
          meta:      { title: "角色管理" },
          component: () => import('../views/roleManage/Index')
        },
      ]
    },
    {
      path:      '/personManage',
      name:      'personManage',
      redirect:  'personManage/index',
      component: () => import('../views/Home.vue'),
      children:  [
        {
          path:      '/personManage/index',
          name:      'personManage.index',
          meta:      { title: "人员管理" },
          component: () => import('../views/personManage/Index')
        },
      ]
    },
    {
      path:     "/config",
      title:    "config",
      redirect: 'config/system',
      component: () => import('../views/Home.vue'),
      children: [
        {
          path:      '/config/system',
          name:      'config.system',
          meta:      { title: "系统配置" },
          component: () => import('../views/config/system.vue')
        },
        {
          path:      '/config/module',
          name:      'config.module',
          meta:      { title: "模块配置" },
          component: () => import('../views/config/module.vue')
        },
        {
          path:      '/config/right',
          name:      'config.right',
          meta:      { title: "权限配置" },
          component: () => import('../views/config/right.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    }
  ]
})
