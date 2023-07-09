<script setup>
import { onBeforeMount } from "vue";
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
 import { useRouter } from 'vue-router';
 const router = useRouter();

import useResource from "@/composables/useResource";
const { me } = useResource();
const initialState = {
  password: "",
  email: "",
};
async function check() {
  try {
  let token = await localStorage.getItem("token");
  if (token != null) {
    let getMe = await me(token);
    if (getMe) {
      router.push({ name: "home" });
    } else {
      router.push({ name: "login" });
    }
  } else {
      router.push({ name: "login" });
  }
  } catch (e) {
      router.push({ name: "login" });
  }
}

onBeforeMount(() => {
  check();
});
</script>

<template>
  <RouterView />
</template>
