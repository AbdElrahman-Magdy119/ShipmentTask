<template>
  <q-table
    :rows="tableRows"
    :columns="tableColumns"
    :row-key="RowsKey"
    class="table table-users"
    v-model:pagination="pagination"
    @request="onRequest"
    :loading="loading"
    @row-click="getDetails"
  >
    <template v-slot:top-left>
      <q-input
        dense
        v-model="search"
        placeholder="Search"
        @keyup.enter="onSearch"
        v-if="searchCond"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>

    <template v-slot:top-right>
      <div class="filter-table" v-if="filter">
        <!-- filter  button  -->
        <div class="filter__content" ref="menu2" @click="onOpen()">
          <q-btn icon="filter_alt" />
          <p>Filter By</p>
        </div>
        <!-- list of filteration  -->
        <q-list v-if="isActive">
          <q-form>
            <q-item v-close-popup class="filter-inputs" v-if="title">
              <p>{{ title }}</p>
              <q-select
                v-model="oneSessionsSelected"
                outlined
                :options="allsessionsList"
                dense
                emit-value
                option-label="name"
                option-value="id"
                map-options
              />
            </q-item>

            <q-item v-close-popup class="filter-inputs" v-if="exhibitors">
              <p>{{ exhibitors }}</p>
              <q-select
                v-model="oneExibitorSelected"
                outlined
                :options="allexhibitorsList"
                option-label="name"
                option-value="id"
                dense
                emit-value
                map-options
              />
            </q-item>

            <q-item
              v-close-popup
              class="filter-inputs"
              v-if="CateogeryforExhibitor"
            >
              <p>Cateogery</p>
              <q-select
                v-model="oneCateogeryExibitorSelected"
                outlined
                :options="allcateogeryExhibitorList"
                option-value="contentCatgoryID"
                option-label="name"
                dense
                emit-value
                map-options
              />
            </q-item>

            <q-item v-close-popup class="filter-inputs" v-if="sponsorCategory">
              <p>Category</p>
              <q-select
                v-model="oneSponsorCategorySelected"
                outlined
                :options="allSponsorCategoryList"
                option-label="name"
                option-value="contentCatgoryID"
                dense
                emit-value
                map-options
              />
            </q-item>

            <div class="buttons">
              <q-btn label="Reset" @click="onRest()" />
              <q-btn label="Done" class="apply q-pa-md" @click="onDone()" />
            </div>
          </q-form>
        </q-list>
      </div>
      <q-btn
        class="export-btn"
        label="Export"
        @click="onExport()"
        v-if="exportButton"
      />
      <q-btn class="add-btn" label="+" @click="onAdd()" v-if="addButton" />
      <!--button for sending Notification -->
      <q-btn
        class="export-btn"
        label="send Notification"
        @click="SendNotification()"
        v-if="sendNotificationButton"
      ></q-btn>
      <q-btn
        class="add-btn"
        label="+"
        @click="onAddNotification()"
        v-if="addButtonNotification"
      />
      <!--selected all rows  -->
      <q-checkbox
        v-model="AllSelectedBox"
        v-if="checkSelectedAll"
        label="Select All"
        @click.stop="checkBoxAllSelected"
      />
    </template>

    <template v-slot:body-cell-image="props">
      <q-td :props="props" class="image_avatar_in_table hotel-facilities">
        <img :src="props.row[imagePath]" />

        <!-- <img :src="props.row.contentImagePath" /> -->
      </q-td>
    </template>

    <template v-slot:body-cell-reviews="props">
      <q-td :props="props" >
        <q-icon
          v-if="showButton"
          class="show-icon"
          name="visibility"
          @click.stop="navigateToReviews(props.row.id,props.row.name)"
        >
      </q-icon>
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props" class="actions">
        <q-icon
          v-if="editButton"
          name="edit"
          class="edit-icon"
          @click.stop="onEdit(props.row)"
        ></q-icon>
        <!--icon for push Notification  -->
        <q-icon
          v-if="pushNotificationButton"
          class="add-Notification"
          name="send"
          @click.stop="onPushNotificatio(props.row, props.row.name)"
        >
        </q-icon>
        <q-icon
          v-if="deleteButton"
          class="delete-icon"
          name="delete"
          @click.stop="openDialog(props.row)"
        >
        </q-icon>
        <input
          type="checkbox"
          v-model="checkBox"
          v-bind:id="props.row.userID"
          v-if="checkSelected"
          :value="props.row"
          @change="SelectedRow(props.row)"
        />
        <q-checkbox
          v-model="checkBox"
          v-if="checkSelected"
          @click.stop="SelectedRow"
          :val="props.row"
          :disable="isDisabled"
        />
      </q-td>
    </template>

    


  </q-table>
</template>
<script>
import { ref, onMounted } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoute } from "vue-router";

