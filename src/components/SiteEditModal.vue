<template>
  <div id="modal-site-edit">
    <div class="row">
      <div class="col">
        <label
          >Название:
          <div class="input-container">
            <input
              type="text"
              :value="getSiteModal.name"
              @input="updateName"
            /></div
        ></label>

        <label
          >О сайте:
          <div class="input-container">
            <textarea
              rows="2"
              :value="getSiteModal.descr"
              @input="updateDescr"
            /></div
        ></label>
      </div>
      <div class="col">
        <input-file
          @load-image="loadImage"
          @delete-image="deleteImage"
          :uploadImg="isEmptyImg ? copyUploadImg : [getSiteModal.img]"
        />
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

export default {
  components: { InputFile },
  mixins: [uuidv4],
  data() {
    return {
      copyUploadImg: [],
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
      "setSiteModalDescr",
      "setSiteModalImg",
      "setSiteModalId",
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
      if (this.isEmpty) {
        this.setSiteModalId(this.uuidv4());
        this.addSite(this.getSiteModal);
        this.setSiteModal();
      } else {
        this.setSite(this.getSiteModal.id);
      }
      Fancybox.close();
      this.copyUploadImg = [];
    },

    updateName(e) {
      this.setSiteModalName(e.target.value);
    },

    updateDescr(e) {
      this.setSiteModalDescr(e.target.value);
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

  label {
    font-weight: 700;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;

    &:not(:last-child) {
      margin-bottom: 20px;
    }

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