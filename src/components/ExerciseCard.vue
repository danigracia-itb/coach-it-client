<template>
    <div class="card p-3 bg-light d-flex flex-row justify-content-between">
        <p class="fw-bold">{{ exercise.name }}</p>
        <p>Default</p>
    </div>
</template>

<script setup>
const { exercise } = defineProps(["exercise"]);
</script>
