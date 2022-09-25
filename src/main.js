import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

import App from './App.vue';
import { createApp } from 'vue';

import BaseButton from './components/ui/BaseButton.vue';


const app = createApp(App);

app.component('base-button', BaseButton);

app.mount('#app')
