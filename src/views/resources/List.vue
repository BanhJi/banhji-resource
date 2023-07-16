<template>
  <div class="">
    <v-btn color="primary" class="" @click="store.selected= {} " to="/new">New</v-btn>
  </div>
  <div class="mt-2">
    <v-data-table
      v-model:items-per-page="page.pageSize"
      :headers="headers"
      :items="resources"
      item-value="name"
      class="elevation-1"
      hide-default-footer
    >
      <template v-slot:bottom>
        <div class=" pt-6">
          <!-- <div style="width: 120px">
            <v-text-field
              style="min-height: 40px !important"
              variant="solo"
              :model-value="page.pageSize"
              type="number"
              min="-1"
              max="15"
              hide-details
              @update:model-value="page.pageSize = parseInt($event, 10)"
            ></v-text-field>
          </div> -->

          <div style="width: 100%">
            <v-pagination
              class="text-left"
              v-model="pageNum"
              :length="pageCount"
            ></v-pagination>
          </div>
        </div>
      </template>
      <template v-slot:item="row">
        <tr>
          <td>{{ row.item.selectable?.title }}</td>
          <td>{{ row.item.selectable?.type }}</td>
          <td>{{ row.item.selectable?.feature }}</td>
          <td class="text-right">
            <v-btn class="mx-2 pa-2" icon size="sm" @click="onButtonClick(row.item)">
              <v-icon dark>mdi-pen</v-icon>
            </v-btn>
            <v-btn
              class="mx-2 mt-1 pa-2"
              icon
              size="sm"
              @click="onButtonClickDelete(row.item)"
            >
              <v-icon dark color="red">mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="auto">
      <v-card>
        <v-card-text> Are you sure you want to delete this resource? </v-card-text>
        <v-card-actions>
          <div class="d-flex justify-center align-center">
            <v-btn color="secondary" variant="outlined"  @click="dialog = false">Close</v-btn>
            <v-btn color="primary" variant="outlined" @click="onDelete">Ok</v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { VDataTable } from "vuetify/labs/VDataTable";
import useResource from "@/composables/useResource.js";
import { store } from "@/stores/store.js";

export default {
  props: ['type','change'],
  setup() {
    const uResource = useResource();
    return { uResource };
  },
  components: {
    "v-data-table": VDataTable,
  },
  data() {
    return {
      dialog: false,
      pageCount: 1,
      pageNum: 1,
      headers: [
        {
          title: "title",
          align: "start",
          sortable: false,
          key: "title",
        },
        { title: "type", align: "left", key: "type" },
        { title: "feature", align: "left", key: "feature" },
        { title: "action", align: "end", key: "action" },
      ],
      resources: [],
      page: {
        pageSize: 15,
        key: "",
      },
      selected: {},
      store,
      lastPage: 0,
    };
  },
  methods: {
    async getResources() {
      let res = await this.uResource.get(this.page, this.type);
      this.page.key = res.data.key || {};
      if (res.data) {
        this.resources = res.data.data;
        if (Object.keys(this.page.key).length > 0) {
          console.log("this.page.key: " , this.page.key)
          if (this.pageCount > this.lastPage) {
            // this.pageCount += 1;
            this.lastPage = this.pageCount;
          }
        }
        // this.page.key = ''
      }
    },
    onButtonClick(val) {
      this.store.selected = val.selectable;
      this.$router.push({ name: "new" });
      console.log(val.selectable);
    },
    onButtonClickDelete(val) {
      this.store.selected = val.selectable;
      this.dialog = true;
    },
    async onDelete() {
      this.store.selected["status"] = 2;
      await this.uResource.add(this.store.selected);
      this.resources = this.resources.filter(res => res.id != this.store.selected.id);
      this.dialog = false;
      // this.getResources();
    },
  },
  watch: {
    checkChange() {
      // this.getResources(this.type);
    },
  },
  computed: {
    pageSizeChange() {
      return this.page.pageSize;
    },
    checkChange() {
      return this.change
    }
  },
  mounted() {
    this.getResources(this.type);
  },
};
</script>
