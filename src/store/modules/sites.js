let modalDefault = {
  id: "",
  name: "",
  descr: "",

  link: "",
  page: "",

  img: {
    src: "",
    type: "",
  },

  keywords: [],
};

export const sites = {
  state: () => ({
    sites: [],

    siteModal: JSON.parse(JSON.stringify(modalDefault)),
  }),
  mutations: {
    uploadDataSites(state, { sites }) {
      if (sites) {
        state.sites = sites;
      }
    },

    updateSites(state, value) {
      state.sites = value;
    },

    addSite(state, site) {
      state.sites.push(site);
    },

    setSiteModalId(state, id) {
      state.siteModal.id = id;
    },

    setSiteModalName(state, name) {
      state.siteModal.name = name;
    },

    setSiteModalLink(state, link) {
      state.siteModal.link = link;
    },

    setSiteModalPage(state, page) {
      state.siteModal.page = page;
    },

    removeSiteModalKeywords(state, index) {
      state.siteModal.keywords.splice(index, 1);
    },

    addSiteModalKeywords(state, keywords) {
      state.siteModal.keywords.push(keywords);
    },

    setSiteModalDescr(state, descr) {
      state.siteModal.descr = descr;
    },

    setSiteModalImg(state, { type, src }) {
      state.siteModal.img.src = src;
      state.siteModal.img.type = type;
    },

    setSiteModal(state, id) {
      console.log(Boolean(id));
      console.log(modalDefault);
      state.siteModal = Boolean(id)
        ? JSON.parse(JSON.stringify(state.sites.find((el) => el.id == id)))
        : JSON.parse(JSON.stringify(modalDefault));
    },

    setSite(state, id) {
      Object.assign(
        state.sites.find((el) => el.id == id),
        state.siteModal
      );
    },
  },
  getters: {
    getSites(state) {
      return state.sites;
    },

    getSitesCount(state) {
      return state.sites.length;
    },

    getSiteModal(state) {
      return state.siteModal;
    },

    getSiteModalName(state) {
      return state.siteModal.name;
    },

    getSiteModalLink(state) {
      return state.siteModal.link;
    },

    getSiteModalPage(state) {
      return state.siteModal.page;
    },

    getSiteModalKeywords(state) {
      return state.siteModal.keywords;
    },

    getSiteModalDescr(state) {
      return state.siteModal.descr;
    },

    getSitesJson(state) {
      return { sites: state.sites };
    },
  },
};
