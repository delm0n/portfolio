import { createStore } from "vuex";
import { aboutMe } from "./modules/aboutMe";
import { sites } from "./modules/sites";
import { resume } from "./modules/resume";
import dataJSON from "/public/data.json";
import axios from "axios";

//проверка на undefined
function getValue(value) {
  return !!value ? value : "";
}

export default createStore({
  state: {
    prod: process.env.NODE_ENV == "production",
    pdf: false,
    mobile: window.innerWidth > 769,
    darkTheme: false,
    animation: false,
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

    wasAnimation(state) {
      return state.animation;
    },

    getPdf(state) {
      return state.pdf;
    },
  },
  mutations: {
    setMobile(state, value) {
      state.mobile = value;
    },

    changeTheme(state) {
      state.darkTheme = !state.darkTheme;
    },

    setAnimation(state) {
      state.animation = true;
    },

    setPdf(state, value) {
      state.pdf = value;
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
          educations: getValue(dataJSON.resume.educations),
        });
      }

      if (getValue(dataJSON.sites)) {
        context.commit("uploadDataSites", {
          sites: getValue(dataJSON.sites),
        });
      }
    },

    async uploadImage(context) {
      let path = context.getters.isProd
        ? "/portfolio/images.json"
        : "/images.json";

      try {
        await axios
          .get(path)
          .then(function (response) {
            // обработка успешного запроса
            context.commit("uploadImageSites", response.data);
          })
          .catch(function (e) {
            // обработка ошибки
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    },

    async uploadImageArray(context) {
      let path = context.getters.isProd
        ? "/portfolio/images-array.json"
        : "/images-array.json";

      try {
        await axios
          .get(path)
          .then(function (response) {
            // обработка успешного запроса
            context.commit("uploadImageArraySites", response.data);
          })
          .catch(function (e) {
            // обработка ошибки
            console.log(e);
          });
      } catch (e) {
        console.log(e);
      }
    },

    async checkPdf(context) {
      let path = context.getters.isProd
        ? "/portfolio/resume.pdf"
        : "/resume.pdf";

      try {
        await axios
          .get(path)
          .then(function (response) {
            // обработка успешного запроса
            context.commit("setPdf", true);
          })
          .catch(function (e) {
            // обработка ошибки
            context.commit("setPdf", false);
          });
      } catch (e) {
        console.log(e);
      }
    },
  },
  modules: {
    aboutMe: aboutMe,
    sites: sites,
    resume: resume,
  },
});
