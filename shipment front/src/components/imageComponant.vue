<template>
  <div class="facilities-image q-mb-md">
    <div class="upload-image">
      <img :src="contentImagePath" v-if="contentImagePath" />
      <q-file v-model="imageName"   @update:model-value="uploadImageFun()">
        <p>Click to Upload</p>
        <q-icon name="cloud_upload" />
      </q-file>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  props: {
    contentImagePath: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const imageName = ref("");
    const uploadImageFun = () => {
      emit("uploadEvent",imageName.value);
    };
    return {
      uploadImageFun,
      imageName,
    };
  },
};
</script>
