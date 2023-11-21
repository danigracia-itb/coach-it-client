import { createRouter, createWebHistory } from "vue-router";

import { checkAuth } from "./functions/helpers";

//IndexView
import IndexView from "./pages/public/IndexView.vue";
import PrivacyPolicy from "./pages/public/PrivacyPolicy.vue";

import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Form from "./pages/auth/Form.vue";

//Recover password
import RequestPasswordRecover from "./pages/auth/RequestPasswordRecover.vue";
import PasswordRecover from "./pages/auth/PasswordRecover.vue";

//Coach
import CoachLayout from './layouts/CoachLayout.vue'
import CoachDashboard from "./pages/coach/Dashboard.vue";

const routes = [
    { path: "/", component: IndexView },
    { path: "/privacy-policy", component: PrivacyPolicy },

    //Auth public
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/form", component: Form },

    //Password
    { path: "/request-password-recover", component: RequestPasswordRecover },
    { path: "/password-recover/:token", component: PasswordRecover },

    //PRIVATE PART
    {
        path: "/coach",
        component: CoachLayout,
        //meta: { requiresAuth: true }, // Requiere autenticación

        children: [{ path: "", component: CoachDashboard }],
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
