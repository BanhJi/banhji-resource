<!-- <template>
  <QuillEditor theme="snow" toolbar="full" />

</template> -->

<template>
  <div>
    <Back />
    <v-tabs v-model="tab" class="mb-2" color="primary" bg-color="grey" align-tabs="left">
      <v-tab :value="1"> <img style="width: 35px ; height: 20px;" src="@/assets/images/us.png" /></v-tab>
      <v-tab :value="2"> <img style="width: 35px ; height: 20px;" src="@/assets/images/kh.png" /> </v-tab>
    </v-tabs>
    <v-window v-model="tab">
      <v-window-item :value="1">
        <v-row>
          <v-col sm="12" cols="12">
            <label>Title</label>
            <v-text-field variant="outlined" v-model="guide.title" />
          </v-col>
          <v-col sm="12" cols="12">
            <label>Feature</label>
            <v-textarea variant="outlined" v-model="guide.feature" />
          </v-col>
          <!-- <v-col sm="4" cols="12" class="py-0">
            <label>Topic</label>
            <v-select :items="topic" item-value="id" item-text="category_type"     variant="outlined" v-model="guide.topic" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label>Type</label>
            <v-select :items="category_type" item-value="id" item-text="category_type"     variant="outlined"
              v-model="guide.category_type" />
          </v-col>
          <v-col sm="4" cols="12" class="py-0">
            <label>Product</label>
            <v-select :items="product" item-value="id" item-text="category_type"     variant="outlined" v-model="guide.product" />
          </v-col> -->
          <v-col sm="4" cols="12" class="py-0">
            <label>Feature Image</label>
            <input type="file" @change="onFileChange" />
            <img :src="guide.image" style="widht: 120px ; height: 80px" />
          </v-col>
        </v-row>
        <div class="my-6">

          <QuillEditor theme="snow" v-model:content="guide.content" toolbar="full"  contentType="html"/>

        </div>
      </v-window-item>
      <!-- khmer seing -->
      <v-window-item :value="2">
        <v-row>
          <v-col sm="12" cols="12">
            <label>ចំណងជើង</label>
            <v-text-field variant="outlined" v-model="guide.title_kh" />
          </v-col>
          <v-col sm="12" cols="12">
            <label>លក្ខណៈពិសេស</label>
            <v-textarea variant="outlined" v-model="guide.feature_kh" />
          </v-col>
        </v-row>
        <div class="mt-6">
          <div class="my-6">

            <QuillEditor theme="snow" v-model:content="guide.content" toolbar="full" />

          </div>
        </div>
      </v-window-item>
    </v-window>

    <v-row>
      <v-col cols="12" class="py-0">
        <v-btn v-if="!isEdite" @click="Save()" class="float-right white--text" :loading="loading" color="green">Save</v-btn>
        <v-btn v-else @click="Save()" class="float-right white--text" color="green">Update</v-btn>
      </v-col>
    </v-row>

  </div>
</template>

<!-- Initialize Quill editor -->

<script>
import GuidesModel from "@/scripts/guide/model/Guides";
import FunctionLayout from "@/components/FunctionLayout.vue";
import Back from "@/components/Back.vue";
import useResource from '@/composables/useResource.js'
import { store } from "@/stores/store.js"

import('@/components/Back.vue')
import {
  addGuide,
  updateGuide,
  getType,
} from "@/scripts/guide/handle/guide.js";

const guidesModel = new GuidesModel({});
export default {
  setup(){
    const uResource = useResource();
    return { uResource }
  },
  data: () => ({
    tab: 1,
    editorOption: {},
    guide: guidesModel,
    isEdite: false,
    topic: [],
    product: [],
    category_type: [],
    loading: false,
    store
  }),
  components: {
    FunctionLayout,
    Back
  },
  methods: {
    Close() {
      window.history.go(-1);
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      // var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.guide.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    getTypeM() {
    },
    Save() {
      if (!this.isEdite) {
        console.log(this.guide)
        this.loading = true;
        let adding = this.uResource.add(this.guide)
        this.loading = false;
        if(adding) {
          window.history.go(-1);
        }
        console.log(adding)
      } else {
        updateGuide(this.guide)
          .then((res) => {
            window.console.log(res.data)
            if (res.data.status == "SUCCESS") {
              window.console.log("have respne", res)
              this.guide = guidesModel;
            }
          })
          .catch((err) => {
            window.console.log(err);
          });
      }
    },
  },
  mounted() {
    if(Object.keys(this.store.selected).length > 0) {
      this.guide = this.store.selected
    }
    console.log(this.store.selected);
  },
};
</script>
<style scoped></style>
