<template>
  <router-link :to="'/site/' + site.path">
    <div class="site-item">
      <div class="site-item__img">
        <div
          class="img-wrap"
          :style="'background: url(' + background + ') center/cover no-repeat'"
        ></div>
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
        ? this.site.img.src
        : "https://api.screenshotone.com/take?access_key=GvK8CmEpP2tCnA&url=" +
            encodeURI(this.site.page ? this.site.page : this.site.link) +
            "&full_page=false&viewport_width=1920&viewport_height=1280&device_scale_factor=1&format=jpg&image_quality=10&block_ads=true&block_cookie_banners=true&block_banners_by_heuristics=false&block_trackers=true&cache=true&cache_ttl=14400&cache_key=1&delay=0&timeout=60";
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

  &:hover {
    .site-item__img .img-wrap {
      transform: scale(1.025);
    }

    .site-keywords {
      opacity: 0.8;
    }
  }
}
</style>