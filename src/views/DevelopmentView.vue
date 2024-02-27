<template>
  <div>
    <about-me-edit />
    <button-json />

    <!-- <input-file /> -->
  </div>
</template>

<script>
import AboutMeEdit from "@/components/AboutMeEdit.vue";
import ButtonJson from "@/components/ButtonJson.vue";
import InputFile from "@/UI/InputFile.vue";

export default {
  components: {
    AboutMeEdit,
    ButtonJson,
    InputFile,
  },
};
</script>