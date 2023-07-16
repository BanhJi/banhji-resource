<template>
  <v-card>
    <v-icon @click="logOut" large class="mr-2"> mdi-logout </v-icon>
    <v-tabs v-model="tab" bg-color="primary" min-height="500">
      <v-tab value="List">List</v-tab>
      <v-tab value="one">Deleted</v-tab>
      <v-tab value="two">Public</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="List">
          <List type="public" :change="tab"/>
        </v-window-item>
        <v-window-item value="one" >
          <List type="delete"  :change="tab"/>
        </v-window-item>
        <v-window-item value="two">
          <List type="preview"  :change="tab" />
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import New from "./resources/New.vue";
import List from "./resources/List.vue";
const tab = ref("List");
import { useRouter } from "vue-router";
const router = useRouter();

const logOut = () => {
  localStorage.setItem("token", null);
  router.push({ name: "login" });
};
</script>
