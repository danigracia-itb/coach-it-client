<template>
    <div class="card p-3 d-flex flex-row justify-content-between align-items-center" :class="exercise.is_default ? 'bg-light' : 'bg-primary text-white'">
        <p class="fw-bold mb-0">{{ exercise.name }}</p>
        <p class="mb-0">{{ exercise.is_default ? "Default" : "" }}</p>
    </div>
</template>

<script setup>
const { exercise } = defineProps(["exercise"]);
</script>
