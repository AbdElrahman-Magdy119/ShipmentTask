<template>
  <q-dialog class="popup_delete">
    <q-card class="card">
      <div class="title">
        <div class="icon_waring">
          <q-icon name="priority_high"></q-icon>
        </div>
        <div class="sure">
          <span>are you sure ?</span>
        </div>
      </div>
      <q-card-section class="row items-center q-gutter-sm">
        <div class="col-md-12 text-center">
          <p class="text-delete">Do you want to delete this {{ name }} ?</p>
        </div>

        <div class="row row-buttons_delete_cancel">
          <q-btn
            no-caps
            bg-color="gray-4"
            label="Cancel"
            v-close-popup
            class="button_cancel"
          />

          <q-btn
            no-caps
            label="Delete"
            color="red"
            class="buttons_Delete"
            @click="onDelete()"
          ></q-btn>
        </div>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
export default {
  name: "deleteDialoge",
  props: ["name"],

  setup(props, { emit }) {
    const $q = useQuasar();
    const onDelete = () => {
      emit("fireEvent");
    };

    return {
      onDelete,
    };
  },
};
</script>