export default {
  props: {
    tableRows: {
      type: Array,
      default: () => {},
    },
    filter: {
      type: String,
      default: "",
    },

    searchCond: {
      type: String,
      default: "",
    },
    pushNotificationButton: {
      type: String,
      default: "",
    },
    addButton: {
      type: String,
      default: "",
    },

    exportButton: {
      type: String,
      default: "",
    },

    editButton: {
      type: String,
      default: "",
    },
    deleteButton: {
      type: String,
      default: "",
    },
    showButton: {
      type: String,
      default: "",
    },
    tableColumns: {
      type: Array,
      default: () => {},
    },
    apiCall: {
      type: String,
      default: "",
    },
    tablePagination: {
      type: Object,
      default: () => {},
    },
    imagePath: {
      type: String,
      default: "",
    },
    //////////////////
    addButtonNotification: {
      type: String,
      default: "",
    },
    title: {
      type: String,
      default: "",
    },
    exhibitors: {
      type: String,
      default: "",
    },
    sponsorCategory: {
      type: String,
      default: "",
    },
    allsessionsList: {
      type: Array,
      default: () => {},
    },
    allexhibitorsList: {
      type: Array,
      default: () => {},
    },
    CateogeryforExhibitor: {
      type: String,
      default: "",
    },
    allcateogeryExhibitorList: {
      type: Array,
      default: () => {},
    },

    allSponsorCategoryList: {
      type: Array,
      default: () => {},
    },
    // for selected box in table

    checkSelected: {
      type: String,
      default: "",
    },
    sendNotificationButton: {
      type: String,
      default: "",
    },
    RowsKey: {
      type: String,
      default: "name",
    },
    checkSelectedAll: {
      type: String,
      default: "",
    },
    isDisabled: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    const $q = useQuasar();
    const router = useRouter();
    const route = useRoute();
    const loading = ref(false);
    const pagination = ref({});
    const oneSessionsSelected = ref("");
    const oneExibitorSelected = ref("");
    const oneCateogeryExibitorSelected = ref("");
    const oneSponsorCategorySelected = ref("");
    
    
    const navigateToReviews = (id,name) => {
      emit("showReviews", id,name);
    };



    // sort
    const sorting = ref("");

    const onRequest = (propss) => {
      if (propss.pagination.sortBy) {
        sorting.value = propss.pagination.sortBy;
        emit("sortApi", [props.apiCall, sorting.value]);
      } else if (propss.pagination.rowsPerPage) {
        sorting.value = "";
        pagination.value.rowsPerPage = propss.pagination.rowsPerPage;
        emit("callApi", [
          props.apiCall,
          propss.pagination.page,
          pagination.value,
        ]);
      }
    };
    const search = ref("");
    const onSearch = () => {
      emit("searchEvent", search.value);
    };

    const onDone = () => {
      isActive.value = false;
      emit("onSelectSession", oneSessionsSelected.value);
      emit("onSelectExhibitor", oneExibitorSelected.value);
      emit("onSelectExhibitorCategory", oneCateogeryExibitorSelected.value);
      emit("onSelectsponsorCategory", oneSponsorCategorySelected.value);
    };
    const onRest = () => {
      isActive.value = false;
      emit("ResetSelectExhibitorCategory");
      emit("resetValueofSponsorCategory");
    };

    const onAdd = () => {
      emit("addEvent");
    };

    const isActive = ref(false);
    const onOpen = () => {
      if (isActive.value) {
        isActive.value = false;
      } else {
        isActive.value = true;
      }
    };
    const onExport = () => {
      emit("exportData");
    };
    const getDetails = (evt, row) => {
      emit("getRowDetails", row);
    };
    const onEdit = (item) => {
      // use fun with emit
      emit("editEvent", item);
    };
    const openDialog = (item) => {
      // use fun with emit
      emit("openDialogDelete", item);
    };
    const onDeleteAllDialoge = (item) => {
      // use fun with emit
    };
    // for push Notification module
    const onPushNotificatio = (item) => {
      emit("pushNotification", item);
    };
    // for add Notification
    const onAddNotification = () => {
      emit("addEventNotification");
    };
    const openDialogTable = () => {
      emit("openDialogTable", false);
    };
    // for checkBox Table
    /////////////////////////////////////////////////////////

    const checkBox = ref([]);
    // selected row emit

    const SelectedRow = () => {
      // selected row

      emit("SelectedCheckBox", checkBox.value);
    };
    // select All emit
    const AllSelectedBox = ref(false);
    const checkBoxAllSelected = () => {
      emit("checkBoxAllSelected", AllSelectedBox.value);
    };
    /////////////////////////////////////////////////////

    const SendNotification = () => {
      emit("SendNotification");
    };
    onMounted(() => {
      pagination.value = props.tablePagination;
    });
    return {
      checkBoxAllSelected,
      checkBox,
      SelectedRow,
      onAddNotification,
      loading,
      pagination,
      sorting,
      onDeleteAllDialoge,
      onAdd,
      getDetails,

      openDialog,
      onEdit,
      search,
      onRequest,
      isActive,
      onOpen,
      onDone,
      onSearch,
      onExport,
      onPushNotificatio,
      onRest,
      oneSessionsSelected,
      oneExibitorSelected,
      SendNotification,
      oneCateogeryExibitorSelected,
      AllSelectedBox,
      oneSponsorCategorySelected,
      navigateToReviews
    };
  },
};
</script>
