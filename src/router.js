import { createRouter, createWebHistory } from "vue-router";

import { checkAuth } from "./helpers";

//IndexView
import IndexView from "./pages/public/IndexView.vue";
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Form from "./pages/auth/Form.vue";
import Recover from "./pages/auth/RecoverPassword.vue";
import Reset from "./pages/auth/ResetPassword.vue";


//Coach
import CoachDashboard from "./pages/coach/CoachDashboard.vue";

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
        //meta: { requiresAuth: true }, // Requiere autenticación
    },

    // {
    //     path: "/:catchAll(.*)",
    //     component: NotFoundView
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // Verificar la autenticación aquí
        const isAuthenticated = await checkAuth(); // Lógica para verificar si el usuario está autenticado
        if (!isAuthenticated) {
            next("/login"); // Redirigir al usuario al inicio de sesión si no está autenticado
        } else {
            next(); // Permitir acceso a la ruta protegida si el usuario está autenticado
        }
    } else {
        next(); // Permitir acceso a rutas que no requieren autenticación
    }
});

export default router;
