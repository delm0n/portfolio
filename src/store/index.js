import { createStore } from "vuex";
import { aboutMe } from "./aboutMe";
import dataJSON from "/public/data.json";

//проверка на undefined
function getValue(value) {
  return value ? value : "";
}

export default createStore({
  state: {
    prod: process.env.NODE_ENV == "production",
  },
  getters: {
    isProd(state) {
      return state.prod;
    },
  },
  mutations: {},
  actions: {
    uploadData(context) {
      context.commit("uploadDataAboutMe", {
        title: getValue(dataJSON.aboutMe.title),
        subtitle: getValue(dataJSON.aboutMe.subtitle),
        ref: getValue(dataJSON.aboutMe.ref),
      });
    },
  },
  modules: {
    aboutMe: aboutMe,
  },
});
