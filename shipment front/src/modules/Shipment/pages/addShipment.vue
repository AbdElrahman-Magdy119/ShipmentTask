<template>
  <q-page class="q-ma-xl q-pr-md">
    <q-form
      v-model="form"
      @submit.prevent="addEditShipment()"
      class="add-exhibitor"
    >
    
      <imageComponent
        :contentImagePath="form.shipment_image"
        @uploadEvent="uploadImage"
        :rules="rules.required"
      />
    

      <div class="row">

        <div class="col-md-6 col-xs-12">
          <p>Shipper Name <span>*</span></p>
          <q-input
            v-model="form.shipper" 
            outlined
            placeholder="Shipper Name"
            dense
            type="text"
            :rules="rules.required"
            :disable="shipmentDone"
          />
        </div>

        <div class="col-md-6 col-xs-12">
          <p>User <span>*</span></p>
          <q-select
            outlined
            v-model="form.user_id"
            :options="allUsers"
            option-value="_id"
            option-label="first_name"
            emit-value
            dense
            placeholder="User"
            map-options
            :rules="rules.required"
            :disable="shipmentDone"
          />
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <p>Description <span>*</span></p>
          <q-input
            v-model="form.description"
            outlined
            placeholder="Description"
            dense
            type="textarea"
            rows="7"
            :rules="rules.required"
            :disable="shipmentDone"
          />
        </div>
      </div>

      <div class="row">
        <div  v-if="isEdit == false" class="col-md-12 col-xs-12">
          <p>Weight <span>*</span></p>
          <q-input
           v-model="form.weight"
            outlined
            placeholder="0"
            dense
            type="number"
            :rules="rules.required"
            min="1"
            :disable="shipmentDone"
          />
        </div>

        <div v-if="isEdit == true" class="col-md-6 col-xs-12">
          <p>Weight <span>*</span></p>
          <q-input
           v-model="form.weight"
            outlined
            placeholder="0"
            dense
            type="number"
            :rules="rules.required"
            min="1"
            :disable="shipmentDone"
          />
        </div>


        <div v-if="isEdit == true" class="col-md-6 col-xs-12">
          <p>Status <span>*</span></p>
          <q-select
            outlined
            v-model="status"
            :options="allStatus"
            option-value="name"
            option-label="value"
            emit-value
            dense
            placeholder="Status"
            map-options
            :rules="rules.required"
            :disable="shipmentDone"
          />
        </div>

      </div>

      

      <div class="add-edit-buttons">
        <div class="add-edit-button">
          <q-btn :disable="shipmentDone" label="Save" type="submit" />
        </div>
      </div>

    </q-form>
  </q-page>
</template>

<script>
import { ref, onMounted, watch } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";
import rules from "src/config/rules";
import imageComponent from "../../../components/imageComponant.vue";
import ShipmentServices from "../services/services";
export default {
  components: { imageComponent },
  setup() {
    const form = ref({
      shipment_image: "",
      shipper: "",
      user_id: "",
      description:"",
      weight:"",
    });

    const loading = ref(false);
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const file = ref("");
    const allUsers = ref([]);
    const allStatus = [
          { value: "progress", name: "progress" },
          { value: "pending", name: "pending" },
          { value: "done", name: "done" },
    ];
    const shipmentID = route.params.id;
    const fileData = new FormData();
    const isEdit = ref(false);
    const status = ref("");
    const shipmentDone = ref(false);

    const getallUsers = () => {
      ShipmentServices.allUsers().then((res) => {
        allUsers.value = res.data;
      })
      .catch((error) => {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "some thing went wrong",
          });
          loading.value = false;
          $q.loading.hide();
        });
    };

    const uploadImage = (item) => {
      file.value = item;
      fileData.append("shipment_image",file.value);
      // GlobalServices.uploadFile(fileData).then((res) => {
      //     form.value.image = res.data.image_name;
      //     $q.notify({
      //       color: "green",
      //       textColor: "white",
      //       icon: "check",
      //       message: "Image Uploaded Successfully",
      //     });
      //     $q.loading.hide();
      // })
      // .catch((error) => {
      //     $q.notify({
      //       color: "red-5",
      //       textColor: "white",
      //       icon: "warning",
      //       message:"some thing went wrong",
      //     });
      //     loading.value = false;
      //     $q.loading.hide();
      //   });
    };

    const addShipment = () => {

      fileData.append("shipper",form.value.shipper);
      fileData.append("weight",form.value.weight);
      fileData.append("description",form.value.description);
      fileData.append("user_id",form.value.user_id);
    
      $q.loading.show();
      ShipmentServices.addShipment(fileData).then((res) => {
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Added Successfully",
            });
            $q.loading.show();
            router.push({
              name: "shipment",
            });
            $q.loading.hide();
        })
        .catch((error) => {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:"some thing went wrong",
          });
          loading.value = false;
          $q.loading.hide();
        });
    };

    const functionShipment = () => {
      if (route.name == "shipment-edit") {
          getShipmentByID();
          isEdit.value = true
      }
    };

    watch(route, (to) => {
      if (to.path == "shipment-add" || route.name == "shipment-edit") {
        functionShipment();
      }
    });

    const getShipmentByID = () => {
      $q.loading.show();
      ShipmentServices.getShipmentByID(shipmentID).then((response) => {
            form.value = response.data;
            status.value = response.data.status;
            if(form.value.status == 'done')
              shipmentDone.value = true
            
            $q.loading.hide();
        })
        .catch((error) => {
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message:"some thing went wrong",
          });
          $q.loading.hide();
        });
    };

    const addEditShipment = () => {
      if (route.name == "shipment-add") {
        addShipment();
      } else if (route.name == "shipment-edit") {
        editShipment();
      }
    };

    const editShipment = () => {
      $q.loading.show();

      fileData.append("shipper",form.value.shipper);
      fileData.append("weight",form.value.weight);
      fileData.append("description",form.value.description);
      fileData.append("user_id",form.value.user_id);
      fileData.append("status",status.value);

      ShipmentServices.editShipment(shipmentID,fileData).then((res) => {
            $q.loading.hide();
            $q.notify({
              color: "green",
              textColor: "white",
              icon: "check",
              message: "Updated Successfully",
            });
            $q.loading.show();
            router.push({
              name: "shipment",
            });
            $q.loading.hide();
        })
        .catch((error) => {
          $q.loading.hide();
          $q.notify({
            color: "red-5",
            textColor: "white",
            icon: "warning",
            message: "some thing went wrong",
          });
        });
    };

    onMounted(() => {
        getallUsers();
        functionShipment();
    });

    return {
       uploadImage,
       form,
       rules,
       allUsers,
       getallUsers,
      file,
      addShipment,
      shipmentID,
      getShipmentByID,
      functionShipment,
      addEditShipment,  
      isEdit,
      status,
      allStatus,
      shipmentDone,


    };
  },
};
</script>
