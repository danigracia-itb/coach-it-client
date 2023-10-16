import { createRouter, createWebHistory } from "vue-router";

//PublicView
import PublicView from "./pages/public/PublicView.vue";

const routes = [
    { path: "/", component: PublicView },
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
