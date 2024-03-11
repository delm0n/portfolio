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
          <label
            >Название:
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
          <label
            >О сайте:
            <div class="input-container">
              <textarea
                rows="4"
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
          <label
            >Ссылка на сайт:
            <div class="input-container">
              <input
                type="text"
                :value="getSiteModal.link"
                @input="updateLink"
              /></div
          ></label>
        </div>

        <div class="input-item">
          <label
            >Ссылка на github pages:
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
      </div>
      <div class="col">
        <label
          ><p style="opacity: 0">Загрузить картинку:</p>
          <input-file
            @load-image="loadImage"
            @delete-image="deleteImage"
            :uploadImg="isEmptyImg ? copyUploadImg : [getSiteModal.img]"
          />
        </label>
      </div>

      <button @click="save()" class="button">
        {{ isEmpty ? "Добавить" : "Сохранить" }}
      </button>
    </div>
  </div>
</template>

<script>
import InputFile from "@/UI/InputFile.vue";
import uuidv4 from "@/mixins/uuidv4";
import { mapGetters, mapMutations } from "vuex";
import { Collapse } from "vue-collapsed";
import KeyWords from "@/UI/KeyWords.vue";

export default {
  components: { InputFile, Collapse, KeyWords },
  mixins: [uuidv4],
  data() {
    return {
      copyUploadImg: [],
      errors: {
        name: false,
        descr: false,
        link: false,
      },
    };
  },

  computed: {
    ...mapGetters(["getSiteModal"]),

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
    ]),

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

      if (!this.errors.link && !this.errors.descr && !this.errors.name) {
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
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    @include fluidFontSize(16, 20, 320, 1920);
    color: var(--text-color);

    .input-container {
      @extend %input-container;
    }
  }

  .button {
    @extend %button-main;

    grid-column: 1/3;
    margin: 0 auto;
  }

  .row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
}
</style>