import { createRouter, createWebHistory } from "vue-router";

//IndexView
import IndexView from "./pages/public/IndexView.vue";

const routes = [
    { path: "/", component: IndexView },
    // {
    //     path: "/:catchAll(.*)",
    //     component: NotFoundView
    // }
];

const history = createWebHistory();

const router = createRouter({
    history,
    routes,
});

export default router;
