import { createRouter, createWebHistory } from "vue-router";

import TheHeader from "./pages/Location/TheMain.vue";
import RegisterBussiness from "./pages/Admin/RegisterBussiness.vue";
import NotFound from "./pages/NotFound.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { name: "home", path: "/home", component: TheHeader },
    {
      name: "manage-location",
      path: "/manage-location",
      component: RegisterBussiness,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("AccessToken");
        if (!token) next("/not-found");
        else next();
      },
    },
      { name: "notFound", path: "/:notFound(.*)", component: NotFound },
    { name: "test", path: "/test", component: NotFound },
  ],
});

export default router;
