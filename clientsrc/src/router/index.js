import Vue from "vue";
import VueRouter from "vue-router";
// @ts-ignore
import Home from "../Pages/Home.vue";
// @ts-ignore
import Profile from "../Pages/Profile.vue";
import { authGuard } from "@bcwdev/auth0-vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter: authGuard,
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: authGuard,
  },
  //  {
  //path: "/bugs/:id",
  //name: 'Bug',
  //component: () => import(/* webpackChunkName: "detbugview" */ '../pages/DetBugView.vue'),
  //beforeEnter: authGuard,
  //  }
];

const router = new VueRouter({
  routes,
});

export default router;
