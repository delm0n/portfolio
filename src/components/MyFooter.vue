<template>
  <footer class="footer">
    <div class="footer-wrapper">
      <a
        v-if="getAboutMeRef"
        :href="getAboutMeRef"
        ref="button"
        class="button active"
        target="__blank"
        ><span>Начать проект</span></a
      >

      <p class="copyright">© {{ getYear }}</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeTitle", "getAboutMeSubtitle", "getAboutMeRef"]),

    getYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style lang="scss">
.footer {
  margin: 50px 0;
  padding: 50px 0;
  border-top: 2px solid var(--text-color);

  .footer-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 576px) {
      flex-direction: column;
      justify-content: center;
      gap: 35px;
    }
  }

  @media (max-width: 991px) {
    margin: 50px 0;
    padding: 30px 0;
  }

  @media (max-width: 576px) {
    margin: 30px 0;
  }

  .button {
    @extend %button-secondary;
  }

  .copyright {
    font-weight: 500;
    color: var(--text-color);
  }
}
</style>