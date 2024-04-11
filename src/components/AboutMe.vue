<template>
  <header class="about-me">
    <div class="header-wrapper">
      <h1 v-html="!!getAboutMeTitle ? getAboutMeTitle : 'Заголовок'"></h1>
      <h2
        v-if="!!getAboutMeSubtitle"
        v-html="getAboutMeSubtitle.replace(/(\r\n|\n|\r)/gm, '<br>')"
      ></h2>
    </div>

    <a
      v-if="!!getAboutMeRef"
      :href="getAboutMeRef"
      class="button button_ref"
      target="__blank"
      ><span> Связаться со мной</span></a
    >
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeTitle", "getAboutMeSubtitle", "getAboutMeRef"]),
  },
};
</script>

<style lang="scss">
header {
  .header-wrapper {
    padding: 40px 0;

    @media (max-width: 576px) {
      padding: 10px 0 30px;
    }
  }

  h1 {
    @include fluidFontSize(20, 42, 320, 1920);
    color: var(--text-color);
    margin-bottom: 15px;
  }

  h2 {
    @include fluidFontSize(16, 22, 320, 1920);
    color: var(--text-color);
  }

  .button {
    @extend %button-secondary;

    margin: 30px 0 0;

    @media (max-width: 576px) {
      margin: 20px 0 0;
    }
  }
}
</style>