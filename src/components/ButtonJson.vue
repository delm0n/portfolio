<template>
  <button @click="saveContent()" class="button">Сохранить</button>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeJson"]),
  },
  methods: {
    saveContent() {
      const blob = new Blob([this.getAboutMeJson], {
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
  margin-top: 20px;
}
</style>