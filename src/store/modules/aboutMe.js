export const aboutMe = {
  state: () => ({
    aboutMe: {
      title: "",
      subtitle: "",
      ref: "",
    },
  }),
  mutations: {
    uploadDataAboutMe(state, { title, subtitle, ref }) {
      !!title ? (state.aboutMe.title = title) : "";
      !!subtitle ? (state.aboutMe.subtitle = subtitle) : "";
      !!ref ? (state.aboutMe.ref = ref) : "";
    },

    updateAboutMeTitle(state, value) {
      state.aboutMe.title = value;
    },

    updateAboutMeSubtitle(state, value) {
      state.aboutMe.subtitle = value;
    },

    updateAboutMeRef(state, value) {
      if (!value.match(/^[a-zA-Z]+:\/\//) && value.length > 9) {
        value = "https://" + value;
      }

      state.aboutMe.ref = value.replace(/\s+/g, "");
    },
  },
  getters: {
    getAboutMeTitle(state) {
      return state.aboutMe.title;
    },

    getAboutMeSubtitle(state) {
      return state.aboutMe.subtitle;
    },

    getAboutMeRef(state) {
      return state.aboutMe.ref;
    },

    getAboutMeJson(state) {
      return { aboutMe: state.aboutMe };
    },
  },
};
