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

    <collapse :when="imgsLength">
      <div class="drop-zoon__text-wrap">
        <p class="drop-zoon__paragraph">Нажмите, чтобы добавить картинку</p>
      </div>
    </collapse>

    <collapse :when="Boolean(uploadImg.length)" style="width: 100%">
      <div class="dropZoon__img-container">
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
          </button>
        </div>
      </div>
    </collapse>
  </div>
</template>

<script>
import { Collapse } from "vue-collapsed";

export default {
  components: { Collapse },

  data() {
    return {
      uploadImg: [],
    };
  },
  computed: {
    imgsLength() {
      if (this.uploadImg.length < 1) {
        return true;
      } else {
        return false;
      }
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
        // if (files[0].size > 512000) {
        //   alert("Максимальный размер файла 512Кбайт");
        //   return;
        // }
        if (!files.length) return;
        this.createImage(files[0]);
        e.target.value = "";
      } else {
        e.preventDefault();
      }
    },
    createImage: function (file) {
      //тип картинки
      console.log(file.type);
      let reader = new FileReader();
      let vm = this;
      reader.onload = function (e) {
        vm.uploadImg.push({
          id: Date.now(),
          name: file.name,
          size: file.size,
          src: e.target.result,
        });
      };
      reader.readAsDataURL(file);
    },
    deleteImg(deleteId) {
      let index = this.uploadImg.findIndex((el) => el.id == deleteId);
      if (index >= 0) {
        this.uploadImg.splice(index, 1);
      }
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
  max-width: 500px;
  width: 100%;
  display: flex;
  position: relative;
  transition: all 0.3s ease;

  @extend %input-container;

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
    margin-top: 5px;
    row-gap: 10px;
    transition: 0.3s all;

    @media (max-width: 767px) {
      flex-wrap: wrap;
    }
  }

  .dropZoon__img-item {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    background: rgba(0, 0, 0, 0.1);

    img {
      width: 100%;
      height: auto;
      object-fit: cover;
    }

    button {
      position: absolute;
      top: 5px;
      right: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 15px;
      height: 15px;
      background-color: #bbbbbb;
      color: #1e1e1e;
      opacity: 0.6;
      border-radius: 3px;
      cursor: pointer;
      transition: 0.3s all;

      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>