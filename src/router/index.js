import { createRouter, createWebHistory } from "vue-router";
import DevelopmentView from "../views/DevelopmentView.vue";
import LandingView from "../views/LandingView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: DevelopmentView,
  },
  {
    path: "/landing",
    name: "landing",
    component: () =>
      import(/* webpackChunkName: "landing" */ "../views/LandingView.vue"),
  },

  {
    path: "/site/:path",
    name: "site",
    component: () =>
      import(/* webpackChunkName: "site" */ "../views/SiteView.vue"),
  },
];

const routesBuild = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },

  {
    path: "/site/:path",
    name: "site",
    component: () =>
      import(/* webpackChunkName: "site" */ "../views/SiteView.vue"),
  },
];

const router = createRouter({
  history:
    process.env.NODE_ENV == "development"
      ? createWebHistory("")
      : createWebHistory("/portfolio/"),
  // history: createWebHistory(process.env.BASE_URL),
  routes: process.env.NODE_ENV == "development" ? routes : routesBuild,
});

export default router;
