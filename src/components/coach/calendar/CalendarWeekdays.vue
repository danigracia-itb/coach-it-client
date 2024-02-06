<template>
    <ol class="day-of-week bg-dark text-white text-center mb-0 fw-bold">
        <li v-for="weekday in weekdays" :key="weekday" class="list-unstyled d-none d-md-block">{{ weekday }}</li>
        <li v-for="weekday in weekdaysSimple" :key="weekday" class="list-unstyled d-block d-md-none">{{ weekday }}</li>
    </ol>
</template>

<script setup>
import {ref} from "vue"
const weekdays = ref(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
const weekdaysSimple = ref(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);
</script>

<style scoped>
.-of-week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}
</style>
