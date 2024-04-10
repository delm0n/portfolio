<template>
  <div id="modal-site-edit">
    <button
      @click="closeModal()"
      class="carousel__button is-close is-close-true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1">
        <path d="M20 20L4 4m16 0L4 20"></path>
      </svg>
    </button>

    <div class="row">
      <div class="col">
        <div class="input-item">
          <label>
            <span> Название: </span>
            <div class="input-container">
              <input
                type="text"
                :value="getSiteModal.name"
                @input="updateName"
              /></div
          ></label>

          <collapse :when="errors.name">
            <p class="error-par">Поле название обязательно!</p>
          </collapse>
        </div>

        <div class="input-item">
          <label>
            <span> О сайте: </span>
            <div class="input-container">
              <textarea
                rows="6"
                :value="getSiteModal.descr"
                @input="updateDescr"
              /></div
          ></label>

          <collapse :when="errors.descr">
            <p class="error-par">Поле о сайте обязательно!</p>
          </collapse>
        </div>

        <key-words
          @add-keyword="addKeyword"
          @remove-keyword="removeKeyword"
          :keywords="getSiteModal.keywords"
          class="input-item"
        />

        <div class="input-item">
          <label>
            <span>Ссылка на сайт: </span>
            <div class="input-container">
              <input
                type="text"
                :value="getSiteModal.link"
                @input="updateLink"
              /></div
          ></label>
        </div>

        <div class="input-item">
          <label>
            <span> Ссылка на github pages: </span>
            <div class="input-container">
              <input
                type="text"
                :value="getSiteModal.page"
                @input="updatePage"
              /></div
          ></label>

          <collapse :when="errors.link">
            <p class="error-par">Одна из двух ссылок обязательна!</p>
          </collapse>
        </div>

        <div class="input-item">
          <label>
            <span>path: </span>
            <div class="input-container">
              <input
                type="text"
                :value="getSiteModal.path"
                @input="updatePath"
              /></div
          ></label>

          <collapse :when="errors.path">
            <p class="error-par">Укажите уникальное имя пути!</p>
          </collapse>
        </div>
      </div>

      <div class="col">
        <label
          ><p class="hid">Загрузить картинку:</p>
          <input-file-preview
            :resolution="'1920 x 1200'"
            @load-image="loadImage"
            @delete-image="deleteImage"
            :uploadImg="isEmptyImg ? copyUploadImg : [getSiteModal.img]"
          />
        </label>

        <input-file-line
          class="label-images"
          :resolution="'Нажмите, чтобы загрузить картинки на страницу сайта</span>'"
          :limit="16"
          @load-image="loadImageContent"
          @delete-image="deleteImageContent"
          :uploadImg="getSiteModalImages"
        />
      </div>

      <div class="buttons-wrapper">
        <button @click="save()" class="button">
          {{ isEmpty ? "Добавить" : "Сохранить" }}
        </button>

        <button v-if="!isEmpty" @click="remove(getSiteModal.id)" class="button">
          Удалить
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import InputFilePreview from "@/UI/InputFilePreview.vue";
import uuidv4 from "@/mixins/uuidv4";
import { mapGetters, mapMutations } from "vuex";
import { Collapse } from "vue-collapsed";
import KeyWords from "@/UI/KeyWords.vue";
import InputFileLine from "@/UI/InputFileLine.vue";

