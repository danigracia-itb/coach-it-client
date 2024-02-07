import { createRouter, createWebHistory } from "vue-router";

import { checkAuth } from "./functions/helpers";

//Public
import IndexView from "./pages/public/IndexView.vue";
import PrivacyPolicy from "./pages/public/PrivacyPolicy.vue";
import NotFound from "./pages/public/NotFound.vue";
import AboutUs from "./pages/public/AboutUs.vue";
import Calculator from "./pages/public/Calculator.vue";

//Auth
import Login from "./pages/auth/Login.vue";
import Register from "./pages/auth/Register.vue";
import Form from "./pages/auth/Form.vue";

//Recover password
import RequestPasswordRecover from "./pages/auth/RequestPasswordRecover.vue";
import PasswordRecover from "./pages/auth/PasswordRecover.vue";

//Coach
import CoachLayout from "./layouts/CoachLayout.vue";

//Athlete
import AthleteLayout from "./layouts/AthleteLayout.vue";
import AthleteDashboard from "./pages/athlete/Dashboard.vue";
import AthleteEditWorkout from "./pages/athlete/EditWorkout.vue";

const routes = [
    { path: "/", component: IndexView },
    { path: "/privacy-policy", component: PrivacyPolicy },

    //Auth public
    { path: "/login", component: Login },
    { path: "/register", component: Register },
    { path: "/form", component: Form },
    { path: "/aboutus", component: AboutUs },
    { path: "/calculator", component: Calculator },

    //Password
    { path: "/request-password-recover", component: RequestPasswordRecover },
    { path: "/password-recover/:token", component: PasswordRecover },

    //PRIVATE PART
    {
        path: "/coach",
        component: CoachLayout,
        meta: { requiresAuth: true }, // Requiere autenticación

        children: [
            { path: "", component: () => import("./pages/coach/Dashboard.vue") },
            { path: "exercises", component: () => import("./pages/coach/Exercises.vue") },
            {
                path: "manage",
                component: () => import("./pages/coach/Manage.vue"),
            },
            { path: "profile", component: () => import("./pages/coach/Profile.vue") },
            {
                path: "athlete/:id",
                component: () => import("./pages/coach/athlete/AthleteCalendar.vue"),
            },
            { path: "athlete/:id/profile", component: () => import("./pages/coach/athlete/AthleteProfile.vue") },
            {
                path: "athlete/:id/stats",
                component: () => import("./pages/coach/athlete/AthleteStats.vue"),
            },
            {
                path: "athlete/:id/workout/create",
                component: () =>
                    import("./pages/workout/EditWorkout.vue"),
            },
            {
                path: "athlete/:id/workout/:workout_id",
                component: () =>
                    import("./pages/workout/EditWorkout.vue"),
            },
        ],
    },

    //PRIVATE PART ATHLETE
    {
        path: "/athlete",
        component: AthleteLayout,
        meta: { requiresAuth: true }, // Requiere autenticación

        children: [
            { path: "", component: AthleteDashboard },
            {
                path: "workout/:workout_id", component: () =>
                    import("./pages/workout/EditWorkout.vue"),
            },
        ],
    },

    {
        path: "/:catchAll(.*)",
        component: NotFound,
    },
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


