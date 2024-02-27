<template>
  <div class="about-me-edit">
    <label
      >Заголовок:
      <div class="input-container">
        <input type="text" :value="getAboutMeTitle" @input="updateTitle" /></div
    ></label>

    <label
      >Подзаголовок:
      <div class="input-container">
        <textarea
          rows="2"
          :value="getAboutMeSubtitle"
          @input="updateSubtitle"
        /></div
    ></label>

    <label
      >Ссылка для связи:
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
      this.$store.commit("updateAboutMeTitle", e.target.value);
    },

    updateSubtitle(e) {
      this.$store.commit("updateAboutMeSubtitle", e.target.value);
    },

    updateRef(e) {
      this.$store.commit("updateAboutMeRef", e.target.value);
    },
  },
};
</script>

<style lang="scss">
.about-me-edit {
  label {
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

    @include fluidFontSize(16, 20, 320, 1920);
    color: var(--text-color);

    .input-container {
      @extend %input-container;
    }
  }
}
</style>