import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

// import LazyLoad from "vanilla-lazyload";

createApp(App)
  .use(store)
  .use(router)
  .mixin({
    created: function () {
      this.gsap = gsap;
      // this.lazyLoad = new LazyLoad();
    },
    mounted: function () {
      // setTimeout(() => {
      //   (function () {
      //     var lazyLoadInstance = new LazyLoad();
      //   })();
      // }, 100);
      // this.$nextTick(() => {
      //   this.lazyLoad.update();
      // });
    },
  })
  .mount("#app");
