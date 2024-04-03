import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import ScrollToPlugin from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
gsap.config({ nullTargetWarn: false });

createApp(App)
  .use(store)
  .use(router)
  .mixin({
    created: function () {
      this.gsap = gsap;
    },
  })
  .mount("#app");
