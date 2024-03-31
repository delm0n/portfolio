<template>
  <section class="resume">
    <h2>Резюме</h2>

    <div class="resume-wrapper">
      <p v-if="!!title" class="resume-title" v-text="title"></p>
      <p
        v-if="!!getResumeCity"
        class="resume-subtitle"
        v-text="getResumeCity"
      ></p>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import ScrollTrigger from "gsap/ScrollTrigger";

export default {
  mounted() {
    this.$nextTick(function () {
      ScrollTrigger.create({
        trigger: ".resume",
        start: "top 75%",
        animation: this.gsap.from(".resume", {
          autoAlpha: 0,
          delay: 2.5,
          duration: 1,
          ease: "power1.out",
        }),
      });
    });
  },
  computed: {
    ...mapGetters(["getResumeName", "getResumeCity", "getAge"]),

    title() {
      if (!!this.getResumeName) {
        if (!!this.getAge) {
          return this.getResumeName + ", " + this.getAge;
        } else return this.getResumeName;
      } else {
        if (!!this.getAge) {
          return this.getAge;
        } else return false;
      }
    },
  },
};
</script>

<style lang="scss">
.resume {
  margin: 50px 0;
  padding: 50px 0 25px;
  overflow: hidden;
  border-top: 2px solid var(--text-color);

  @media (max-width: 991px) {
    margin: 50px 0;
    padding: 35px 0;
  }

  @media (max-width: 576px) {
    margin: 30px 0;
  }

  h2 {
    @include fluidFontSize(20, 34, 320, 1920);
    color: var(--text-color);
    margin-bottom: 25px;
  }

  .resume-wrapper {
    .resume-subtitle {
      @include fluidFontSize(16, 20, 320, 1920);
      color: var(--text-color);
      font-weight: 400;
    }

    .resume-title {
      @include fluidFontSize(16, 24, 320, 1920);
      color: var(--accent);
      margin-bottom: 4px;
      font-weight: 600;
    }
  }
}
</style>