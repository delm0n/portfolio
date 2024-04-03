<template>
  <div class="upload-area" v-bind:class="{ 'upload-area_enabel': imgsLength }">
    <input
      v-on:change="onFileChange"
      type="file"
      class="drop-zoon__file-input"
      accept="image/*"
      v-tabindex
      v-bind:disabled="!imgsLength"
    />

    <div v-if="imgsLength">
      <div class="drop-zoon__text-wrap">
        <p class="drop-zoon__paragraph">
          Нажмите, чтобы добавить картинку
          <span v-if="!!resolution" style="opacity: 0.6; font-weight: 400">
            <br />
            {{ resolution }}
          </span>
        </p>
      </div>
    </div>

    <div v-else class="dropZoon__img-container">
      <div
        v-for="item in uploadImg"
        v-bind:key="item.id"
        class="dropZoon__img-item"
        v-on:click.prevent
      >
        <img
          style="width: 100; height: 100"
          class="Image-input__image"
          :src="item.src"
        />
        <button v-on:click.prevent="deleteImg(item.id)">
          <svg
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
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Collapse } from "vue-collapsed";

export default {
  components: { Collapse },

  props: {
    uploadImg: Object,
    resolution: String,
  },

  computed: {
    imgsLength() {
      return this.uploadImg.length < 1;
    },
  },

  directives: {
    tabindex: {
      inserted(el) {
        el.setAttribute("tabindex", 0);
      },
    },
  },

  methods: {
    onFileChange: function (e) {
      if (this.uploadImg.length < 5) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;
        this.createImage(files[0]);
        e.target.value = "";
      } else {
        e.preventDefault();
      }
    },

    createImage: function (file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.$emit("load-image", {
          src: e.target.result,
          type: file.type,
        });
      };

      reader.readAsDataURL(file);
    },

    deleteImg() {
      this.$emit("delete-image");
    },
  },
};
</script>

<style lang="scss">
.upload-area {
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  aspect-ratio: 1.1 / 1;
  // max-width: 500px;
  width: 100%;
  display: flex;
  position: relative;
  transition: all 0.3s ease;

  background: var(--input-background);
  border: 1px solid #bbbbbb;
  border-radius: 0px;
  min-height: 58px;

  &_enabel {
    cursor: pointer;
  }

  .drop-zoon__file-input {
    position: absolute;
    width: 100%;
    cursor: pointer;
    height: 100%;
    opacity: 0;
  }

  .drop-zoon__text-wrap {
    padding-bottom: 5px;
    transition: 0.3s all;

    p {
      @include fluidFontSize(16, 20, 320, 1920);
      font-weight: 400;
      font-size: 20px;
      text-align: center;
      color: var(--text-color);
    }
  }

  .dropZoon__img-container {
    width: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;
    row-gap: 10px;
    transition: 0.3s all;
    height: 100%;

    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
  }

  .dropZoon__img-item {
    // position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    padding: 20px;
    justify-content: center;

    img {
      max-width: 100%;
      height: 100%;
      // max-height: 100%;
      display: block;
      // margin: 0 auto;
      // height: auto;
      object-fit: contain;
    }

    button {
      position: absolute;
      top: 25px;
      right: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background-color: #fbfbfb;
      color: #1e1e1e;
      opacity: 0.6;
      cursor: pointer;
      transition: 0.3s all;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>