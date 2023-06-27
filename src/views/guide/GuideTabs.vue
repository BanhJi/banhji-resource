<template>
    <v-app>
        <v-container>
            <v-row style="background:#fff;" class="pa-2 ma-1">
                <v-col cols="12">
                    <v-tabs>
                        <v-tab>
                            <span class="hidden-md-and-up">
                                <v-icon left>fas fa-newspaper</v-icon>
                                  {{$t('guide')}}
                            </span>
                            <span class="hidden-sm-and-down">
                                {{$t('guide')}}
                            </span>
                        </v-tab>
                        <v-tab>
                            <span class="hidden-md-and-up">
                                 {{$t('type')}}
                            </span>
                            <span class="hidden-sm-and-down">
                                {{$t('type')}}
                            </span>
                        </v-tab>
        
                        <v-tab-item>
                            <v-card flat>
                                <v-card-text class="">
                                    dshfsdfsef
                                    <!-- <Guide/> -->
                                </v-card-text>
                            </v-card>
                        </v-tab-item>
                        <v-tab-item>
                        <v-card flat>
                            <v-card-text class="">
                                dhfsf
                                <Type/>
                            </v-card-text>
                        </v-card>
                        </v-tab-item>
                    </v-tabs>
                </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>
<script>
export default {
    components:{
        Guide: () =>import('./Guide.vue'),
        Type: () => import('./Type.vue')
    }
}
</script>
<style scoped>
   .v-menu__content .v-list .v-list-item {
        min-height: 35px !important;
    }

    .tab_wrapper {
        position: relative;
        display: inherit;
    }

    .v-tab {
        min-width: 30px;
        font-size: 17px;
        text-transform: capitalize;
    }

    .v-icon--left {
        margin-right: 0px;
    }

    .theme--light.v-tabs > .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }

    .dropdown_transactions.v-btn {
        background-color: #2CA01C !important;
        height: 40px !important;
        width: auto !important;
        border-radius: 0 !important;
        padding: 0px 5px 0px 10px !important;
        color: #fff !important;
        right: 12px;
        position: absolute;
        top: 7px;
    }

    .v-tab--active {
        background-color: #f3f8ff;
        color: #000;
    }

    .theme--light.v-tabs >>> .v-tabs-bar {
        border-bottom: 1px solid #ddd !important;
    }
</style>