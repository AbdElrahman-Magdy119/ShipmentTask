export default [
    {
      path: "shipment",
      name: "",
      component: () => import("../pages/indexPage.vue"),
      children: [
        {
          path: "",
          name: "shipment",
          component: () => import("../pages/listShipment.vue"),
          meta: {
            name: "shipment",
            breadcrumb: {
              label: "shipment",
              parent: "Shipments",
              parentPath: "shipment",
              cildren: false,
              notAdd: false,
            },
          },
        },
        {
          path: "shipment-add",
          name: "shipment-add",
          component: () => import("../pages/addShipment.vue"),
          meta: {
            name: "shipment-add",
            breadcrumb: {
              label: "Add Shipment",
  
              parent: "Shipments",
  
              parentPath: "/shipment",
  
              cildren: true,
  
              notAdd: false,
            },
          },
        },
        {
          path: "shipment-edit/:id/:name",
          name: "shipment-edit",
          component: () => import("../pages/addShipment.vue"),
          meta: {
            name: "shipment-edit",
            breadcrumb: {
              label: "Edit Shipment",
  
              parent: "Shipments",
  
              parentPath: "/shipment",
  
              cildren: true,
  
              notAdd: true,
            },
          },
        },
      ],
    },
  ];
  