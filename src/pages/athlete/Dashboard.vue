<template>
    <div>
        <h1 class="text-center">Hello <span class="text-primary">{{ user.name }}</span></h1>

        <div v-if="!loading">
            <Calendar :athlete="athlete" :workouts="workouts" :restDays="restDays"/>
        </div>
        <Spinner v-else />
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import { getUser } from "../../functions/helpers";
import Spinner from "../../components/utils/Spinner.vue";
import Calendar from "../../components/athlete/calendar/Calendar.vue"

const user = getUser();

const route = useRoute();

const loading = ref(true);
var athlete = reactive({});
var workouts = reactive({});
var restDays = reactive({});

async function getAthleteProfile() {
    loading.value = true;
    try {
        const profileResponse = await axiosClient(
            "coach/get-athlete-profile/" + user.id
        );
        const calendarResponse = await axiosClient(
            "coach/get-athlete-calendar/" + user.id
        );

        athlete = profileResponse.data;
        workouts = calendarResponse.data.workouts;
        restDays = calendarResponse.data.restDays;

        console.log(athlete);

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getAthleteProfile();
});
</script>