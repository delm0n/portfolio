<template>
  <div class="keyword-filter opac">
    <div
      v-for="(item, index) in keys"
      :key="index"
      :class="[
        'keyword-filter__item',
        getKeyFilter == item ? 'keyword-filter__item--active' : '',
      ]"
      @click="setKeyFilter(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["setKeyFilter"]),
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