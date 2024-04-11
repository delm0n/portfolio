<template>
  <div :class="['container', isLanding ? 'container-landing' : '']">
    <div class="toggle-container">
      <nav v-if="isSite && isProd">
        <router-link to="/">На главную</router-link>
      </nav>

      <theme-toggle />
    </div>

    <nav class="nav" v-if="!isProd">
      <router-link to="/">Разработка</router-link> |
      <router-link to="/landing">Лендинг</router-link>
    </nav>

    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import ThemeToggle from "@/UI/ThemeToggle.vue";
import { mapGetters, mapActions, mapMutations } from "vuex";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  computed: {
    ...mapGetters(["isProd"]),
    isLanding() {
      return this.isProd ? true : this.$route.name != "home";
    },

    isSite() {
      return this.$route.name == "site";
    },
  },
  methods: {
    ...mapActions(["uploadData"]),

    ...mapMutations(["setMobile"]),
  },
  mounted() {
    this.uploadData();

    const windowbreakpoint = window.matchMedia("(max-width: 768px)");
    const breakpointChecker = () => {
      if (!windowbreakpoint.matches) {
        this.setMobile(false);
      } else {
        this.setMobile(true);
      }
    };

    windowbreakpoint.addListener(breakpointChecker);
    breakpointChecker();
  },
  components: {
    ThemeToggle,
  },
};
</script>

<style lang="scss">
@import url("~@/assets/style/main.scss");

.toggle-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 40px;
  padding: 20px 0;
  flex-wrap: wrap;

  & > span {
    margin-left: auto;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
