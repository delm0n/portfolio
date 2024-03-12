<template>
  <div :class="['container', isLanding ? 'container-landing' : '']">
    <div class="toggle-container">
      <theme-toggle />
    </div>

    <nav v-if="!isProd">
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
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isProd"]),
    isLanding() {
      return this.$route.name == "landing";
    },
  },
  methods: {
    ...mapActions(["uploadData"]),
  },
  mounted() {
    this.uploadData();

    console.log(this.isLanding);
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
  justify-content: flex-end;
  padding: 20px 0;
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
