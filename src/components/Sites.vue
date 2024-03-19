<template>
  <section class="sites">
    <div class="sites-wrapper">
      <div class="sites-wrapper__col">
        <site-item
          class="site-animation"
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
          class="site-animation"
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

export default {
  components: { SiteItem },

  data() {
    return {
      mt: "0",
    };
  },

  computed: {
    ...mapGetters(["getSites", "isProd", "getMobile"]),

    sitesCol1() {
      if (this.getMobile) {
        return this.getSites;
      } else {
        return this.getSites.reduce(function (acc, item, index) {
          index % 2 == 0 ? acc.push(item) : "";
          return acc;
        }, []);
      }
    },

    sitesCol2() {
      return this.getSites.reduce(function (acc, item, index) {
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
  padding: 50px 0 0;
  border-top: 2px solid var(--text-color);
  overflow: hidden;

  @media (max-width: 991px) {
    margin: 50px 0;
    padding: 30px 0;
  }

  @media (max-width: 576px) {
    margin: 30px 0;
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
      gap: 50px;

      @media (max-width: 1136px) {
        gap: 30px;
      }

      @media (min-width: 769px) {
        max-width: 50%;
      }
    }
  }
}
</style>