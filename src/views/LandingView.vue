<template>
  <div>
    <about-me />
    <resume />
    <sites />
    <my-footer />
  </div>
</template>

<script>
import { defineAsyncComponent } from "vue";
import AboutMe from "@/components/AboutMe.vue";
// import Sites from "@/components/Sites.vue";
// import MyFooter from "@/components/MyFooter.vue";
import Resume from "@/components/Resume.vue";
import { mapGetters, mapMutations } from "vuex";

export default {
  components: {
    AboutMe,
    Resume,
    // Sites,
    // MyFooter,
    Sites: defineAsyncComponent(() => import("@/components/Sites.vue")),
    MyFooter: defineAsyncComponent(() => import("@/components/MyFooter.vue")),
  },
  computed: {
    ...mapGetters(["getAboutMeRef", "wasAnimation", "isProd"]),
  },
  methods: {
    hidePreloader() {
      document.getElementById("#loader").classList.remove("load");
      document.body.classList.remove("preload");
    },

    ...mapMutations(["setAnimation"]),
  },

  mounted() {
    this.$nextTick(function () {
      let tl = this.gsap.timeline();
      if (!this.wasAnimation) {
        setTimeout(
          () => {
            tl.fromTo(
              ".toggle-container",
              {
                opacity: 0,
              },
              {
                duration: 0.8,
                opacity: 1,
                delay: 1,
                onStart: () => {
                  this.hidePreloader();
                },
              }
            );

            tl.fromTo(
              ["header .header-wrapper h1", "header .header-wrapper h2"],
              {
                opacity: 0,
              },
              {
                duration: 1,
                opacity: 1,
                stagger: 0.6,
                onComplete: () => {
                  if (
                    this.getAboutMeRef &&
                    !!document.querySelector(".button_ref")
                  ) {
                    document
                      .querySelector(".button_ref")
                      .classList.add("active");
                  }
                },
              }
            );

            tl.fromTo(
              ["section.resume", "section.sites"],
              {
                opacity: 0,
              },
              {
                duration: 1.2,
                opacity: 1,
                stagger: 0.6,
                onComplete: () => {
                  this.setAnimation();
                },
              }
            );
          },
          this.isProd ? 2000 : 500
        );
      } else {
        setTimeout(() => {
          if (this.getAboutMeRef && !!document.querySelector(".button_ref")) {
            document.querySelector(".button_ref").classList.add("active");
          }
        }, 450);
      }
    });
  },
};
</script>
