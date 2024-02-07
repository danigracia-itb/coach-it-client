<template>
    <RouterLink
        :to="`/coach/athlete/${athlete.id}`"
        class="athlete-card p-3 border border-black border-1 rounded text-decoration-none text-black align-middle bg-white"
    >
        <img
            width="130"
            class="p-2 rounded-circle"
            :src="athlete.picture"
            alt=""
        />
        <p class="display-6 fw-bold mx-4">{{ athlete.name }}</p>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from "vue-router";

const { athlete } = defineProps(["athlete"]);
</script>

<style scoped>
.athlete-card {
    height: 15rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>
