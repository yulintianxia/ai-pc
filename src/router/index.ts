import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/components/Layout.vue";
import Home from "@/views/home.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "home",
          component: Home,
          name: "home",
        },
        {
          path: "/administration",
          name: "长尾词管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/administration.vue"),
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
          path: "/newTask",
          name: "新建任务",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/newTask.vue"),
        },
        {
          path: "/taskManagement",
          name: "任务管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/taskManagement.vue"),
        },
        {
          path: "/articleManagement",
          name: "文章管理",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/articleManagement.vue"),
        },
        {
          path: "/webSettings",
          name: "网站设置",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/webSettings.vue"),

        },
        {
          path: "/modeSettings",
          name: "模型设置",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/modeSettings.vue"),
        },
        {
          path: "/websiteModel",
          name: "网站模板",
          // route level code-splitting
          // this generates a separate chunk (About.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import("../views/websiteModel.vue"),
        }
      ],
    },
    {
      path: "/login",
      name: "登录",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/login.vue"),
    },
  ],
});

export default router;
