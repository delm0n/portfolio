<template>
  <section class="sites">
    <div class="sites-wrapper">
      <div class="sites-wrapper__col">
        <site-item
          v-for="(item, index) in sitesCol1"
          :key="index"
          :site="item"
        />
      </div>
      <div
        v-if="!mobile"
        :style="'margin-top: ' + mt"
        class="sites-wrapper__col"
      >
        <site-item
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

export default {
  components: { SiteItem },

  data() {
    return {
      mt: "0",
      mobile: window.innerWidth < 769,
    };
  },

  computed: {
    ...mapGetters(["getSites", "isProd"]),

    sitesCol1() {
      if (this.mobile) {
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
      if (this.$route.name == "landing" || this.isProd) {
        this.mt =
          "calc(" +
          document.querySelector("section.sites .site-item").clientHeight +
          "px / " +
          2 +
          ")";
      }
    },
  },

  mounted() {
    const windowbreakpoint = window.matchMedia("(max-width: 768px)");
    const breakpointChecker = () => {
      if (!windowbreakpoint.matches) {
        this.mobile = false;
      } else {
        this.mobile = true;
      }
    };
    windowbreakpoint.addListener(breakpointChecker);
    breakpointChecker();

    addEventListener("resize", () => {
      !this.mobile ? this.getMt() : "";
    });
    !this.mobile ? this.getMt() : "";
  },
};
</script>

<style lang="scss">
.sites {
  padding: 50px 0;

  @media (max-width: 991px) {
    padding: 30px 0;
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
      max-width: 50%;
      width: 100%;
      gap: 50px;

      @media (max-width: 1136px) {
        gap: 30px;
      }
    }
  }
}
</style>