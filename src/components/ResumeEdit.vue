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

        <input-date
          :theme="getTheme"
          :date="getResumeBirthday"
          @set-date="setBirthday"
        />
      </div>
    </div>
  </section>
</template>

<script>
import InputDate from "@/UI/InputDate.vue";
import { mapGetters, mapMutations } from "vuex";

// const formatMY = (date) => {
//   let options = {
//     month: "long",
//   };

//   const month = date.toLocaleDateString("ru", options);
//   const year = date.getFullYear();

//   return `${month[0].toUpperCase() + month.slice(1).toLowerCase()} ${year}`;
// };

export default {
  components: { InputDate },
  computed: {
    ...mapGetters([
      "getResumeName",
      "getResumeCity",
      "getTheme",
      "getResumeBirthday",
    ]),
  },

  methods: {
    ...mapMutations([
      "updateResumeCity",
      "updateResumeName",
      "updateResumeBirthday",
    ]),

    updateCity(e) {
      this.updateResumeCity(e.target.value);
    },

    updateName(e) {
      this.updateResumeName(e.target.value);
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
    @extend %label-container;

    span {
      @include fluidFontSize(16, 20, 320, 1920);
    }
  }

  label {
    .input-container {
      @extend %input-container;
    }
  }
}
</style>