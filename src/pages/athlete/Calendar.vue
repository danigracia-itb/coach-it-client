<template>
    <div class="mt-5">
        <h1 class="text-center">Calendar</h1>

        <div v-if="!loading">
            <Calendar :isCoach="false" :athlete="authStore.user"  :workouts="athleteStore.calendar.workouts" :restDays="athleteStore.calendar.restDays" :bodyWeights="athleteStore.calendar.bodyWeights"/>
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
import Calendar from "../../components/calendar/Calendar.vue"

//Stores
import useAuthStore from "../../stores/useAuthStore";
import useAthleteStore from "../../stores/useAthleteStore";

const authStore = useAuthStore();
const athleteStore = useAthleteStore();

const loading = ref(false);

async function getCalendar() {
    loading.value = true;
    try {
        const calendarResponse = await axiosClient(
            "coach/get-athlete-calendar/" + authStore.id
        );

        athleteStore.setCalendar({
            workouts: calendarResponse.data.workouts,
            restDays: calendarResponse.data.restDays,
            bodyWeights: calendarResponse.data.bodyWeights,
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