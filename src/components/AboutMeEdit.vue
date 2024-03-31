<template>
  <div class="about-me-edit">
    <label>
      <span> Заголовок: </span>
      <div class="input-container">
        <input type="text" :value="getAboutMeTitle" @input="updateTitle" /></div
    ></label>

    <label>
      <span>Подзаголовок:</span>
      <div class="input-container">
        <textarea
          rows="2"
          :value="getAboutMeSubtitle"
          @input="updateSubtitle"
        /></div
    ></label>

    <label>
      <span>Ссылка для связи:</span>
      <div class="input-container">
        <input type="text" :value="getAboutMeRef" @input="updateRef" /></div
    ></label>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeTitle", "getAboutMeSubtitle", "getAboutMeRef"]),
  },
  methods: {
    ...mapMutations([
      "updateAboutMeTitle",
      "updateAboutMeSubtitle",
      "updateAboutMeRef",
    ]),

    updateTitle(e) {
      this.updateAboutMeTitle(e.target.value);
    },

    updateSubtitle(e) {
      this.updateAboutMeSubtitle(e.target.value);
    },

    updateRef(e) {
      this.updateAboutMeRef(e.target.value);
    },
  },
};
</script>

<style lang="scss">
.about-me-edit {
  label {
    @extend %label-container;

    span {
      @include fluidFontSize(16, 20, 320, 1920);
    }

    .input-container {
      @extend %input-container;
    }
  }
}
</style>