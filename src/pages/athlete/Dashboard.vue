<template>
    <div>
        <h1 class="text-center">Hello <span class="text-primary">{{ authStore.name }}</span></h1>

        <div v-if="!loading">
            <Calendar :athlete="authStore.user" :workouts="athleteStore.calendar.workouts" :restDays="athleteStore.calendar.restDays"/>
        </div>
        <Spinner v-else />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";

//components
import Spinner from "../../components/utils/Spinner.vue";
import Calendar from "../../components/athlete/calendar/Calendar.vue"

//Stores
import useAuthStore from "../../stores/useAuthStore";
import useAthleteStore from "../../stores/useAthleteStore";

const authStore = useAuthStore();
const athleteStore = useAthleteStore();

const loading = ref(true);

async function getCalendar() {
    loading.value = true;
    try {
        const calendarResponse = await axiosClient(
            "coach/get-athlete-calendar/" + authStore.id
        );

        athleteStore.setCalendar({
            workouts: calendarResponse.data.workouts,
            restDays: calendarResponse.data.restDays
        })

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getCalendar();
});
</script>