export default {
  components: { InputFilePreview, Collapse, KeyWords, InputFileLine },
  mixins: [uuidv4],
  data() {
    return {
      copyUploadImg: [],
      errors: {
        name: false,
        descr: false,
        link: false,
        path: false,
      },
    };
  },

  computed: {
    ...mapGetters(["getSiteModal", "getSites", "getSiteModalImages"]),

    isEmpty() {
      return this.getSiteModal.id == "";
    },

    isEmptyImg() {
      return this.getSiteModal.img.src == "";
    },
  },

  methods: {
    ...mapMutations([
      "addSite",
      "setSite",
      "setSiteModal",
      "setSiteModalName",
      "setSiteModalLink",
      "setSiteModalPage",
      "setSiteModalDescr",
      "setSiteModalImg",
      "setSiteModalId",
      "removeSiteModalKeywords",
      "addSiteModalKeywords",
      "removeSite",
      "setSiteModalPath",
      "addSiteModalImageContent",
      "removeSiteModalImageContent",
    ]),

    loadImageContent(img) {
      this.addSiteModalImageContent({
        name: img.name,
        src: img.src,
        type: img.type,
      });
    },

    deleteImageContent(index) {
      this.removeSiteModalImageContent(index);
    },

    loadImage(img) {
      this.copyUploadImg.push(img);
      this.setSiteModalImg({ type: img.type, src: img.src });
    },

    deleteImage() {
      this.copyUploadImg = [];
      this.setSiteModalImg({ type: "", src: "" });
    },

    save() {
      if (this.getSiteModal.name == "") {
        this.errors.name = true;
      }

      if (this.getSiteModal.descr == "") {
        this.errors.descr = true;
      }

      if (this.getSiteModal.link == "" && this.getSiteModal.page == "") {
        this.errors.link = true;
      }

      if (this.getSiteModal.path == "") {
        this.errors.path = true;
      } else {
        if (
          Boolean(
            this.getSites.find((el) => el.path == this.getSiteModal.path)
          ) &&
          this.isEmpty
        ) {
          this.errors.path = true;
        }
      }

      if (
        !this.errors.link &&
        !this.errors.descr &&
        !this.errors.name &&
        !this.errors.path
      ) {
        if (this.isEmpty) {
          this.setSiteModalId(this.uuidv4());
          this.addSite(this.getSiteModal);
          this.setSiteModal();
        } else {
          this.setSite(this.getSiteModal.id);
        }
        this.closeModal();
      }
    },

    remove(index) {
      this.removeSite(index);
      this.closeModal();
    },

    updateName(e) {
      this.errors.name = false;
      this.setSiteModalName(e.target.value);
    },

    updateDescr(e) {
      this.errors.descr = false;

      this.setSiteModalDescr(e.target.value);
    },

    updatePage(e) {
      this.errors.link = false;
      this.setSiteModalPage(e.target.value);
    },

    updatePath(e) {
      this.errors.path = false;
      this.setSiteModalPath(e.target.value);
    },

    updateLink(e) {
      this.errors.link = false;
      this.setSiteModalLink(e.target.value);
    },

    addKeyword(key) {
      this.addSiteModalKeywords(key);
    },

    removeKeyword(index) {
      this.removeSiteModalKeywords(index);
    },

    closeModal() {
      Fancybox.close();
      this.copyUploadImg = [];
      this.errors = {
        name: false,
        descr: false,
        link: false,
      };
    },
  },
};
</script>

<style lang="scss">
#modal-site-edit {
  @extend %modal;
  max-width: 1280px;
  background: var(--background);
  padding: 50px 30px 30px;

  @media (max-width: 576px) {
    padding: 40px 20px 30px;
  }

  * {
    font-family: "Montserrat", sans-serif;
  }

  .is-close-true {
    display: flex !important;
  }

  .error-par {
    padding-top: 6px;
    color: var(--accent);
    @include fluidFontSize(14, 18, 320, 1920);
  }

  .input-item {
    margin-bottom: 20px;
  }

  label {
    @extend %label-container;

    span {
      @include fluidFontSize(16, 20, 320, 1920);
    }
    margin-bottom: 0 !important;

    .input-container {
      @extend %input-container;
    }

    p.hid {
      opacity: 0;

      @media (max-width: 768px) {
        display: none;
      }
    }
  }

  .label-images {
    margin-top: 20px;

    .resolution {
      @include fluidFontSize(16, 20, 320, 1920);
    }
  }

  .buttons-wrapper {
    grid-column: 1/3;
    margin: 0 auto;
    gap: 20px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-evenly;

    @media (max-width: 768px) {
      margin-top: 30px;
    }

    .button {
      @extend %button-main;
    }
  }

  .row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 30px;

    @media (max-width: 768px) {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }
  }
}
</style>