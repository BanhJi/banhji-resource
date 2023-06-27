<template>
  <div class="">
    <v-btn color="primary" class="" to="/new">New</v-btn>
  </div>
  <div class="mt-2">
  <v-data-table
    v-model:items-per-page="itemsPerPage"
    :headers="headers"
    :items="resources"
    item-value="name"
    class="elevation-1"
  >
  <template v-slot:item="row">
          <tr>
            <td>{{row.item.selectable?.title}}</td>
            <td>{{row.item.selectable?.type}}</td>
            <td>{{row.item.selectable?.feature}}</td>
            <td class="text-right">
                <v-btn class="mx-2"  icon size="sm" @click="onButtonClick(row.item)">
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
  export default {
    setup(){
      const uResource = useResource();
      return { uResource }
    },
    components: {
      'v-data-table': VDataTable
    },
    data () {
      return {
        itemsPerPage: 5,
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
      }
    },
    methods: {
      async getResources(){
        let res = await this.uResource.get();
        if(res.data){
          this.resources = res.data.data
        }
      },
      onButtonClick(){
        
      }
    },
    mounted(){
      this.getResources();
    }
  }
</script>