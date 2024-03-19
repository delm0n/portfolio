<template>
  <div class="keywords">
    <label
      >Ключевые слова:

      <div v-show="keywords.length" class="keywords-wrapper">
        <div
          class="keyword-item"
          v-for="(item, index) in keywords"
          :key="index"
        >
          <p>{{ item }}</p>
          <svg
            @click="removeKeyword(index)"
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="none"
          >
            <path
              d="M1 1L7.2 7.2"
              stroke="#1E1E1E"
              stroke-width="1.45"
              stroke-linecap="round"
            />
            <path
              d="M1 7.2L7.2 1"
              stroke="#1E1E1E"
              stroke-width="1.45"
              stroke-linecap="round"
            />
          </svg>
        </div>
      </div>

      <div class="input-wrapper">
        <div class="input-container">
          <input type="text" v-model="key" @input="updateKey" />
        </div>
        <div @click="addKeyword" class="add-keyword">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M21.5822 4.71725L21.5822 4.71725C21.355 4.72402 21.1395 4.81886 20.981 4.98171C20.9809 4.98186 20.9807 4.982 20.9806 4.98214L8.80002 17.1627L3.8192 12.1819C3.73869 12.0982 3.64231 12.0313 3.53568 11.9853C3.42882 11.9391 3.31382 11.9147 3.19741 11.9135C3.081 11.9123 2.96553 11.9344 2.85775 11.9784C2.74997 12.0224 2.65205 12.0874 2.56973 12.1697C2.48741 12.2521 2.42235 12.35 2.37835 12.4578C2.33434 12.5655 2.31229 12.681 2.31347 12.7974C2.31466 12.9138 2.33906 13.0288 2.38524 13.1357C2.43133 13.2423 2.49818 13.3387 2.58189 13.4192L8.18136 19.0187L8.18137 19.0187C8.34547 19.1827 8.568 19.2749 8.80002 19.2749C9.03204 19.2749 9.25457 19.1827 9.41867 19.0187L9.41868 19.0187L22.2179 6.21943C22.2181 6.21931 22.2182 6.21918 22.2183 6.21905C22.3445 6.0962 22.4308 5.93812 22.4657 5.76547C22.5006 5.59264 22.4826 5.41328 22.4139 5.25089C22.3451 5.08851 22.229 4.95067 22.0806 4.85545C21.9321 4.76022 21.7584 4.71205 21.5822 4.71725Z"
              fill="black"
              stroke="black"
              stroke-width="0.15"
            />
          </svg>
        </div>
      </div>
    </label>

    <collapse :when="errorKey">
      <p class="error-par">Такой ключ уже есть!</p>
    </collapse>
  </div>
</template>

<script>
import { Collapse } from "vue-collapsed";

export default {
  components: { Collapse },

  data() {
    return {
      key: "",
      errorKey: false,
    };
  },
  props: {
    keywords: Object,
  },

  methods: {
    checkExist() {
      return !this.keywords.includes(this.key);
    },

    updateKey() {
      this.errorKey = false;
    },

    addKeyword() {
      if (this.key.trim().length > 2) {
        if (this.checkExist()) {
          let key = this.key.trim();

          this.$emit(
            "add-keyword",
            key[0].toUpperCase() + key.slice(1).toLowerCase()
          );

          this.key = "";
        } else {
          this.errorKey = true;
        }
      }
    },

    removeKeyword(index) {
      this.$emit("remove-keyword", index);
    },
  },
};
</script>

<style lang="scss">
.keywords {
  &-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 5px 14px;
    padding: 8px 0 10px;

    .keyword-item {
      display: flex;
      align-items: center;
      gap: 4px;

      p {
        font-weight: 400;
        line-height: 1;
      }

      @extend %svg-theme;

      svg {
        cursor: pointer;
        margin-top: 2px;
        transition: 0.3s all;
        opacity: 0.4;
      }

      &:hover {
        svg {
          opacity: 1;
        }
      }
    }
  }

  label {
    gap: 0px !important;
  }

  .input-wrapper {
    display: flex;
    align-items: stretch;
    padding-top: 8px;

    .input-container {
      flex-grow: 1;
    }

    .add-keyword {
      background: var(--input-background);
      border: 1px solid #bbbbbb;
      border-left: none;
      width: 55px;
      aspect-ratio: 1/1;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s all;

      &:hover {
        background: var(--input-background-hover);
      }

      @extend %svg-theme;

      @media (max-width: 576px) {
        width: 39px;

        svg {
          width: 20px;
        }
      }
    }
  }
}
</style>