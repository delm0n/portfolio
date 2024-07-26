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
  imagesContent: [],
  keywords: [],
};

export const sites = {
  state: () => ({
    sites: [],
    keyFilter: "",

    siteModal: JSON.parse(JSON.stringify(modalDefault)),
  }),
  mutations: {
    uploadDataSites(state, { sites }) {
      !!sites ? (state.sites = sites) : "";
    },

    uploadImageSites(state, { sites }) {
      state.sites.forEach((site) => {
        site.imagesContent = sites.find((el) => el.id == site.id).imagesContent;
        site.img = sites.find((el) => el.id == site.id).img;
      });
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
      // console.log(state.siteModal);
      // console.log(state.sites.find((el) => el.id == id));
      //подебажить!!!
      // !!state.sites.find((el) => el.id == id) ? state.sites.find((el) => el.id == id) = JSON.parse(JSON.stringify( state.siteModal)) : "";
    },

    addSiteModalImageContent(state, { name, src, type }) {
      state.siteModal.imagesContent.push({
        name: name,
        src: src,
        type: type,
      });
    },

    removeSiteModalImageContent(state, index) {
      state.siteModal.imagesContent.splice(index, 1);
    },

    setKeyFilter(state, value) {
      if (state.keyFilter == value) {
        state.keyFilter = "";
      } else {
        state.keyFilter = value;
      }
    },
  },
  getters: {
    getSites(state) {
      return state.sites;
    },

    getSitesView(state) {
      return state.keyFilter
        ? state.sites.filter((el) => el.keywords.includes(state.keyFilter))
        : state.sites;
    },

    getKeyFilter(state) {
      return state.keyFilter;
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

    getSiteModalImages(state) {
      return !!state.siteModal.imagesContent
        ? state.siteModal.imagesContent
        : [];
    },

    getSitesJsonNoImage(state) {
      let sitesArr = [];

      state.sites.forEach((element) => {
        sitesArr.push({
          id: element.id,
          name: element.name,
          descr: element.descr,
          link: element.link,
          page: element.page,
          path: element.path,
          keywords: element.keywords,
          imagesContent: [],
          img: {
            src: "",
            type: "",
          },
        });
      });

      return { sites: sitesArr };
    },

    getSitesJsonImage(state) {
      let sitesArr = [];

      state.sites.forEach((element) => {
        sitesArr.push({
          id: element.id,
          imagesContent: element.imagesContent,
          img: element.img,
        });
      });

      return { sites: sitesArr };
    },
  },
};
