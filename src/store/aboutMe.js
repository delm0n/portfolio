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
      if (title && subtitle) {
        state.aboutMe.title = title;
        state.aboutMe.subtitle = subtitle;
        state.aboutMe.ref = ref;
      }
    },

    updateAboutMeTitle(state, value) {
      state.aboutMe.title = value;
    },

    updateAboutMeSubtitle(state, value) {
      state.aboutMe.subtitle = value;
    },

    updateAboutMeRef(state, value) {
      state.aboutMe.ref = value;
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
      return JSON.stringify({ aboutMe: state.aboutMe });
    },
  },
};
