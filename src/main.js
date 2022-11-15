import BootstrapVue3 from "bootstrap-vue-3";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue';
import { createApp } from 'vue';
import router from "./router.js";
import store from './store/index.js';
import * as VeeValidate from 'vee-validate';

import BaseButton from './components/ui/BaseButton.vue';


const app = createApp(App);

app.use(BootstrapVue3);
app.use(router);
app.use(store);
app.use(VeeValidate);

app.component('base-button', BaseButton);

app.mount('#app');
