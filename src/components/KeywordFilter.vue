<template>
  <div class="keyword-filter">
    <div v-for="(item, index) in keys" :key="index">
      <div
        :class="[
          'keyword-filter__item',
          getKeyFilter == item ? 'keyword-filter__item--active' : '',
        ]"
        @click="clickKey(item)"
      >
        {{ item }}
      </div>

      <template v-if="index == keys.length - 1">
        <svg
          :class="['key-close', !!getKeyFilter ? '' : 'key-close--hide']"
          @click="close()"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          aria-hidden="true"
        >
          <path
            d="M23.057 7.057l-16 16c-0.52 0.52-0.52 1.365 0 1.885s1.365 0.52 1.885 0l16-16c0.52-0.52 0.52-1.365 0-1.885s-1.365-0.52-1.885 0z"
            fill="#959595"
          ></path>
          <path
            d="M7.057 8.943l16 16c0.52 0.52 1.365 0.52 1.885 0s0.52-1.365 0-1.885l-16-16c-0.52-0.52-1.365-0.52-1.885 0s-0.52 1.365 0 1.885z"
            fill="#959595"
          ></path>
        </svg>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["setKeyFilter"]),

    clickKey(item) {
      this.gsap.fromTo(
        "section.sites .sites-wrapper",
        {
          opacity: 0,
        },
        {
          delay: 0.4,
          opacity: 1,
          duration: 0.4,
        }
      );

      this.setKeyFilter(item);
    },

    close() {
      document
        .querySelector(".keyword-filter .keyword-filter__item--active")
        .click();
    },
  },
  computed: {
    ...mapGetters(["getSites", "getKeyFilter"]),

    keys() {
      let arr = this.getSites.reduce(function (acc, item, index, arr) {
        item.keywords.forEach((element) => {
          acc.push(element);
        });
        return acc;
      }, []);

      const countItems = {};
      for (const item of arr) {
        // если элемент уже был, то прибавляем 1, если нет - устанавливаем 1
        countItems[item] = countItems[item] ? countItems[item] + 1 : 1;
      }

      //выводим элементы, кол-во которых больше 1
      return Object.keys(countItems)
        .filter((item) => countItems[item] > 1)
        .sort((a, b) => b - a);
    },
  },
};
</script>

<style lang="scss">
.keyword-filter {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 8px 14px;
  padding: 8px 0;

  .key-close {
    @extend %icon-close;
    cursor: pointer;

    &--hide {
      opacity: 0;
      pointer-events: none;
      visibility: hidden;
    }
  }

  & > div {
    display: flex;
    gap: 15px;
    align-items: center;
  }

  &__item {
    padding: 8px 20px;
    transition: all 0.2s;
    border: 1px solid transparent;
    cursor: pointer;
    user-select: none;
    @include fluidFontSize(14, 16, 320, 1920);
    text-align: center;
    border-radius: 15px;
    font-weight: 500;
    color: var(--text-color);

    &:hover,
    &--active {
      background: var(--background-power-conversely);
      color: var(--text-color-conversely);
    }
  }
}
</style>