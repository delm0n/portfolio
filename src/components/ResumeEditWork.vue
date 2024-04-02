<template>
  <div class="resume-work">
    <p class="dev-title">Опыт работы</p>

    <draggable
      class="works-wrapper"
      v-model="workList"
      tag="transition-group"
      v-bind="dragOptions"
      :component-data="{
        tag: 'ul',
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      @start="drag = true"
      @end="drag = false"
      item-key="order"
    >
      <template #item="{ element }">
        <li class="resume-work__item">
          <div class="content-content">
            <p class="resume-work__item-time">
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
            <p class="resume-work__item-name">{{ element.name }}</p>
          </div>
          <div class="content-icon">
            <svg
              @click="editWork(element)"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              version="1.1"
              width="30px"
              height="30px"
              x="0"
              y="0"
              viewBox="0 0 100 100"
              style="enable-background: new 0 0 512 512"
              xml:space="preserve"
              class=""
            >
              <g>
                <path
                  d="M66.2 49.6c-.7 0-1.2.6-1.2 1.2v20.5H28.6V35.1h22.5c.7 0 1.2-.6 1.2-1.2s-.6-1.2-1.2-1.2H27.4c-.7 0-1.2.6-1.2 1.2v38.8c0 .7.6 1.2 1.2 1.2h38.8c.7 0 1.2-.6 1.2-1.2V50.8c0-.7-.5-1.2-1.2-1.2z"
                  fill="#000000"
                  opacity="1"
                  data-original="#000000"
                  class=""
                />
                <path
                  d="m73.5 32.8-6.3-6.3c-.5-.5-1.3-.5-1.8 0L38.8 53.1c-.2.2-.3.3-.3.6l-2.3 8.6c-.1.4 0 .9.3 1.2.2.2.6.4.9.4h.3l8.6-2.3.6-.3 26.7-26.7c.4-.6.4-1.3-.1-1.8zM45.3 59.2l-6.2 1.7 1.7-6.2 25.5-25.5 4.5 4.5z"
                  fill="#000000"
                  opacity="1"
                  data-original="#000000"
                  class=""
                />
              </g>
            </svg>
            <svg
              @click="removeWork(element)"
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
          </div>
        </li>
      </template>
    </draggable>

    <div
      :style="!!getResumeWorks.length ? ' margin-top: 20px;' : ''"
      class="resume-work__add"
    >
      <label>
        <span>Должность, компания: </span>
        <div class="input-container">
          <input type="text" v-model="def.name" />
        </div>
      </label>

      <div class="time-row" @click="error = false">
        <input-date
          placeholder="Начало работы"
          :date="def.dateStart"
          @set-date="(v) => setDateStart(v)"
        />

        <div class="time-last-group">
          <input-date
            v-if="!def.until"
            placeholder="Окончание работы"
            :date="def.dateEnd"
            @set-date="(v) => setDateEnd(v)"
          />

          <label :style="!def.until ? 'opacity: 0.8' : ''" class="checkbox">
            <input type="checkbox" v-model="def.until" />
            <div class="box">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="14"
                viewBox="0 0 18 14"
                fill="none"
              >
                <path
                  d="M1 7.56424L5.92308 12.4531L17 1.45312"
                  stroke="white"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <span>по настоящее время</span>
          </label>
        </div>
      </div>
    </div>

    <div class="button-row">
      <button @click="validateWork()" class="button">
        {{ isEditWork ? "Обновить" : "Добавить" }}
      </button>
      <p v-show="error">Все поля обязательны для заполнения!</p>
    </div>
  </div>
</template>

<script>
import InputDate from "@/UI/InputDate.vue";
import draggable from "vuedraggable";
import { mapGetters, mapMutations } from "vuex";
import uuidv4 from "@/mixins/uuidv4";

export default {
  mixins: [uuidv4],
  data() {
    return {
      def: {
        id: null,
        dateStart: null,
        dateEnd: null,
        name: "",
        until: true,
      },
      error: false,
      drag: false,
      editOrder: false,
      isEditWork: false,
    };
  },

  methods: {
    setDateStart(value) {
      this.def.dateStart = value;
      this.error = false;
    },

    setDateEnd(value) {
      this.def.dateEnd = value;
      this.error = false;
    },

    validateWork() {
      if (!!this.def.dateStart && !!this.def.name) {
        if (this.def.until) {
          this.save();
        } else {
          if (!!this.def.dateEnd) {
            this.save();
          } else {
            this.error = true;
          }
        }
      } else {
        this.error = true;
      }
    },

    save() {
      //проверка дат
      if (!this.def.until && this.def.dateEnd < this.def.dateStart) {
        let a = this.def.dateEnd;
        this.def.dateEnd = this.def.dateStart;
        this.def.dateStart = a;
      }

      if (this.isEditWork) {
        this.updateResumeWork(this.def);
      } else {
        //isEditWork = false
        this.def.id = this.uuidv4();
        this.addResumeWork(this.def);
      }

      this.setDefault();
    },

    removeWork(el) {
      this.removeResumeWork(el.id);
    },

    editWork(el) {
      this.isEditWork = true;
      this.def = Object.assign({}, el);
    },

    setDefault() {
      this.isEditWork = false;
      this.def = {
        id: null,
        dateStart: null,
        dateEnd: null,
        name: "",
        until: true,
      };
    },

    ...mapMutations([
      "addResumeWork",
      "updateResumeWorks",
      "updateResumeWork",
      "removeResumeWork",
    ]),
  },

  computed: {
    ...mapGetters(["getResumeWorks"]),

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: this.editOrder,
        ghostClass: "ghost",
      };
    },

    workList: {
      get() {
        return this.getResumeWorks;
      },
      set(value) {
        this.updateResumeWorks(value);
      },
    },
  },

  components: {
    InputDate,
    draggable,
  },
};
</script>

<style lang="scss">
.resume-work {
  &__item {
    cursor: move;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &-time {
      color: var(--text-color);
      @include fluidFontSize(16, 20, 320, 1920);
      margin-bottom: 8px;
    }

    &-name {
      @include fluidFontSize(16, 20, 320, 1920);

      color: var(--text-color);
    }

    .content-icon {
      display: flex;
      align-items: center;
      flex-shrink: 0;

      svg {
        cursor: pointer;
        position: relative;
        z-index: 2;
        display: block;
        // padding: 10px;
        opacity: 0.6;
        &:nth-child(1) {
          opacity: 0.8;

          path {
            stroke: var(--text-color);
          }
        }

        path {
          fill: var(--text-color);
        }
      }
    }

    &.ghost {
      opacity: 0.5;
      background: var(--input-background-hover);
    }

    &:hover {
      background: var(--input-background-hover);
    }
  }

  .works-wrapper {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__add {
    &-descr {
      color: var(--text-color);
    }

    .time-row {
      display: grid;
      gap: 20px;
      grid-template-columns: repeat(2, 1fr);

      @media (max-width: 768px) {
        grid-template-columns: 1fr;
        gap: 10px;
      }

      .time-last-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        align-items: center;
        justify-content: center;

        .checkbox {
          span {
            font-weight: 500;
          }
        }
      }
    }
  }

  .button-row {
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 20px 0 0;

    .button {
      @extend %button-main;
    }

    p {
      color: var(--accent);
    }
  }
}
</style>