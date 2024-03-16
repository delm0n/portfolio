import { createStore } from "vuex";
import { aboutMe } from "./modules/aboutMe";
import { sites } from "./modules/sites";

import dataJSON from "/public/data.json";

//проверка на undefined
function getValue(value) {
  return value ? value : "";
}

export default createStore({
  state: {
    prod: process.env.NODE_ENV == "production",
    mobile: window.innerWidth > 769,
  },
  getters: {
    isProd(state) {
      return state.prod;
    },

    getMobile(state) {
      return state.mobile;
    },
  },
  mutations: {
    setMobile(state, value) {
      state.mobile = value;
    },
  },
  actions: {
    uploadData(context) {
      context.commit("uploadDataAboutMe", {
        title: getValue(dataJSON.aboutMe.title),
        subtitle: getValue(dataJSON.aboutMe.subtitle),
        ref: getValue(dataJSON.aboutMe.ref),
      });

      context.commit("uploadDataSites", {
        sites: getValue(dataJSON.sites),
      });
    },
  },
  modules: {
    aboutMe: aboutMe,
    sites: sites,
  },
});
