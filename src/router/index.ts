import { createRouter, createWebHistory,createWebHashHistory  } from "vue-router";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/login",
      children: [
        {
          path: "home",
          component: Home,
          name: "home",
          meta: {
            auth: true,
          },
        },
        {
          path: "/administration",
          name: "长尾词管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/administration.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/lexicon",
          name: "这是词库管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/lexicon.vue"),
        },
        {
          path: "/articleManagement",
          name: "文章生成任务",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/articleManagement.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/webSettings",
          name: "网站设置",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/webSettings.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/modeSettings",
          name: "AI模型",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/modeSettings.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/websiteModel",
          name: "网站模块设置",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/websiteModel.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/websiteColumn",
          name: "网站栏目设置",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/websiteColumn.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/articleTaskManagement",
          name: "文章管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/articleTaskManagement.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/log",
          name: "模型日志",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/log.vue"),
          meta: {
            auth: true,
          },
        },
        {
          path: "/articleUpload",
          name: "文章上传任务",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/articleUpload.vue"),
          meta: {
            auth: true,
          },
        },
        
      ],
    },
    {
      path: "/login",
      name: "登录",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/Login.vue"),
      meta: {
        auth: false,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  // 1. 每个条件执行后都要跟上 next() 或 使用路由跳转 api 否则页面就会停留一动不动
  // 2. 要合理的搭配条件语句，避免出现路由死循环。
  const token = localStorage.getItem("token");
  if (to.meta.auth) {
    console.log('to.meta.auth',to.meta.auth);
    if (!token) {
      console.log('token',token);
      return router.replace({
        path:'/login'
      });
    }
    next();
  } else {
    next();
  }
});

export default router;
