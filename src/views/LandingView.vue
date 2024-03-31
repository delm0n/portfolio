<template>
  <div>
    <about-me />
    <resume />
    <sites />
    <my-footer />
  </div>
</template>

<script>
import AboutMe from "@/components/AboutMe.vue";
import Sites from "@/components/Sites.vue";
import MyFooter from "@/components/MyFooter.vue";
import Resume from "@/components/Resume.vue";

export default {
  components: {
    AboutMe,
    Sites,
    MyFooter,
    Resume,
  },
};
</script>
