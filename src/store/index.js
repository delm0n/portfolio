import { createStore } from "vuex";
import { aboutMe } from "./modules/aboutMe";
import { sites } from "./modules/sites";
import { resume } from "./modules/resume";
import dataJSON from "/public/data.json";

//проверка на undefined
function getValue(value) {
  return !!value ? value : "";
}

export default createStore({
  state: {
    prod: process.env.NODE_ENV == "production",
    mobile: window.innerWidth > 769,
    darkTheme: false,
  },
  getters: {
    isProd(state) {
      return state.prod;
    },

    getMobile(state) {
      return state.mobile;
    },

    getTheme(state) {
      return state.darkTheme;
    },
  },
  mutations: {
    setMobile(state, value) {
      state.mobile = value;
    },

    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
    },
  },
  actions: {
    uploadData(context) {
      if (getValue(dataJSON.aboutMe)) {
        context.commit("uploadDataAboutMe", {
          title: getValue(dataJSON.aboutMe.title),
          subtitle: getValue(dataJSON.aboutMe.subtitle),
          ref: getValue(dataJSON.aboutMe.ref),
        });
      }

      if (getValue(dataJSON.resume)) {
        context.commit("uploadDataResume", {
          name: getValue(dataJSON.resume.name),
          city: getValue(dataJSON.resume.city),
          birthday: getValue(dataJSON.resume.birthday),
          about: getValue(dataJSON.resume.about),
          works: getValue(dataJSON.resume.works),
          image: getValue(dataJSON.resume.image),
        });
      }

      if (getValue(dataJSON.sites)) {
        context.commit("uploadDataSites", {
          sites: getValue(dataJSON.sites),
        });
      }
    },
  },
  modules: {
    aboutMe: aboutMe,
    sites: sites,
    resume: resume,
  },
});
