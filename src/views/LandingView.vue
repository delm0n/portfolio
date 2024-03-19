<template>
  <div>
    <about-me />
    <sites />
    <my-footer />
  </div>
</template>

<script>
import AboutMe from "@/components/AboutMe.vue";
import Sites from "@/components/Sites.vue";
import MyFooter from "@/components/MyFooter.vue";

export default {
  components: {
    AboutMe,
    Sites,
    MyFooter,
  },
};
</script>
