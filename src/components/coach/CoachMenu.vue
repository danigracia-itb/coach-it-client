<template>
    <div class="menu bg-primary col-2 ml-0 text-center pr-0">
        <RouterLink
            to="/coach"
            class="text-white d-flex align-items-center text-decoration-none mt-3"
            :class="route.path == '/coach' ? 'bg-white' : ''"
        >
            <font-awesome-icon
                class="w-25 mt-1 p-3"
                :class="route.path == '/coach' ? 'text-primary' : ''"
                size="2xl"
                icon="fa-solid fa-users"
            />
            <p
                class="mt-4 fs-1"
                :class="route.path == '/coach' ? 'text-primary' : ''"
            >
                Dashboard
            </p>
        </RouterLink>
        <RouterLink
            to="/coach/manage"
            class="text-white d-flex align-items-center text-decoration-none mt-3"
            :class="route.path == '/coach/manage' ? 'bg-white' : ''"
        >
            <font-awesome-icon
                class="w-25 mt-1 p-3"
                :class="route.path == '/coach/manage' ? 'text-primary' : ''"
                size="2xl"
                icon="fa-solid fa-credit-card"
            />
            <p
                class="mt-4 fs-1"
                :class="route.path == '/coach/manage' ? 'text-primary' : ''"
            >
                Manage
            </p>
        </RouterLink>
        <RouterLink
            to="/coach/exercises"
            class="text-white d-flex align-items-center text-decoration-none mt-3"
            :class="route.path == '/coach/exercises' ? 'bg-white' : ''"
        >
            <font-awesome-icon
                class="w-25 mt-1 p-3"
                :class="route.path == '/coach/exercises' ? 'text-primary' : ''"
                size="2xl"
                icon="fa-solid fa-dumbbell"
            />
            <p
                class="mt-4 fs-1"
                :class="route.path == '/coach/exercises' ? 'text-primary' : ''"
            >
                Exercises
            </p>
        </RouterLink>
    </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
console.log(route.path);
</script>

<style scoped>
.menu {
    height: 100%;
    width: 25rem;
    position: fixed;
    z-index: 1;
    top: 8rem;
    left: 0;
    overflow-x: hidden;
}
</style>
