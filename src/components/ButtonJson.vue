<template>
  <button @click="saveContent()" class="button">Сохранить</button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "getAboutMeJson",
      "getSitesJsonNoImage",
      "getSitesJsonImageArray",
      "getResumeJson",
      "getSitesJsonImage",
    ]),

    jsonContent() {
      return JSON.stringify(
        Object.assign(
          this.getAboutMeJson,
          this.getSitesJsonNoImage,
          this.getResumeJson
        )
      );
    },

    imagesContent() {
      return JSON.stringify(Object.assign({}, this.getSitesJsonImage));
    },

    imagesArray() {
      return JSON.stringify(Object.assign({}, this.getSitesJsonImageArray));
    },
  },

  methods: {
    saveContent() {
      this.download(this.jsonContent, "data.json");
      this.download(this.imagesContent, "images.json");
      this.download(this.imagesArray, "images-array.json");
    },

    download(content, fileName) {
      const blob = new Blob([content], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  @extend %button-main;
  margin: 20px auto 60px;
}
</style>