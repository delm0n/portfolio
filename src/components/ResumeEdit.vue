<template>
  <section class="resume-edit">
    <label>
      <span>Полное имя: </span>
      <div class="input-container">
        <input type="text" :value="getResumeName" @input="updateName" /></div
    ></label>

    <div class="label-row">
      <label>
        <span>Город: </span>
        <div class="input-container">
          <input type="text" :value="getResumeCity" @input="updateCity" /></div
      ></label>

      <div class="label">
        <span>Дата рождения:</span>

        <input-date :date="getResumeBirthday" @set-date="setBirthday" />
      </div>
    </div>

    <label>
      <span>О себе:</span>
      <div class="input-container">
        <textarea rows="3" :value="getResumeAbout" @input="updateAbout" /></div
    ></label>

    <resume-work />
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ResumeWork from "./ResumeEditWork.vue";
import InputDate from "@/UI/InputDate.vue";

export default {
  components: { ResumeWork, InputDate },
  computed: {
    ...mapGetters([
      "getResumeName",
      "getResumeCity",

      "getResumeBirthday",
      "getResumeAbout",
    ]),
  },

  methods: {
    ...mapMutations([
      "updateResumeCity",
      "updateResumeName",
      "updateResumeBirthday",
      "updateResumeAbout",
    ]),

    updateCity(e) {
      this.updateResumeCity(e.target.value);
    },

    updateName(e) {
      this.updateResumeName(e.target.value);
    },

    updateAbout(e) {
      this.updateResumeAbout(e.target.value);
    },

    setBirthday(value) {
      this.updateResumeBirthday(value);
    },
  },
};
</script>

<style lang="scss" >
.resume-edit {
  margin-top: 20px;

  .label-row {
    @media (min-width: 769px) {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 20px;
    }
  }

  div.label,
  label {
    &:not(.checkbox) {
      @extend %label-container;

      span {
        @include fluidFontSize(16, 20, 320, 1920);
      }
    }
  }

  label {
    .input-container {
      @extend %input-container;
    }
  }

  div.label {
    margin-bottom: 20px;
  }
}
</style>