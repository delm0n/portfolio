<template>
  <section class="sites-edit">
    <div class="sites-header">
      <button @click="openModal()" class="button">Добавить сайт</button>

      <div class="site-controller">
        <div
          :class="['button-edit', editImage ? 'button-edit--active' : '']"
          @click="changeEditImage()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="24px"
            height="24px"
            viewBox="0 0 20 20"
            version="1.1"
          >
            <g
              id="Page-1"
              stroke="none"
              stroke-width="1"
              fill="none"
              fill-rule="evenodd"
            >
              <g
                id="Dribbble-Light-Preview"
                transform="translate(-180.000000, -3919.000000)"
                fill="#000000"
              >
                <g id="icons" transform="translate(56.000000, 160.000000)">
                  <path
                    d="M135.083,3769.667 C136.188,3769.667 137.083,3768.772 137.083,3767.667 C137.083,3766.562 136.188,3765.667 135.083,3765.667 C133.979,3765.667 133.083,3766.562 133.083,3767.667 C133.083,3768.772 133.979,3769.667 135.083,3769.667 L135.083,3769.667 Z M126,3777 L127.956,3777 L130.824,3773.882 L127.594,3770.402 L126,3771.996 L126,3777 Z M126,3769.167 L127.578,3767.589 L127.594,3767.605 L127.61,3767.589 L132.238,3772.218 L133.669,3770.787 L133.685,3770.803 L133.701,3770.787 L138,3775.086 L138,3765 L126,3765 L126,3769.167 Z M136.586,3777 L133.685,3774.099 L130.784,3777 L136.586,3777 Z M124,3779 L140,3779 L140,3763 L124,3763 L124,3779 Z M144,3759 L144,3775 L142,3775 L142,3761 L128,3761 L128,3759 L144,3759 Z"
                    id="images-[#967]"
                  ></path>
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div
          :class="['button-edit', !editOrder ? 'button-edit--active' : '']"
          @click="changeEditOrder()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16 3.93a.75.75 0 0 1 1.177-.617l4.432 3.069a.75.75 0 0 1 0 1.233l-4.432 3.069A.75.75 0 0 1 16 10.067V8H4a1 1 0 0 1 0-2h12V3.93zm-9.177 9.383A.75.75 0 0 1 8 13.93V16h12a1 1 0 1 1 0 2H8v2.067a.75.75 0 0 1-1.177.617l-4.432-3.069a.75.75 0 0 1 0-1.233l4.432-3.069z"
              fill="#000000"
            />
          </svg>
        </div>
      </div>
    </div>

    <div class="sites-wrapper">
      <draggable
        v-model="siteList"
        :class="['list-group', !editOrder ? 'list-group--active' : '']"
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
        group="sites"
      >
        <template #item="{ element }">
          <li
            :class="[
              'list-group-item',
              !editOrder ? 'list-group-item--active' : '',
            ]"
            :key="element.id"
          >
            <site-item :showImage="editImage" :site="element" />
          </li>
        </template>
      </draggable>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import draggable from "vuedraggable";
import SiteItem from "./SiteEditItem.vue";

export default {
  components: {
    draggable,
    SiteItem,
  },
  data() {
    return {
      drag: false,
      editOrder: true,
      editImage: true,
    };
  },

  methods: {
    ...mapMutations(["updateSites", "setSiteModal"]),

    openModal() {
      this.setSiteModal(0);

      setTimeout(() => {
        Fancybox.show(
          [
            {
              src: "#modal-site-edit",
            },
          ],
          { click: null, dragToClose: false }
        );
      }, 100);
    },

    changeEditOrder() {
      this.editOrder = !this.editOrder;
    },

    changeEditImage() {
      this.editImage = !this.editImage;
    },
  },

  computed: {
    ...mapGetters(["getSites"]),

    dragOptions() {
      return {
        animation: 200,
        group: "description",
        disabled: this.editOrder,
        ghostClass: "ghost",
      };
    },

    siteList: {
      get() {
        return this.getSites;
      },
      set(value) {
        this.updateSites(value);
      },
    },
  },
};
</script>

<style lang="scss">
.sites-edit {
  margin: 75px 0;
  padding: 50px 0;
  border-top: 1px solid var(--text-color);
  border-bottom: 1px solid var(--text-color);

  @media (max-width: 991px) {
    margin: 50px 0;
    padding: 30px 0;
  }

  @media (max-width: 576px) {
    margin: 30px 0;
  }

  .sites-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 40px;

    .site-controller {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    button.button {
      @extend %button-main;
    }
  }

  .button-edit {
    cursor: pointer;
    svg path {
      fill: var(--text-color);
    }

    &--active {
      svg path {
        fill: var(--accent);
      }
    }
  }

  .list-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;

    @media (max-width: 991px) {
      gap: 20px;
    }

    @media (max-width: 576px) {
      grid-template-columns: 1fr;
    }

    .list-group-item {
      border: 1px solid var(--input-background-hover);
      transition: border 0.2s;
      background: var(--background-power);

      &--active {
        border: 1px solid #bbbbbb;
      }
    }

    &--active {
      .list-group-item {
        cursor: move;
      }
    }

    .flip-list-move {
      transition: transform 0.5s;
    }

    .no-move {
      transition: transform 0s;
    }

    .ghost {
      opacity: 0.5;
      background: var(--input-background-hover);
    }
  }
}
</style>