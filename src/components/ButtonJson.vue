<template>
  <button @click="saveContent()" class="button">Сохранить</button>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeJson", "getSitesJson", "getResumeJson"]),

    jsonContent() {
      return JSON.stringify(
        Object.assign(
          this.getAboutMeJson,
          this.getSitesJson,
          this.getResumeJson
        )
      );
    },
  },

  methods: {
    saveContent() {
      const blob = new Blob([this.jsonContent], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "data.json");
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