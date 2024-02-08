<template>
    <div>
        <div class="page-container">
            <header
                class="d-none d-md-block overflow-hidden px-md-5 w-vw bg-white"
            >
            <div class="container d-flex justify-content-between">
                <div class="d-flex gap-2 align-items-center">
                    <img
                        width="200"
                        src="../../public/assets/logo.png"
                        alt="logo"
                    />

                    <nav class="d-flex gap-5">
                        <RouterLink
                            to="/athlete"
                            class="nav-link"
                            :class="
                                $route.path == '/athlete'
                                    ? 'text-primary fw-bold'
                                    : ''
                            "
                        >
                            Dashboard
                        </RouterLink>

                        <RouterLink
                            to="/athlete/calendar"
                            class="nav-link"
                            :class="
                                $route.path == '/athlete/calendar'
                                    ? 'text-primary fw-bold'
                                    : ''
                            "
                        >
                            Calendar
                        </RouterLink>

                        <RouterLink
                            to="/athlete/exercises"
                            class="nav-link"
                            :class="
                                $route.path == '/athlete/exercises'
                                    ? 'text-primary fw-bold'
                                    : ''
                            "
                        >
                            Exercises
                        </RouterLink>
                    </nav>
                </div>

                <UserMenu class="d-block" :athlete="true"></UserMenu>
            </div>

            </header>
            <div class="container pb-5">
                <RouterView />
            </div>
        </div>
        <NavBar />
    </div>
</template>

<script setup>
import { RouterView, RouterLink } from "vue-router";
import UserMenu from "../components/utils/UserMenu.vue";
import NavBar from "../components/athlete/NavBar.vue";
</script>

<style scoped>
.page-container {
    margin: 2rem 0 8rem 0; /* Espacio para el podbar */
}

@media (min-width: 768px) {
    .page-container {
        margin: 0;
    }
}
</style>
