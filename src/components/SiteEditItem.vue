<template>
  <div class="site-edit-item">
    <div class="site-edit-item__img">
      <collapse :when="showImage" class="v-collapse">
        <div class="img-wrap" :style="background"></div>
      </collapse>
    </div>
    <div class="site-edit-item__content">
      <p class="site-name">
        {{ site.name }}
      </p>

      <div @click="editSite(site.id)" class="edit-info-button">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="40px"
          height="40px"
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
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse } from "vue-collapsed";
import { mapMutations } from "vuex";

export default {
  components: {
    Collapse,
  },
  props: {
    site: Object,
    showImage: Boolean,
  },
  methods: {
    ...mapMutations(["setSiteModal"]),

    editSite(id) {
      this.setSiteModal(id);

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
  },

  computed: {
    background() {
      // console.log(this.site);

      return this.site.img.src
        ? "background: url(" + this.site.img.src + ") center/cover no-repeat"
        : "background: rgba(238, 238, 238, 0.6)";
    },
  },
};
</script>

<style lang="scss">
.site-edit-item {
  .v-collapse {
    transition: height 500ms ease-out;
    /* or transition: height var(--vc-auto-duration) ease-in-out */
  }

  .edit-info-button {
    cursor: pointer;
    @extend %svg-theme;
  }

  &__img .img-wrap {
    width: 100%;
    aspect-ratio: 1920/1200;
    background: var(--input-background);
    transition: all 0.3s;
    background-size: cover;
    background-position: center;
  }

  &__content {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 20px;
    @media (max-width: 576px) {
      margin-bottom: 10px;
    }

    .site-name {
      @include fluidFontSize(16, 22, 320, 1920);
      font-weight: 500;
      color: var(--text-color);
    }
  }
}
</style>