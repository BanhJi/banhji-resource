<template>
  <div class="">
    <v-btn color="primary" class="" to="/new">New</v-btn>
  </div>
  <div class="mt-2">
    <v-data-table v-model:items-per-page="itemsPerPage" :headers="headers" :items="resources" item-value="name"
      class="elevation-1" hide-default-footer>
      <template v-slot:bottom>
        <div class="d-flex pt-6">

          <div style="width: 120px;">
            <v-text-field  style="min-height: 40px !important;" variant="solo" :model-value="page.pageSize"
              type="number" min="-1" max="15" hide-details
              @update:model-value="page.pageSize = parseInt($event, 10)"></v-text-field>
          </div>

          <div style="width: 40%;">
            <v-pagination class="text-left" v-model="pageNum" :length="pageCount"></v-pagination>
          </div>

        </div>
      </template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.selectable?.title }}</td>
          <td>{{ row.item.selectable?.type }}</td>
          <td>{{ row.item.selectable?.feature }}</td>
          <td class="text-right">
            <v-btn class="mx-2" icon size="sm" @click="onButtonClick(row.item)">
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>
<script>

import { VDataTable } from 'vuetify/labs/VDataTable'
import useResource from '@/composables/useResource.js'
import { store } from "@/stores/store.js"

export default {
  setup() {
    const uResource = useResource();
    return { uResource }
  },
  components: {
    'v-data-table': VDataTable
  },
  data() {
    return {
      itemsPerPage: 2,
      pageCount: 1,
      pageNum: 1,
      headers: [
        {
          title: 'title',
          align: 'start',
          sortable: false,
          key: 'title',
        },
        { title: 'type', align: 'left', key: 'type' },
        { title: 'feature', align: 'left', key: 'feature' },
        { title: 'action', align: 'end', key: 'action' },
      ],
      resources: [

      ],
      page: {
        pageSize: 2,
        key: '',
      },
      selected: {},
      store,
      lastPage: 0
    }
  },
  methods: {
    async getResources() {
      let res = await this.uResource.get(this.page);
      this.page.key = res.data.key || {}
      if (res.data) {
        this.resources = res.data.data
        if (Object.keys(this.page.key).length > 0) {
          if (this.pageCount > this.lastPage) {
            this.pageCount += 1
            this.lastPage = this.pageCount
          }
        }
        // this.page.key = ''
      }
    },
    onButtonClick(val) {
      this.store.selected = val.selectable
      this.$router.push({ name: 'new' })
      console.log(val.selectable)
    }
  },
  watch: {
    pageNum() {
      this.getResources();
    },
  },
  computed:{
    pageSizeChange(){
      return this.page.pageSize
    }
  },
  mounted() {
    this.getResources();
  }
}
</script>