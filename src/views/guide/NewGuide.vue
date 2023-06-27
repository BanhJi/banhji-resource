<template>
  <div>
      <v-tabs class="mt-2">
        <v-tab>
          <img
            style="width: 35px ; height: 20px;"
            src="@/assets/images/us.png"
          />
        </v-tab>
        <v-tab>
          <img
            style="width: 35px ; height: 20px;"
            src="@/assets/images/kh.png"
          />    
        </v-tab>
        <v-tab-item>
          <v-row>
            <v-col sm="4" cols="12">
              <label>Title</label>
              <v-text-field outlined v-model="guide.title" />
            </v-col>
            <v-col sm="8" cols="12">
              <label>Feature</label>
              <v-text-field outlined v-model="guide.feature" />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>Topic</label>
              <v-select
                :items="topic"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.topic"
              />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>Type</label>
              <v-select
                :items="category_type"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.category_type"
              />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>Product</label>
              <v-select
                :items="product"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.product"
              />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>Feature Image</label>
              <input type="file" @change="onFileChange" />
              <img :src="guide.image" style="widht: 120px ; height: 80px" />
            </v-col>
          </v-row>
          <div class="mt-6" style="min-height: 400px">
            <quillEditor v-model="guide.content" :options="editorOption">
            </quillEditor>
          </div>
        </v-tab-item>
        <!-- khmer seing -->
        <v-tab-item>
          <v-row>
            <v-col sm="4" cols="12">
              <label>ចំណងជើង</label>
              <v-text-field outlined v-model="guide.title_kh" />
            </v-col>
            <v-col sm="8" cols="12">
              <label>លក្ខណៈពិសេស</label>
              <v-text-field outlined v-model="guide.feature_kh" />
            </v-col>
            <!-- <v-col sm="4" cols="12" class="py-0">
              <label>Topic</label>
              <v-select
                :items="topic"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.topic"
              />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>ប្រភេទ</label>
              <v-select
                :items="category_type"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.category_type"
              />
            </v-col>
            <v-col sm="4" cols="12" class="py-0">
              <label>Product</label>
              <v-select
                :items="product"
                item-value="id"
                item-text="category_type"
                outlined
                v-model="guide.product"
              />
            </v-col> -->
          </v-row>
          <div class="mt-6" style="min-height: 400px">
            <quillEditor v-model="guide.content_kh" :options="editorOption">
            </quillEditor>
          </div>
        </v-tab-item>
      </v-tabs>
      <v-row>
        <v-col cols="12" class="py-0">
          <v-btn
            v-if="!isEdite"
            @click="Save()"
            class="float-right white--text"
            color="green"
            >Save</v-btn
          >
          <v-btn
            v-else
            @click="Save()"
            class="float-right white--text"
            color="green"
            >Update</v-btn
          >
        </v-col>
      </v-row>
  
  </div>
</template>

<!-- Initialize Quill editor -->

<script>
import GuidesModel from "@/scripts/guide/model/Guides";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
import FunctionLayout from "@/components/FunctionLayout";
import {
  addGuide,
  updateGuide,
  getType,
} from "@/scripts/guide/handle/guide.js";

const guidesModel = new GuidesModel({});
export default {
  data: () => ({
    editorOption: {},
    guide: guidesModel,
    isEdite: false,
    topic: [],
    product: [],
    category_type: [],
  }),
  components: {
    FunctionLayout,
    quillEditor,
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
      getType().then((res) => {
        res.data.data.Items.map((i) => {
          if (i.category == "Topic") {
            this.topic.push(i);
          }
          if (i.category == "Type") {
            this.category_type.push(i);
          }
          if (i.category == "Product") {
            this.product.push(i);
          }
        });
      });
    },
    Save() {
      if (!this.isEdite) {
        window.console.log("Add new guid");
        addGuide(this.guide)
          .then((res) => {
            if (res.status == "SUCCESS") {
                window.console.log(res.status);
              this.guide = guidesModel;
              window.history.go(-1);
            }
          })
          .catch((err) => {
            window.console.log(err);
          });
      } else {
        updateGuide(this.guide)
          .then((res) => {
            window.console.log(res.data)
            if (res.data.status == "SUCCESS") {
                 window.console.log("have respne",res)
              this.guide = guidesModel;
              window.history.go(-1);
            }
          })
          .catch((err) => {
            window.console.log(err);
          });
      }
    },
  },
  mounted() {
    this.getTypeM();
    if (this.$route.params.id) {
      this.guide = this.$route.params.guide;
      this.isEdite = true;
    } else {
      this.isEdite = false;
    }
  },
};
</script>
<style scoped>
 .v-tab.v-tab {
    height: 35px  !important;
    color: inherit;
}
</style>
