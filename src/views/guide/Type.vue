<template>
    <v-row>
        <v-col sm="12" class="py-0">
                <v-btn @click="New" class="white--text float-right text-capitalize" color="lightGreen" v-on="on">
                    Add Type
                </v-btn>
               <v-dialog v-model="dialogm2" max-width="550px">
                <v-card>
                    <v-card-title>{{ $t("type") }}</v-card-title>
                    <v-icon class="btn_close" @click="dialogm2 = false">close</v-icon>
                    <v-divider/>
                    <v-card-text
                            style="height: 330px; background-color: #EDF1F5; color: #333;"
                    >
                        <v-row>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{ $t("category") }}</label>
                                <v-select v-model="types.category" :items="items" class="" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="6" cols="12" class="">
                                <label class="label">{{ $t("type") }}</label>
                                <v-text-field v-model="types.category_type" class="" outlined placeholder=""/>
                            </v-col>
                            <v-col sm="12" cols="12" class="py-0">
                                <label class="label">{{ $t("description") }}</label>
                                <v-textarea v-model="types.description" no-resize height="160px" outlined rows="4"/>
                            </v-col>
                        </v-row>
                    </v-card-text>
                    <v-divider/>
                    <v-card-actions class="function_footer px-4 pb-2">
                        <v-btn class="btn_cancel float-left">{{ $t("cancel") }}</v-btn>
                        <!-- <v-btn class="btn_save_new float-right"
                        >{{ $t("save_new") }}
                        </v-btn> -->
                        <v-btn  v-if="!isupdate" @click="addTypes" color="green" class="white--text float-right"
                        >{{ $t("save") }}
                        </v-btn>
                        <v-btn  v-else @click="updateTypeM" color="green" class="white--text float-right"
                        >{{ $t("update") }}
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-col>
        <v-col sm="12">
            <v-data-table
              :headers="headers"
              :items="category"
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
import { addType, deleteGuide ,getType, updateType} from '@/scripts/guide/handle/guide.js'
export default {
    data: ()=> ({
        dialog: false,
        search:'',
        isupdate: false,
        types: {
            category: '',
            category_type: '',
            description: ''
        },
        items: [
            'Topic', 'Type', 'Product'
        ],
        dialogm2: false,
        headers: [
            {
                text: 'Category',
                align: 'start',
                sortable: false,
                value: 'category',
            },
            { text: 'type', value: 'category_type' },
            { text: 'Description', value: 'description' },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        category: [],
        delete_item: '',
    }),
    methods: {
        New(){
            this.isupdate = false,
            this.dialogm2 = true   
            this.Clear()
        },
        Clear(){
            this.types= {
                category: '',
                category_type: '',
                description: ''
            }
        },
        getTypeM(){
            getType().then(res=>{
                window.console.log(res)
                if(res.data.status =="SUCCESS"){
                   this.category = res.data.data.Items
                }
            })
        },
        addTypes(){
            addType(this.types).then(res=> {
                if(res.data.status =="SUCCESS"){
                    this.guide = res.data.data.Items
                    this.getTypeM()
                    this.Clear()
                }
            })
        },
        updateTypeM(){
            updateType(this.types).then(res=> {
                if(res.data.status =="SUCCESS"){
                    this.isupdate= false
                    this.getTypeM()
                    this.dialogm2 = false
                }
            })
        },
        editItem(item){
            this.isupdate = true
            this.types = item
            this.dialogm2 = true
        },
        yesConfirm(item){
            this.dialog = true
            this.delete_item = item
        },
        deleteItem(){
            window.console.log(this.delete_item)
            deleteGuide(this.delete_item.id,this.delete_item.type).then(res=> {
                window.console.log(res)
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
        this.getTypeM()
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