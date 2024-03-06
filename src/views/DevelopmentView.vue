<template>
  <div>
    <about-me-edit />
    <button-json />
    <sites-edit />

    <modal-site-edit />
  </div>
</template>

<script>
import AboutMeEdit from "@/components/AboutMeEdit.vue";
import ButtonJson from "@/components/ButtonJson.vue";
import SitesEdit from "@/components/SitesEdit.vue";
import ModalSiteEdit from "@/components/SiteEditModal.vue";

export default {
  components: {
    AboutMeEdit,
    ButtonJson,
    SitesEdit,
    ModalSiteEdit,
  },
};
</script>