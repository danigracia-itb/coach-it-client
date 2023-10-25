import { createRouter, createWebHistory } from "vue-router";

//IndexView
import IndexView from "./pages/public/IndexView.vue";
import Login from "./pages/auth/Login.vue";

const routes = [
    { path: "/", component: IndexView },
    { path: "/login", component: Login }
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
