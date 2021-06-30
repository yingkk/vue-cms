import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/",
    name: "root",
    component: () => import("../index.vue"),
    redirect: "/index",
    meta: {
      title: "首页",
      requiresAuth: true,
    },
    // children: [
    //   {
    //     path: "index",
    //     name: "index",
    //     component: () => import("../views/index.vue"),
    //     meta: {
    //       title: "欢迎页",
    //       requiresAuth: true,
    //     },
    //   },
    //   {
    //     path: "sys",
    //     name: "sys",
    //     component: () => import("../views/sys.vue"),
    //     meta: {
    //       title: "系统管理",
    //       requiresAuth: true,
    //     },
    //     children: [
    //       {
    //         path: "user",
    //         name: "user",
    //         component: () => import("../views/user.vue"),
    //         meta: {
    //           title: "用户管理",
    //           requiresAuth: true,
    //         },
    //         children: [
    //           {
    //             path: "edit/:id",
    //             name: "edit",
    //             component: () => import("../views/userDetail.vue"),
    //             meta: {
    //               title: "用户编辑",
    //               requiresAuth: true,
    //             },
    //           },
    //         ],
    //       },
    //     ],
    //   },
    // ],
    children: [
      {
        path: "index",
        name: "index",
        component: () => import("../views/index.vue"),
        meta: {
          title: "welcome",
          requiresAuth: true,
        },
      },
      {
        path: "user",
        name: "user",
        component: () => import("../views/user.vue"),
        meta: {
          title: "用户管理",
          requiresAuth: true,
        },
        children: [
          {
            path: "edit/:id",
            name: "edit",
            component: () => import("../views/userDetail.vue"),
            meta: {
              title: "用户编辑",
              requiresAuth: true,
            },
          },
          {
            path: "add",
            name: "add",
            component: () => import("../views/userDetail.vue"),
            meta: {
              title: "用户新增",
              requiresAuth: true,
            },
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/login.vue"),
  },
  {
    path: "/error",
    name: "error",
    component: () => import("../views/page404.vue"),
  },
  {
    path: "*",
    redirect: "/error",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const isLoginIn = localStorage.getItem("TOKEN");
    if (!isLoginIn) {
      next({
        path: "/login",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
// router.afterEach((to, from) => {
// });

export default router;
