<template>
  <div class="container">
    <div class="toggle-container">
      <theme-toggle />
    </div>

    <nav v-if="!isProd">
      <router-link to="/">Разработка</router-link> |
      <router-link to="/landing">Лендинг</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import ThemeToggle from "@/UI/ThemeToggle.vue";
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters(["isProd"]),
  },
  methods: {
    ...mapActions(["uploadData"]),
  },
  mounted() {
    this.uploadData();
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
</style>
