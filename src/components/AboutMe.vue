<template>
  <header class="about-me">
    <div class="header-wrapper">
      <h1 v-html="getAboutMeTitle ? getAboutMeTitle : 'Заголовок'"></h1>
      <h2 v-if="getAboutMeSubtitle" v-html="getAboutMeSubtitle"></h2>
    </div>

    <a
      v-if="getAboutMeRef"
      :href="getAboutMeRef"
      ref="button"
      class="button"
      target="__blank"
      ><span> Связаться со мной</span></a
    >
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["getAboutMeTitle", "getAboutMeSubtitle", "getAboutMeRef"]),
  },

  mounted() {
    this.$nextTick(function () {
      this.gsap.fromTo(
        ["header .header-wrapper h1", "header .header-wrapper h2"],
        {
          opacity: 0,
        },
        {
          duration: 1,
          delay: 1,
          opacity: 1,
          stagger: 0.4,
        }
      );

      this.gsap.fromTo(
        ".keyword-filter",
        {
          opacity: 0,
        },
        {
          duration: 1,
          delay: 0.6,
          opacity: 1,
          onComplete: () => {
            if (this.getAboutMeRef && Boolean(this.$refs.button)) {
              this.$refs.button.classList.add("active");
            }
          },
        }
      );
    });
  },
};
</script>

<style lang="scss">
header {
  .header-wrapper {
    padding: 30px 0 40px;

    @media (max-width: 576px) {
      padding: 20px 0 30px;
    }
  }

  h1 {
    @include fluidFontSize(20, 42, 320, 1920);
    color: var(--text-color);
    margin-bottom: 15px;
    // opacity: 0;
  }

  h2 {
    @include fluidFontSize(16, 22, 320, 1920);
    // opacity: 0;
  }

  .button {
    @extend %button-secondary;

    margin: 30px 0 0;

    @media (max-width: 576px) {
      margin: 20px 0 0;
    }
  }
}
</style>