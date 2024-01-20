import { useRouter } from "vue-router";
import authRoutes from "../modules/auth/routes/routes";
import dashboardRoute from "../modules/dashBoard/routes/routes";
import shipmentRoute from "../modules/Shipment/routes/routes";

function checkAuh(to) {
  let authKey = localStorage.getItem("token");

  if (!authKey) return { path: "/login" };
}





const routes = [
  {
    path: "/",

    component: () => import("layouts/MainLayout.vue"),

    beforeEnter: [checkAuh],

    children: [
      {
        path: "",

        redirect: "/dashboard",

        component: () => import("../modules/dashboard/pages/dashboardPage.vue"),

        meta: { requiresAuth: true },
      },

      ...dashboardRoute,
      ...shipmentRoute,
      
    ],
  },

  {
    path: "/login",

    component: () => import("../modules/auth/pages/logIn.vue"),

    ...authRoutes,
  },

  {
    path: "/register",

    component: () => import("../modules/auth/pages/register.vue"),

    ...authRoutes,
  },

  

  // Always leave this as last one,

  // but you can also remove it

  {
    path: "/:catchAll(.*)*",

    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
