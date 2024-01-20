export default [
  {
    path: "dashboard",
    name: "",
    component: () => import("../pages/indexPage.vue"),
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("../pages/dashboardPage.vue"),
        meta: {
          name: "dashboard",
          breadcrumb: {
            label: "Dashboard",
            parent: "",
            parentPath: "",
            children: false,
            notAdd: true,
          },
        },
      },
    ],
  },
];
