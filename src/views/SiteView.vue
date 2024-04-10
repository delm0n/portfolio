<template>
  <div class="site-page">
    <div class="site-page__body">
      <p class="site-page__title" v-html="site.name"></p>

      <p
        class="site-page__descr"
        v-html="site.descr.replace(/(\r\n|\n|\r)/gm, '<br>')"
      ></p>

      <div class="site-page__photo" v-if="!!site.imagesContent.length">
        <div class="img-wrapper">
          <a
            :href="item.src"
            v-for="(item, index) in photoShow"
            :key="index"
            :data-fancybox="site.path"
            class="img-wrap"
          >
            <img :src="item.src" alt="#" />
          </a>
        </div>

        <collapse
          v-if="site.imagesContent.length > count"
          :when="collapseToggle"
          class="v-collapse"
        >
          <div class="img-wrapper">
            <a
              :href="item.src"
              v-for="(item, index) in photoCollapse"
              :key="index"
              :data-fancybox="site.path"
              class="img-wrap"
            >
              <img :src="item.src" alt="#" />
            </a>
          </div>
        </collapse>

        <p
          v-if="site.imagesContent.length > count"
          class="collapse-button"
          @click="collapseToggle = !collapseToggle"
        >
          {{ !collapseToggle ? "Больше скриншотов" : "Свернуть" }}
        </p>
      </div>
      <p v-if="site.page" class="site-page__link">
        Github pages: <a target="__blank" :href="site.page">{{ site.page }}</a>
      </p>
      <p v-if="site.link" class="site-page__link">
        Страница: <a target="__blank" :href="site.link">{{ site.link }}</a>
      </p>
    </div>
    <my-footer />
  </div>
</template>

<script>
import MyFooter from "@/components/MyFooter.vue";
import { mapGetters } from "vuex";
import { Collapse } from "vue-collapsed";

export default {
  data() {
    return {
      count: window.innerWidth > 1136 ? 2 : 1,
      collapseToggle: false,
    };
  },
  components: { MyFooter, Collapse },
  computed: {
    ...mapGetters(["getSites"]),

    site() {
      return this.getSites.find((el) => el.path == this.$route.params.path);
    },

    photoShow() {
      return [
        this.site.img,
        ...this.site.imagesContent.filter((el, index) => index < this.count),
      ];
    },

    photoCollapse() {
      return this.site.imagesContent.filter((el, index) => index >= this.count);
    },
  },
  mounted() {
    const windowbreakpoint = window.matchMedia("(max-width: 1136px)");
    const breakpointChecker = () => {
      if (!windowbreakpoint.matches) {
        this.count = 2;
      } else {
        this.count = 1;
      }
    };

    windowbreakpoint.addListener(breakpointChecker);
    breakpointChecker();
  },
};
</script>

<style lang="scss">
.site-page {
  max-width: 100%;
  height: auto;

  .collapse-button {
    margin: 20px auto 0;
    text-align: center;
    margin-top: 20px;
    text-decoration: underline;
    cursor: pointer;
  }

  .v-collapse {
    transition: height 500ms ease-out;
    /* or transition: height var(--vc-auto-duration) ease-in-out */
  }

  &__photo {
    margin: 60px 0;

    @media (max-width: 576px) {
      margin: 40px 0 60px;
    }

    .img-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 50px 30px;
      // margin: 60px 0;

      @media (max-width: 1136px) {
        grid-template-columns: repeat(2, 1fr);
        gap: 40px 20px;
      }

      @media (max-width: 576px) {
        grid-template-columns: 1fr;
        gap: 40px;
        // margin: 40px 0 60px;
      }

      .img-wrap {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 100%;
        transition: all 0.2s;
        opacity: 0.8;
        aspect-ratio: 1/1;

        &:hover {
          opacity: 1;
        }

        img {
          display: block;
          object-fit: contain;
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  &__body {
    min-height: calc(100vh - 415px);
  }

  &__title {
    @include fluidFontSize(18, 42, 320, 1920);
    color: var(--accent);
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