<template>
  <section class="resume">
    <h2>Резюме</h2>

    <div class="resume-wrapper">
      <div class="resume-info">
        <p v-if="!!title" class="resume-title" v-text="title"></p>
        <p
          v-if="!!getResumeCity"
          class="resume-subtitle"
          v-text="getResumeCity"
        ></p>

        <p
          v-if="!!getResumeAbout"
          class="resume-about"
          v-html="getResumeAbout.replace(/(\r\n|\n|\r)/gm, '<br>')"
        ></p>
      </div>

      <div v-if="!!getResumeWorks.length" class="resume-works">
        <p class="resume-works__title">Опыт работы</p>

        <div
          v-for="(element, index) in getResumeWorks"
          :key="index"
          class="resume-works__item"
        >
          <p class="resume-works__item-time">
            <span
              v-text="
                new Date(element.dateStart)
                  .toLocaleDateString('ru', { month: 'long' })[0]
                  .toUpperCase() +
                new Date(element.dateStart)
                  .toLocaleDateString('ru', { month: 'long' })
                  .slice(1)
                  .toLowerCase() +
                ' ' +
                new Date(element.dateStart).getFullYear()
              "
            ></span>
            —
            <span v-if="element.until"> Настоящее время </span>
            <span
              v-else
              v-text="
                new Date(element.dateEnd)
                  .toLocaleDateString('ru', { month: 'long' })[0]
                  .toUpperCase() +
                new Date(element.dateEnd)
                  .toLocaleDateString('ru', { month: 'long' })
                  .slice(1)
                  .toLowerCase() +
                ' ' +
                new Date(element.dateEnd).getFullYear()
              "
            >
            </span>
          </p>
          <p class="resume-works__item-name">{{ element.name }}</p>
        </div>
      </div>
    </div>

    <button class="button">Скачать резюме</button>
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
          duration: 0.7,
          ease: "power1.out",
        }),
      });
    });
  },
  computed: {
    ...mapGetters([
      "getResumeName",
      "getResumeCity",
      "getAge",
      "getResumeWorks",
      "getResumeAbout",
    ]),

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

  .button {
    @extend %button-main;
    margin: 60px 0 0;

    @media (max-width: 576px) {
      margin-top: 40px;
    }
  }

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
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0 20px;

    .resume-info {
      grid-column: 1/3;

      .resume-subtitle {
        @include fluidFontSize(16, 18, 320, 1920);
        color: var(--text-color);
        font-weight: 400;
      }

      .resume-title {
        @include fluidFontSize(16, 24, 320, 1920);
        color: var(--accent);
        margin-bottom: 4px;
        font-weight: 600;
      }

      .resume-about {
        color: var(--text-color);
        font-weight: 400;
        @include fluidFontSize(16, 18, 320, 1920);
        margin-top: 20px;
        line-height: 125%;
      }
    }

    .resume-works {
      padding-top: 40px;

      &__title {
        @include fluidFontSize(16, 22, 320, 1920);
        font-weight: 600;
        color: var(--text-color);
        margin-bottom: 16px;
      }

      &__item {
        &-name {
          color: var(--text-color);
          @include fluidFontSize(16, 18, 320, 1920);
        }

        &-time {
          color: var(--accent);
          font-weight: 500;
          @include fluidFontSize(16, 20, 320, 1920);
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>