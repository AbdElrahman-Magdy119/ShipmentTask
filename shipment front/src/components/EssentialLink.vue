<template>
  <div>

    <q-item
      clickable
      tag="router-link"
      :to="link"
      class="all_links"
      :class="dropDown == 'true' ? 'dropDownLinks' : ''"
      v-show="(showSettings == true || showSettings == null) && 
      (icon != 'person' && icon != 'home' && icon != 'web_asset') && 
       (title != 'Application' && title != 'Organization' && title != 'Beacon') "
    >
      <q-item-section v-if="icon && dropDown == 'false'" avatar>
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section v-if="dropDown == 'false'">
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>

      <q-item-section v-if="dropDown == 'true'" class="container_dropDown_menu">
        <q-list class="q-dropDown_menu_facilities no-hover">
          <q-expansion-item
            dense
            dense-toggle
            expand-separator
            :label="title"
            :icon="icon"
          >
            <q-card>
              <q-card-section>
                <div class="all_dropDown_menu_layout">
                  <div v-for="item in dropdownlinks" :key="item">
                    <router-link
                      class="menu-link"
                      :to="{ name: item.link, params: { name: item.param } }"
                    >
                      <span class="menu-text">{{ item.title }}</span>
                    </router-link>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-item-section>
    </q-item>

    <q-item
      clickable
      tag="router-link"
      :to="link"
      class="all_links"
      :class="dropDown == 'true' ? 'dropDownLinks' : ''"
      v-show="showSettings == false &&
       (icon == 'person' || icon == 'home' || icon == 'web_asset') && 
       (title == 'Application' || title == 'Organization' || title == 'Beacon')"
    >
      <q-item-section v-if="icon && dropDown == 'false'" avatar class="q-ml-md">
        <q-icon :name="icon" />
      </q-item-section>

      <q-item-section v-if="dropDown == 'false'" >
        <q-item-label>{{ title }}</q-item-label>
        <q-item-label caption>{{ caption }}</q-item-label>
      </q-item-section>

      <q-item-section v-if="dropDown == 'true'" class="container_dropDown_menu">
        <q-list class="q-dropDown_menu_facilities no-hover" >
          <q-expansion-item
            dense
            dense-toggle
            expand-separator
            :label="title"
            :icon="icon"
          >
            <q-card>
              <q-card-section>
                <div class="all_dropDown_menu_layout">
                  <div v-for="item in dropdownlinks" :key="item">
                    <router-link
                      class="menu-link"
                      :to="{ name: item.link, params: { name: item.param } }"
                    >
                      <span class="menu-text">{{ item.title }}</span>
                    </router-link>
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </q-list>
      </q-item-section>
    </q-item>
   
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "EssentialLink",
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: "",
    },

    link: {
      type: String,
      default: "#",
    },
    icon: {
      type: String,
      default: "",
    },
    dropDown: {
      type: String,
      default: "",
    },
    dropdownlinks: {
      type: Array,
      default: () => {},
    },
    showSettings: {
      type: Boolean,
      default: true,
    },
  },
});
</script>
