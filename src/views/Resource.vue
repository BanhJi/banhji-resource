<template>
  <v-card>
    <v-tabs
      v-model="tab"
      bg-color="primary"
      min-height="500"
    >
    <v-tab value="List">List</v-tab>
      <v-tab value="one">Resouce</v-tab>
      <v-tab value="two">Item Two</v-tab>
      <v-tab value="three">Item Three</v-tab>
    </v-tabs>

    <v-card-text>
      <v-window v-model="tab">
        <v-window-item value="List">
          <List />
        </v-window-item>

        <v-window-item value="two">
          <New />
        </v-window-item>

        <v-window-item value="three">
          Three
        </v-window-item>
      </v-window>
    </v-card-text>
  </v-card>
</template>

<script setup>

  import { ref } from 'vue'
  import New from './resources/New.vue'
  import List from './resources/List.vue'
  const tab = ref('List')
</script>