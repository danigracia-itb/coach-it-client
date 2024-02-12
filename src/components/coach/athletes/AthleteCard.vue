<template>
    <RouterLink
        :to="`/coach/athlete/${athlete.id}`"
        class="athlete-card w-100 p-3 border border-black border-1 rounded text-decoration-none text-black align-middle bg-white"
    >
        <img
            width="130"
            height="130"
            class="p-2 rounded-circle"
            :src="`${backendUrl}/${athlete.picture}`"
            alt=""
        />
        <p class="display-6 fw-bold mx-4">{{ athlete.name }}</p>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

const { athlete } = defineProps(["athlete"]);

const backendUrl = import.meta.env.VITE_API_URL;
</script>

<style scoped>
.athlete-card {
    height: 15rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>
