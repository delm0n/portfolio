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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/LandingView.vue"),
  },
];

const routesBuild = [
  {
    path: "/",
    name: "home",
    component: LandingView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: process.env.NODE_ENV == "development" ? routes : routesBuild,
});

export default router;
