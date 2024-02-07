<template>
    <div class="mt-5">
        <Spinner v-if="loading" />
        <div v-else>
            <header class="d-flex justify-content-between">
                <RouterLink class="btn btn-primary" to="/coach">
                    <font-awesome-icon icon="fa-solid fa-left-long" />
                </RouterLink>
                <h1 class="text-primary">{{ athlete.name }}</h1>
                <div class="d-flex gap-2">
                    <RouterLink
                        :to="`/coach/athlete/${athlete.id}/stats`"
                        class="btn btn-primary"
                    >
                    <font-awesome-icon icon="fa-solid fa-chart-line" />
                    </RouterLink>
                    <RouterLink
                        :to="`/coach/athlete/${athlete.id}/profile`"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-user" />
                    </RouterLink>
                </div>
            </header>

            <div>
                <Calendar :athlete="athlete" :workouts="coachStore.athleteCalendar.workouts" :restDays="coachStore.athleteCalendar.restDays"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import axiosClient from "../../../config/axios";

//Components
import Spinner from "../../../components/utils/Spinner.vue";
import Calendar from "../../../components/calendar/Calendar.vue";

//Stores
import useCoachStore from "../../../stores/useCoachStore";

//Controllers
import coachController from "../../../controllers/coachController";

const coachStore = useCoachStore();

const route = useRoute();

const athlete = computed(() => coachStore.getAthleteById(route.params.id))

const loading = ref(true);

async function getAthleteCalendar() {
    loading.value = true;
    try {
        const calendarResponse = await axiosClient(
            "coach/get-athlete-calendar/" + route.params.id
        );

        coachStore.setAthleteCalendar({
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
    if (coachStore.athletes.length <= 0) {
        coachController.getAthletes();
    }
    getAthleteCalendar();
});
</script>
