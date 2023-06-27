<template>
    <v-row>
        dfshofsdefw
        <v-col sm="12" class="py-0">
            <v-btn depressed class="float-right white--text" color="green" :to="'new_guide'" >New Guide</v-btn>
        </v-col>
        <v-col sm="12">
            <v-data-table
              :headers="headers"
              :items="guide"
              :search="search"
              sort-by="address"
              class="elevation-1"
            >
                <template v-slot:top>
                    <v-toolbar flat>
                    <v-toolbar-title>Search</v-toolbar-title>
                    <v-text-field
                            class="ml-6"
                            v-model="search"
                            append-icon="mdi-magnify"
                            label="Search"
                            single-line
                            hide-details
                            >Good me</v-text-field>
                    </v-toolbar>
                </template>
             <template v-slot:item.actions="{ item }">
                <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
                >
                mdi-pencil
                </v-icon>
                <v-icon
                small
                @click="yesConfirm(item)"
                >
                mdi-delete
                </v-icon>
            </template>
            </v-data-table>

        </v-col>
        <v-col sm="12">
            <v-dialog
                v-model="dialog"
                width="300"
                persistent
            >
                <v-card>
                    <v-card-title class="text-center ml-4">Do you want to delete?</v-card-title>
                    <v-card-actions class="ml-6">
                        <v-btn @click="deleteItem" class="float-right white--text ml-12" color="orange"  small>
                            {{$t('delete')}}
                        </v-btn>
                        <v-btn class="float-right" color="lime accent-3" @click="dialog = false" small>
                            {{$t('cancel')}}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
    </v-row>
</template>
<script>
import { getGuide, deleteGuide } from '@/scripts/guide/handle/guide.js'
export default {
    data: ()=> ({
        dialog: false,
        search:'',
        headers: [
            {
                text: 'title',
                align: 'start',
                sortable: false,
                value: 'title',
            },
            { text: 'feature', value: 'feature' },
            // { text: 'Phone', value: 'phone' },
            // { text: 'Email', value: 'email' },
            // { text: 'Username', value: 'id' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        guide: [],
        delete_item: '',
    }),
    methods: {
        initialize(){
            
        },
        getGuideM(){
            getGuide().then(res=> {
                if(res.data.status =="SUCCESS"){
                   this.guide = res.data.data.Items
                }
            })
        },

        editItem(item){
            this.$router.push({
                name: `new_guide`,
                params: {
                    guide: item,
                    id: item.id,
                }
            })
        },
        yesConfirm(item){
            this.dialog = true
            this.delete_item = item
        },
        deleteItem(){
            window.console.log(this.delete_item)
            deleteGuide(this.delete_item.id,this.delete_item.type).then(res=> {
                if(res.status == "SUCCESS"){
                    this.dialog = false
                    this.getGuideM()
                }
            })
        },
   
    },
    activated: function() {
        window.console.log("activated()")
    },
    deactivated: function() {
        window.console.log("deactivate()")
    },
    mounted(){
        this.getGuideM()
    }
}
</script>
<style scoped>
    .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tbody > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > thead > tr > th, .v-application--is-ltr .v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
        text-align: left !important;

    }
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr > th {
        font-size: 20px !important;
    }
</style>