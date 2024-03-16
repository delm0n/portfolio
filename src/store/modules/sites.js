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

  path: "",

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

    removeSite(state, index) {
      state.sites.splice(index, 1);
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
      if (!link.match(/^[a-zA-Z]+:\/\//) && link.length > 9) {
        link = "https://" + link;
      }
      state.siteModal.link = link.replace(/\s+/g, "");
    },

    setSiteModalPage(state, page) {
      if (!page.match(/^[a-zA-Z]+:\/\//) && page.length > 9) {
        page = "https://" + page;
      }
      state.siteModal.page = page.replace(/\s+/g, "");
    },

    setSiteModalPath(state, path) {
      state.siteModal.path = path.replace(/\s+/g, "");
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

    getSiteModalPath(state) {
      return state.siteModal.path;
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
