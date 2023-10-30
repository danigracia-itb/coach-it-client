import { createRouter, createWebHistory } from "vue-router";

import { isLoggedIn } from "./helpers";

//IndexView
import IndexView from "./pages/public/IndexView.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Form from "./pages/auth/Form.vue";
import Recover from "./pages/auth/Recover.vue";
import Reset from "./pages/auth/Reset.vue";

//Coach
import CoachDashboard from "./pages/coach/Dashboard.vue";

const routes = [
    { path: "/", component: IndexView },
    { path: "/login", component: Login },
    { path: "/register", component: Register },

    //WTF
    { path: "/form", component: Form },
    { path: "/recover", component: Recover },
    { path: "/reset", component: Reset },

    //PRIVATE PART
    {
        path: "/coach",
        component: CoachDashboard,
    },

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

// función beforeEach para proteger las rutas
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // verifica si la ruta requiere autenticación

        isLoggedIn().then((res) => {
            if (!res) {
                next("/login"); // redirige a la página de inicio de sesión si no está autenticado
            } else {
                next(); // permite continuar a la ruta protegida si el usuario está autenticado
            }
        });
    } else if (to.matched.some((record) => record.meta.isLogged)) {
        isLoggedIn().then((res) => {
            if (res) {
                next("/coach"); // redirige a la página de inicio de sesión si no está autenticado
            } else {
                next(); // permite continuar a la ruta protegida si el usuario está autenticado
            }
        });
    } else {
        next(); // permite continuar a rutas que no requieren autenticación
    }
});

export default router;
