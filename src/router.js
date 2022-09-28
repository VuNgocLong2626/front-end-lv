import { createRouter, createWebHistory } from 'vue-router';

import TheHeader from './pages/Location/ListLocation.vue';
import NotFound from './pages/NotFound.vue';


const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/home' },
        { path: '/home', component: TheHeader },
        { path: '/:notFound(.*)', component: NotFound },
    ]
})

export default router;