<template>
  
<q-layout view="lHh Lpr lFf" class="main-layout">
    <q-header elevated class="bg-white q-py-xs">
      <q-toolbar>
        <q-btn
          
          flat
          dense
          class="bg-white"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title class="text-primary">Shipment</q-toolbar-title>

        <div class="admin-info row">
          <q-tabs v-model="tab" class="text-primary fullscreen-div">
            <q-tab
              name="fullscreen"
              icon="fullscreen"
              class="fullscreen-icon"
              @click="$q.fullscreen.toggle()"
            >
            </q-tab>
          </q-tabs>
          <q-avatar>
            <img :src="userImage" :alt="userImage" />
           
            <q-menu>
              <div class="row no-wrap q-pa-md items-center dropdown-info">
                <div class="">
                  <div class="row">
                    <q-avatar size="55px">
                      <img :src="userImage"  :alt="userImage"  />
                    </q-avatar>
                  </div>
                </div>

                <div class="row no-wrap q-pa-md">
                  <div class="text-subtitle1 q-mb-xs">
                    {{ userName }}

                    <p class="q-mb-none">{{ userEmail }}</p>
                  </div>
                </div>
              </div>

              <ul class="divider">
                <li></li>
              </ul>

              <div class="links">
                <div class="" @click="logout"><p>Sign Out</p></div>
              </div>
            </q-menu>
          </q-avatar>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary text-white"
    >
      <q-list>
        <div class="logo">
          <q-item-label header> </q-item-label>
        </div>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
          dropDown="false"
         
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-breadcrumbs
        class="text-grey breadcrumbs_custom"
        active-color="primary"
      >
        <template v-slot:separator>
          <q-icon size="1.2em" name="arrow_forward" color="primary" />
        </template>

        <q-breadcrumbs-el
          label="Home"
          :to="{ name: 'dashboard' }"
          icon="home"
        />

        <q-breadcrumbs-el
          icon="widgets"
          :to="{ path: cramp.parentPath }"
          :label="cramp.parent"
          v-if="cramp.parentPath"
        />

        <q-breadcrumbs-el
          con="navigation"
          :to="{ path: crampLink }"
          :label="cramp.label"
          v-if="cramp.cildren"
        />

        <q-breadcrumbs-el
          con="navigation"
          :to="{ path: crampLink }"
          :label="crampParent"
          v-if="cramp.cildren & cramp.notAdd"
        />
      </q-breadcrumbs>

      <router-view />
    </q-page-container>
  </q-layout> 
</template>

<script>
import { defineComponent, onMounted, ref, watch } from "vue";

import EssentialLink from "components/EssentialLink.vue";

import { useRouter } from "vue-router";

import { useRoute } from "vue-router";

import { useQuasar } from "quasar";

const linksList = [
  {
    title: "Dashboard",

    icon: "dashboard",

    link: {
      name: "dashboard",
    },
  },
  {
    title: "Shipment",
    icon: "local_shipping",
    link: {
      name: "shipment",
    },
  },
];


export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {

    const userImage = localStorage.getItem("user_image")

    const $q = useQuasar();

    const router = useRouter();

    const route = useRoute();

    const leftDrawerOpen = ref(false);

    const cramp = ref("");

    const crampParent = ref("");

    const crampLink = ref("");

    // fun of logout

    const logout = () => {
      localStorage.clear()
      router.push("/login");
    };

  
    const userName = ref("");

    const userEmail = ref("");

    const getUserInfo = () => {
      userName.value = localStorage.getItem("first_name")+ " " + localStorage.getItem("last_name");
      userEmail.value = localStorage.getItem("email");
    };

    watch(route, (to) => {
      cramp.value = to.meta.breadcrumb;
      crampLink.value = to.path;
      crampParent.value = to.meta;
      crampParent.value = decodeURIComponent(crampLink.value.split("/").pop());
    });

    onMounted(() => {

      getUserInfo();
      cramp.value = route.meta.breadcrumb;
      crampLink.value = route.path;

      crampParent.value = decodeURIComponent(crampLink.value.split("/").pop());
      

    });

    return {
      linksList,

      leftDrawerOpen,

      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      userName,

      userEmail,

      logout,

      tab: ref("mails"),

      getUserInfo,

      cramp,
      crampParent,
      crampLink,
      // settings,
      // showSettings,
      userImage
    };
  },
});
</script>
