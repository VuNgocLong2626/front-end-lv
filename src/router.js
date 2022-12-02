import { createRouter, createWebHistory } from "vue-router";

import TheHeader from "./pages/Location/TheMain.vue";
import TheAbout from "./pages/Location/TheAbout.vue";
import TheContact from "./pages/Location/TheContact.vue";
import TheAllContact from "./pages/Location/TheAllContact.vue";
import DetailItem from "./pages/Location/DetailItem.vue";
import ListItem from "./pages/Location/ListItem.vue";
import ScheduleAll from "./pages/Location/ScheduleAll.vue";



// import RegisterBussiness from "./pages/Admin/RegisterBussiness.vue";
import ManageComment from "./pages/Admin/ManageComment.vue";
import ManageAddress from "./pages/Admin/ManageAddress.vue";
import ManagePointLocation from "./pages/Admin/ManagePoint.vue";

import LoginAdmin from "./pages/Manage/LoginAdmin.vue";
import CreateAccount from "./pages/Manage/CreateAccount.vue";
import MainManage from "./pages/Manage/MainManage.vue";
import ManageFeedback from "./pages/Manage/ManageFeedback.vue";
import RegisterAddress from "./pages/Manage/RegisterAddress.vue";
import ManageAccount from "./pages/Manage/ManageAccount.vue";


import NotFound from "./pages/NotFound.vue";
// import store from "@/store";
// import axios from "axios";

let token = localStorage.getItem("AccessToken");

// function getInfo() {
//   let url = "/account/get-info";
//   axios
//     .get(url, { headers: { Authorization: `Bearer ${token}` } })
//     .then(function (response) {
//       let responseData = response.data;
//       console.log(responseData);
//     })
//     .catch(function (response) {
//       console.log(response.response);
//     });
// }

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/home" },
    { name: "home", path: "/home", component: TheHeader },
    { name: "about", path: "/about", component: TheAbout },
    { name: "contact", path: "/contact", component: TheContact },
    { name: "allcontact", path: "/client", component: TheAllContact },
    { name: "pakages", path: "/Pakages", component: ListItem },
    { name: "schedule", path: "/schedule", component: ScheduleAll },
    { name: "DetailItem", path: "/detail-item/:id", component: DetailItem },
    {
      name: "manage-location",
      path: "/manage-location",
      component: ManageAddress,
      beforeEnter: (to, from, next) => {
        if (!token) next("/not-found");
        else next();
      },
    },
    {
      name: "manage-comments",
      path: "/manage-comments",
      component: ManageComment,
      beforeEnter: (to, from, next) => {
        let token = localStorage.getItem("AccessToken");
        if (!token) next("/not-found");
        else next();
      },
    },
        {
      name: "managePoint",
      path: "/manage-Point",
      component: ManagePointLocation,
    },
    // {
    //   name: "manage-address",
    //   path: "/manage-location",
    //   component: ManageAddress,
    //   beforeEnter: (to, from, next) => {
    //     let token = localStorage.getItem("AccessToken");
    //     if (!token) next("/not-found");
    //     else next();
    //   },
    // },
    { name: "loginAdmin", path: "/admin/login", component: LoginAdmin },
    {
      name: "mainManage",
      path: "/admin/home",
      component: MainManage,
      //   beforeEnter: (to, from, next) => {
      //     // let token = localStorage.getItem("AccessToken");
      //     store.commit("info/resetInfo");
      //     console.log(store.getters["info/permission"]);
      //     getInfo();
      //     // if (!(store.getters["info/permission"] === "Admin")) next("/not-found");
      //     next();
      //   },
    },
    {
      name: "manageFeedback",
      path: "/admin/manage-feedback",
      component: ManageFeedback,
    },
    {
      name: "createAccount",
      path: "/admin/create-account",
      component: CreateAccount,
    },
    {
      name: "createAddress",
      path: "/admin/create-address",
      component: RegisterAddress,
    },
    {
      name: "manageAccount",
      path: "/admin/manage-account",
      component: ManageAccount,
    },
    { name: "notFound", path: "/:notFound(.*)", component: NotFound },
    { name: "test", path: "/test", component: NotFound },
  ],
});

export default router;
