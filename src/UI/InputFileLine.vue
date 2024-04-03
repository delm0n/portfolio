<template>
  <div class="input-file-line">
    <p class="resolution" v-html="resolution"></p>

    <input
      v-on:change="onFileChange"
      type="file"
      accept="image/*"
      v-tabindex
      class="file-input"
      :multiple="limit > 1"
      :disabled="false"
      title=""
    />

    <!-- v-if="!!uploadImg.name" -->
    <div class="file-info" v-for="(item, index) in uploadImg" :key="index">
      <p v-text="item.name"></p>
      <svg
        @click="deleteImg(index)"
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
  </div>
</template>

<script>
export default {
  props: {
    resolution: {
      type: String,
      default: "Загрузть картинку",
    },
    limit: {
      type: Number,
      default: 1,
    },
    uploadImg: Object,
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
      if (this.uploadImg.length < this.limit) {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length) return;

        for (let index = 0; index < files.length; index++) {
          this.createImage(files[index]);
        }

        e.target.value = "";
      } else {
        e.preventDefault();
      }
    },

    createImage: function (file) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.$emit("load-image", {
          name: file.name,
          src: e.target.result,
          type: file.type,
        });
      };

      reader.readAsDataURL(file);
    },

    deleteImg(index) {
      this.$emit("delete-image", index);
    },
  },
};
</script>

<style lang="scss">
.input-file-line {
  position: relative;
  cursor: pointer;

  .file-input {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    cursor: pointer !important;
  }

  .file-info {
    display: flex;
    align-items: center;
    gap: 20px;
    padding-top: 10px;

    p {
      word-break: break-all;
    }

    svg {
      position: relative;
      transition: 0.3s all;
      z-index: 5;
      @extend %icon-close;
    }
  }

  p {
    color: var(--text-color);

    span {
      opacity: 0.6;
      font-weight: 400;
    }
  }
}
</style>