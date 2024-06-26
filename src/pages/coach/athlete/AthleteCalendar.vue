<template>
    <div class="mt-5">
        <Spinner v-if="loading" />
        <div v-else>
            <header class="d-grid grid-header w-100">
                <div class="d-flex justify-content-start align-items-center">
                    <RouterLink class="btn btn-primary" to="/coach">
                        <font-awesome-icon icon="fa-solid fa-left-long" />
                    </RouterLink>
                </div>

                <h1 class="text-center text-primary text-capitalize">
                    {{ athlete.name }}
                </h1>
                <div
                    class="d-flex justify-content-end align-items-center gap-2"
                >
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
                <Calendar
                    :isCoach="true"
                    :athlete="athlete"
                    :calendar="coachStore.athleteCalendar"
                />
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

const athlete = computed(() => coachStore.getAthleteById(route.params.id));

const loading = ref(true);

async function getAthleteCalendar() {
    loading.value = true;
    try {
        const calendarResponse = await axiosClient(
            "coach/get-athlete-calendar/" + route.params.id
        );

        coachStore.setAthleteCalendar({
            workouts: calendarResponse.data.workouts,
            restDays: calendarResponse.data.restDays,
            bodyWeights: calendarResponse.data.bodyWeights,
            tracs: calendarResponse.data.tracs,
        });

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

<style scoped>
.grid-header {
    grid-template-columns: repeat(3, 1fr);
}
</style>