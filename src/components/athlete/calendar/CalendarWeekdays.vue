<template>
    <ol class="day-of-week bg-dark text-white text-center mb-0 fw-bold">
        <li v-for="weekday in weekdays" :key="weekday" class="list-unstyled">{{ weekday }}</li>
    </ol>
</template>

<script setup>
import {ref} from "vue"
const weekdays = ref(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
</script>

<style scoped>
.day-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
</style>
