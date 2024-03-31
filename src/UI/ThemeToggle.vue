<template>
  <span @click="onClickToggle" class="switch">
    <div
      :class="['switch-rounded', getTheme ? 'switch-rounded--active' : '']"
    ></div>
  </span>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  computed: {
    ...mapGetters(["getTheme"]),
  },

  methods: {
    onClickToggle() {
      this.changeTheme();
      document.querySelector("html").dataset.dark = this.getTheme;
    },

    ...mapMutations(["changeTheme"]),
  },
};
</script>


<style lang="scss" scoped>
.switch {
  display: inline-block;

  &-rounded {
    display: block;
    width: 60px;
    height: 30px;
    padding: 3px;
    border-radius: 15px;
    border: 2px solid var(--text-color);
    cursor: pointer;
    transition: all 0.3s;

    @media (max-width: 576px) {
      transform: scale(0.75);
    }

    &::after {
      content: "";
      display: inherit;
      width: 20px;
      height: 20px;
      border-radius: 12px;
      background: var(--text-color);
      transition: 0.3s;
    }

    &--active {
      &::after {
        translate: 30px 0;
      }
    }
  }
}
</style>