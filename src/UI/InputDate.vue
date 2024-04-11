<template>
  <datepicker
    class="input-date"
    locale="ru"
    v-model="myDate"
    :enable-time-picker="false"
    :preview-format="formatPreview"
    :format="formatInput"
    cancel-text="Закрыть"
    select-text="Выбрать"
    :dark="getTheme"
    position="left"
  >
    <template #input-icon>
      <svg
        class="input-slot-image"
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M7.75 0.25H5.25V2.75H1.5L0.25 4V26.5L1.5 27.75H26.5L27.75 26.5V4L26.5 2.75H22.75V0.25H20.25V2.75H7.75V0.25ZM2.75 10.25V5.25H25.25V10.25H2.75ZM2.75 12.75V25.25H25.25V12.75H2.75Z"
          fill="black"
        />
      </svg>
    </template>
  </datepicker>
</template>

<script>
import { mapGetters } from "vuex";
import Datepicker from "@vuepic/vue-datepicker";

const formatPreview = (date) => {
  return date.toLocaleDateString("ru");
};

export default {
  components: {
    Datepicker,
  },

  data() {
    return {
      formatPreview: formatPreview,
    };
  },

  props: {
    date: {
      required: true,
    },
    formatInput: {
      type: Function,
      default: formatPreview,
    },
  },
  computed: {
    myDate: {
      get() {
        return this.date;
      },
      set(v) {
        this.$emit("set-date", v);
      },
    },

    ...mapGetters(["getTheme"]),
  },
};
</script>

<style lang="scss">
.input-date {
  .dp__inner_nav:hover {
    background: none !important;
  }

  .dp__action_cancel {
    transition: all 0.15s;

    &:hover {
      color: var(--accent);
    }
  }

  .dp__today {
    &:hover {
      background: var(--accent);
      color: #f7f7f7;
    }
  }

  .dp__overlay_container {
    &::-webkit-scrollbar-thumb {
      background: rgba(57, 57, 57, 0.3);
      z-index: 1;
      cursor: pointer;
      border-radius: 0;

      &:hover {
        background: rgba(57, 57, 57, 0.45);
      }

      &:active {
        background: rgba(57, 57, 57, 0.6);
      }
    }

    &::-webkit-scrollbar-track {
      background-color: rgba(239, 239, 239, 0.2);
    }
  }

  .dp__input_icon {
    width: 32px;
    display: flex;
    justify-content: center;
    pointer-events: none;

    .input-slot-image {
      width: 16px;

      path {
        fill: #959595;
      }
    }
  }

  .dp__input_wrap input {
    background: transparent;
    border: none;
    width: 100%;
    outline: 0 !important;

    background: var(--input-background);
    border: 1px solid #bbbbbb;
    border-radius: 0px;
    padding: 16px 16px 16px 32px;

    color: var(--text-color);
    font-size: 16px;
    font-weight: 400;

    @media (max-width: 576px) {
      padding: 8px 8px 8px 32px;
      font-size: 14px;
    }

    &:hover {
      transition: 0.2s all;
      background: var(--input-background-hover);
    }
  }
}
</style>