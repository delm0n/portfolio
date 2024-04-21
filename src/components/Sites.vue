<template>
  <section class="sites">
    <keyword-sort class="keywords-wrapper" />
    <div class="sites-wrapper">
      <div class="sites-wrapper__col">
        <site-item
          class="site-animation site-animation--active"
          v-for="(item, index) in sitesCol1"
          :key="index"
          :site="item"
        />
      </div>
      <div
        v-if="!getMobile"
        :style="'margin-top: ' + mt"
        class="sites-wrapper__col"
      >
        <site-item
          class="site-animation site-animation--active"
          v-for="(item, index) in sitesCol2"
          :key="index"
          :site="item"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import SiteItem from "./SiteItem.vue";
import ScrollTrigger from "gsap/ScrollTrigger";
import KeywordSort from "./KeywordFilter.vue";

export default {
  components: { SiteItem, KeywordSort },

  data() {
    return {
      mt: "0",
    };
  },

  computed: {
    ...mapGetters(["getSitesView", "isProd", "getMobile"]),

    sitesCol1() {
      if (this.getMobile) {
        return this.getSitesView;
      } else {
        return this.getSitesView.reduce(function (acc, item, index) {
          index % 2 == 0 ? acc.push(item) : "";
          return acc;
        }, []);
      }
    },

    sitesCol2() {
      return this.getSitesView.reduce(function (acc, item, index) {
        index % 2 != 0 ? acc.push(item) : "";
        return acc;
      }, []);
    },
  },

  methods: {
    getMt() {
      let sites = document.querySelector("section.sites .site-animation");

      if ((this.$route.name == "landing" || this.isProd) && sites) {
        this.mt = "calc(" + sites.clientHeight + "px / " + 2 + ")";
      }
    },
  },

  mounted() {
    //margin
    addEventListener("resize", () => {
      !this.getMobile ? this.getMt() : "";
    });
    !this.getMobile ? this.getMt() : "";

    //animation
    this.$nextTick(function () {
      let sites = document.querySelectorAll("section.sites .site-animation");

      sites
        ? sites.forEach((element, index) => {
            ScrollTrigger.create({
              trigger: element,
              start: "top 75%",
              animation: this.gsap.from(element, {
                autoAlpha: 0,
                y: 150,
                delay: 0.5,
                duration: 1.5,
                ease: "power1.out",
                onComplete: () => {
                  element.classList.remove("site-animation--active");
                },
              }),
            });
          })
        : "";
    });
  },
};
</script>

<style lang="scss">
.sites {
  margin: 50px 0 0;
  padding: 25px 0 0;
  overflow: hidden;
  border-top: 2px solid var(--text-color);

  @media (max-width: 991px) {
    margin: 50px 0;
    padding: 15px 0;
  }

  @media (max-width: 576px) {
    margin: 30px 0;
  }

  .keywords-wrapper {
    padding-bottom: 50px;
    @media (max-width: 991px) {
      padding-bottom: 30px;
    }
  }

  .sites-wrapper {
    display: flex;
    width: 100%;
    gap: 60px;

    @media (max-width: 1136px) {
      gap: 30px;
    }

    &__col {
      display: flex;
      flex-direction: column;
      width: 100%;
      gap: 100px;

      @media (max-width: 1136px) {
        gap: 70px;
      }

      @media (min-width: 769px) {
        max-width: 50%;
      }

      .site-animation--active {
        will-change: auto;
      }

      &:not(.site-animation--active) {
        &:hover {
          .site-item__img .img-wrap {
            transform: scale(1.025);
          }

          .site-keywords {
            opacity: 0.8;
          }
        }
      }
    }
  }
}
</style>