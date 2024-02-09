<template>
    <nav
        class="d-grid d-md-none w-100 bg-primary podbar"
    >
        <RouterLink to="/athlete" class="btn p-4 rounded-0" :class="$route.path == '/athlete' ? 'bg-white text-primary' : 'text-white'">
            <font-awesome-icon size="xl" icon="fa-solid fa-house" />
        </RouterLink>

        <RouterLink to="/athlete/calendar" class="btn p-4 rounded-0" :class="$route.path == '/athlete/calendar' ? 'bg-white text-primary' : 'text-white'">
            <font-awesome-icon size="xl" icon="fa-solid fa-calendar" />
        </RouterLink>

        <RouterLink to="/athlete/exercises" class="btn p-4 rounded-0" :class="$route.path == '/athlete/exercises' ? 'bg-white text-primary' : 'text-white'">
            <font-awesome-icon size="xl" icon="fa-solid fa-dumbbell" />
        </RouterLink>

        <RouterLink to="/athlete/profile" class="btn p-4 rounded-0" :class="$route.path == '/athlete/profile' ? 'bg-white text-primary' : 'text-white'">
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

.btn {
    border: none
}
</style>
