export default [
  {
    path: "login",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "login",
        component: () => import("../pages/logIn.vue"),
        meta: {
          name: "login",
        },
      },
    ],
  },
  {
    path: "register",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "register",
        component: () => import("../pages/register.vue"),
        meta: {
          name: "register",
        },
      },
    ],
  },
];
