<template>
  <router-link :to="'/site/' + site.path">
    <div class="site-item">
      <div class="site-item__img">
        <div class="img-wrap" :style="background"></div>
      </div>
      <div class="site-item__content">
        <p class="site-name">
          {{ site.name }}
        </p>

        <p class="site-keywords">
          {{ keywords }}
        </p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    site: Object,
  },

  computed: {
    keywords() {
      return this.site.keywords.join(", ");
    },

    background() {
      return this.site.img.src
        ? "background: url(" + this.site.img.src + ") center/cover no-repeat"
        : "background: rgba(238, 238, 238, 0.6)";
    },
  },
};
</script>

<style lang="scss">
.site-item {
  cursor: pointer;

  &__img .img-wrap {
    width: 100%;
    aspect-ratio: 1920/1200;
    background: var(--input-background);
    transition: all 0.4s;
    background-size: cover;
    background-position: center;
  }

  &__content {
    margin: 20px 0;

    .site-name {
      @include fluidFontSize(18, 24, 320, 1920);
      font-weight: 600;
      color: var(--text-color);
    }

    .site-keywords {
      transition: all 0.4s;
      opacity: 0;
      @include fluidFontSize(14, 16, 320, 1920);

      font-weight: 400;
      color: var(--text-color);
      margin-top: 10px;
    }
  }

  // &:hover {
  //   .site-item__img .img-wrap {
  //     transform: scale(1.025);
  //   }

  //   .site-keywords {
  //     opacity: 0.8;
  //   }
  // }
}
</style>