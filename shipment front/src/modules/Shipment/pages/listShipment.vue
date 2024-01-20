<template>
  <div class="q-pa-md">
    <table-comp
      :tableRows="getShipment"
      :tableColumns="columns"
      class="table table-users"
      :addButton="true"
      @searchEvent="filterBySearch"
      :searchCond="true"
      @addEvent="addShipment"
      :tablePagination="pagination"
      @callApi="fireCall"
      @sortApi="fireSortCall"
      :loading="loading"
      :editButton="true"
      @editEvent="editShipment"
      imagePath="shipment_image"
    >
    </table-comp>

  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import tableComp from "../../../components/tableComponant.vue";
import ShipmentServices from "../services/services";
const columns = [
  {
    name: "image",
    label: "Image",
    align: "left",
    sortable: true,
    field: (row) => row.shipment_image,
  },
  {
    name: "shipper",
    label: "Shipper Name",
    align: "left",
    sortable: true,
    field: (row) => row.shipper,
  },
  {
    name: "description",
    label: "Description",
    align: "left",
    sortable: true,
    field: (row) => row.description,
  },
  {
    name: "price",
    label: "Price",
    align: "left",
    sortable: true,
    field: (row) => row.price,
  },
  {
    name: "weight",
    label: "Weight",
    align: "left",
    sortable: true,
    field: (row) => row.weight,
  },
  {
    name: "status",
    label: "Status",
    align: "left",
    sortable: true,
    field: (row) => row.status,
  },
  {
    name: "actions",
    label: "Action",
    align: "center",
  },
];

export default {
  components: { tableComp },
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const valueOfSearch = ref("");
    const getShipment = ref([]);
    const oldShipment = ref([]);
    const loading = ref(false);
    const sortBy = ref("");
    const sorting = ref("");
    const arrange = ref("desc");

    const filterBySearch = (searchValue) => {
        getShipment.value = oldShipment.value;
      valueOfSearch.value = searchValue;
      if (valueOfSearch.value != "") {
        getShipment.value = getShipment.value.filter((item) =>
          item.shipper.toLowerCase().includes(valueOfSearch.value)
        );
      } else {
        getShipment.value = oldShipment.value;
      }
    };

    const addShipment = () => {
      router.push({
        name: "shipment-add",
      });
    };

    const editShipment = (item) => {
      $q.loading.show();
      router.push({
        name: "shipment-edit",
        params: {
          id: item._id,
          name: item.shipper,
        },
      });
      $q.loading.hide();
    };

    const shipmentList = (page = 0) => {
      loading.value = true;
      ShipmentServices.getShipment().then((resp) => {
            getShipment.value = resp.data;
            oldShipment.value = getShipment.value;
          loading.value = false;
        })
        .catch((error) => {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "something went wrong please try again",
          });
          loading.value = false;
        });
    };

    const pagination = ref({
      page: 1,
      rowsPerPage: 10,
      rowsNumber: 0,
    });

    const fireCall = (e) => {
      pagination.value = e[2];
      shipmentList(e[1]);
    };

    const fireSortCall = (e) => {
      sorting.value = e[1];
      if (arrange.value == "desc") {
        sortBy.value = "asc";
        arrange.value = "asc";
        shipmentList();
      } else if (arrange.value == "asc") {
        sortBy.value = "desc";
        arrange.value = "desc";
        shipmentList();
      }
    };

    onMounted(() => {
        shipmentList();
    });

    return {
      columns,
      fireSortCall,
      fireCall,
      filterBySearch,
      addShipment,
      shipmentList,
      getShipment,
      loading,
      editShipment,
      
    };
  },
};
</script>
