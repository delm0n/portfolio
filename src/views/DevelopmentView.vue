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

export default {
  components: {
    AboutMeEdit,
    ButtonJson,
    SitesEdit,
    ModalSiteEdit,
    ResumeEdit,
  },
};
</script>


