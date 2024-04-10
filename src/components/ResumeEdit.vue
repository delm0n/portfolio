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

    <input-file-line
      class="label-avatar"
      :resolution="'Загрузить аватар <span> (слайдер до 8 фотографий)</span>'"
      :limit="8"
      @load-image="loadImage"
      @delete-image="deleteImage"
      :uploadImg="getResumeImg"
    />

    <label>
      <span>О себе:</span>
      <div class="input-container">
        <textarea rows="3" :value="getResumeAbout" @input="updateAbout" /></div
    ></label>

    <resume-work />
    <resume-education />
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ResumeWork from "./ResumeEditWork.vue";
import InputDate from "@/UI/InputDate.vue";
import InputFileLine from "@/UI/InputFileLine.vue";
import ResumeEducation from "./ResumeEditEducation.vue";

export default {
  components: { ResumeWork, InputDate, InputFileLine, ResumeEducation },
  computed: {
    ...mapGetters([
      "getResumeName",
      "getResumeCity",
      "getResumeImg",
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
      "setResumeImg",
      "removeResumeImg",
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

    loadImage(img) {
      this.setResumeImg({ name: img.name, src: img.src, type: img.type });
    },

    deleteImage(index) {
      this.removeResumeImg(index);
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

  div.label,
  .label-avatar {
    margin-bottom: 20px;

    .resolution {
      @include fluidFontSize(16, 20, 320, 1920);
    }
  }
}
</style>