<template>
  <div>
    <about-me-edit />

    <resume-edit />
    <sites-edit />

    <modal-site-edit />
    <button-json />
  </div>
</template>

<script>
import AboutMeEdit from "@/components/AboutMeEdit.vue";
import ButtonJson from "@/components/ButtonJson.vue";
import SitesEdit from "@/components/SitesEdit.vue";
import ModalSiteEdit from "@/components/SiteEditModal.vue";
import ResumeEdit from "@/components/ResumeEdit.vue";
import { mapMutations } from "vuex";

import "swiper/scss";
import "swiper/scss/effect-fade";

export default {
  components: {
    AboutMeEdit,
    ButtonJson,
    SitesEdit,
    ModalSiteEdit,
    ResumeEdit,
  },

  methods: {
    ...mapMutations(["setAnimation"]),
  },

  mounted() {
    this.$nextTick(function () {
      this.setAnimation();
      setTimeout(() => {
        document.getElementById("#loader").classList.remove("load");
        document.body.classList.remove("preload");
      }, 500);
    });
  },
};
</script>

<style lang="scss">
.dev-title {
  @include fluidFontSize(18, 28, 320, 1920);
  color: var(--text-color);
  margin: 40px 0 20px;

  &.first {
    margin-top: 0;
  }
}

.checkbox {
  position: relative;
  display: flex;
  align-items: center;
  column-gap: 10px;
  width: max-content;
  max-width: 100%;
  cursor: pointer;

  input {
    position: absolute;
    visibility: hidden;
    width: 1px;
    height: 1px;
  }

  div.box {
    width: 26px;
    height: 26px;
    border: 1px solid #bbbbbb;

    background-color: var(--background);
    transition: 0.3s all;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    @media (max-width: 576px) {
      width: 20px;
      height: 20px;

      svg {
        width: 14px;
        height: 12px;
      }
    }

    svg path {
      display: none;
    }
  }

  &:hover {
    input[type="checkbox"]:not(:checked) + div {
      background-color: var(--input-background-hover);
    }
  }

  input[type="checkbox"]:checked + div {
    background-color: var(--accent);
    border: 1px solid var(--accent);
    svg path {
      display: block;
      stroke-dasharray: 700;
      animation: dash 2.3s linear alternate 1;
    }
  }
}

@keyframes dash {
  0% {
    stroke-dashoffset: 822;
  }

  100% {
    stroke-dashoffset: 0;
  }
}
</style>


