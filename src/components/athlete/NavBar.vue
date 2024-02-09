<template>
    <nav
        class="d-grid d-md-none w-100 bg-white podbar border-top border-1 border-black"
    >
        <RouterLink to="/athlete" class="text-primary btn p-4 rounded-0" :class="$route.path == '/athlete' ? 'bg-primary text-white' : ''">
            <font-awesome-icon size="xl" icon="fa-solid fa-house" />
        </RouterLink>

        <RouterLink to="/athlete/calendar" class="text-primary btn p-4 rounded-0" :class="$route.path == '/athlete/calendar' ? 'bg-primary text-white' : ''">
            <font-awesome-icon size="xl" icon="fa-solid fa-calendar" />
        </RouterLink>

        <RouterLink to="/athlete/exercises" class="text-primary btn p-4 rounded-0" :class="$route.path == '/athlete/exercises' ? 'bg-primary text-white' : ''">
            <font-awesome-icon size="xl" icon="fa-solid fa-dumbbell" />
        </RouterLink>

        <RouterLink to="/athlete/profile" class="text-primary btn p-4 rounded-0" :class="$route.path == '/athlete/profile' ? 'bg-primary text-white' : ''">
            <font-awesome-icon size="xl" icon="fa-solid fa-user" />
        </RouterLink>
    </nav>
</template>

<script setup>
import { RouterLink } from "vue-router";
</script>

<style scoped>
.podbar {
    grid-template-columns: repeat(4, 1fr);
    bottom: 0;
    position: fixed;
    z-index: 150;
    width: 100%;
}
</style>
