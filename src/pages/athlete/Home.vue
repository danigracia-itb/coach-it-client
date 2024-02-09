<template>
    <div class="mt-5">
        <h1 class="text-center mb-5">
            Hello <span class="text-primary">{{ authStore.name }}</span>
        </h1>

        <Spinner v-if="loading" />

        <div v-else class="d-flex flex-column gap-2">
            <h4>{{ todayDataDate }} Data</h4>
            <div
                v-if="getTodayEvents.restDay"
                class="d-flex p-3 rounded bg-danger"
            >
                <span class="text-white fw-bold my-2">Today is rest day</span>
            </div>

            <div
                class="d-flex justify-content-between align-items-center p-3 rounded bg-primary text-white"
            >
                <span class="text-white fw-bold my-2"> Workout </span>
                <RouterLink
                    v-if="!getTodayEvents.workout"
                    class="btn btn-light"
                    :to="`/athlete/workout/create?date=${today}`"
                >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </RouterLink>
                <RouterLink
                    v-else
                    :to="`/athlete/workout/${getTodayEvents.workout.id}`"
                    class="btn btn-light"
                >
                    <font-awesome-icon icon="fa-solid fa-pen" />
                </RouterLink>
            </div>

            <div
                class="d-flex justify-content-between align-items-center p-3 rounded bg-success text-white"
            >
                <span class="fw-bold my-2">Body Weight</span>
                <button
                    v-if="!getTodayEvents.bodyWeight"
                    class="btn btn-light"
                    @click="addBodyWeightPopUp(today, authStore.id, false)"
                >
                    <font-awesome-icon icon="fa-solid fa-plus" />
                </button>
                <span v-else>{{ getTodayEvents.bodyWeight.value }}kg</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import axiosClient from "../../config/axios";
import { storeToRefs } from "pinia";

// Helpers
import {
    areAllEmptyArrays,
    getTodayDate,
    formatDateData,
} from "../../functions/helpers";
import { addBodyWeightPopUp } from "../../functions/alerts";

// Components
import Spinner from "../../components/utils/Spinner.vue";

// Stores
import useAuthStore from "../../stores/useAuthStore";
import useAthleteStore from "../../stores/useAthleteStore";

const authStore = useAuthStore();
const athleteStore = useAthleteStore();

const today = getTodayDate();
const todayDataDate = formatDateData(today);

const { getTodayEvents } = storeToRefs(athleteStore);

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
        });

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    if (areAllEmptyArrays(athleteStore.calendar)) {
        getCalendar();
    }
});
</script>
