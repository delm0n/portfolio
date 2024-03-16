<template>
  <div class="site-page">
    <p class="site-page__title" v-html="site.name"></p>

    <p
      class="site-page__descr"
      v-html="site.descr.replace(/(\r\n|\n|\r)/gm, '<br>')"
    ></p>

    <p v-if="site.page" class="site-page__link">
      Github pages: <a target="__blank" :href="site.page">{{ site.page }}</a>
    </p>
    <p v-if="site.link" class="site-page__link">
      Страница: <a target="__blank" :href="site.link">{{ site.link }}</a>
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getSites"]),

    site() {
      return this.getSites.find((el) => el.path == this.$route.params.path);
    },
  },
};
</script>

<style lang="scss">
.site-page {
  &__title {
    @include fluidFontSize(18, 42, 320, 1920);
    color: var(--text-color);
    margin-bottom: 25px;
    transition: $color-transition;
    font-weight: bold;
  }

  &__descr {
    @include fluidFontSize(16, 20, 320, 1920);
    font-weight: 400;
    color: var(--text-color);
    margin-bottom: 40px;
  }

  &__link {
    color: var(--text-color);
    font-weight: 500;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    a {
      color: var(--accent);
    }
  }
}
</style>