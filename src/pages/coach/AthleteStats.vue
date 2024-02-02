<template>
    <div>
        <Spinner v-if="loading" />

        <div v-else class="mt-5">
            <div class="d-flex justify-content-start">
                <button @click="$router.back()" class="btn btn-primary">
                    <font-awesome-icon icon="fa-solid fa-left-long" />
                </button>
            </div>
            <h1 class="text-center p-5">
                <span class="text-primary">{{ athlete.name }}</span> Stats
            </h1>

            <div class="row">
                <div class="col-xl-4 col-lg-6">
                    <StatCard title="Days trained last month" icon="fa-solid fa-dumbbell" color="#9f24b5" :number="stats.daysTrainedLastMonth" /> 
                </div>
                <div class="col-xl-4 col-lg-6">
                    <StatCard title="Days trained this month" icon="fa-solid fa-calendar-check" color="#1560b0" :number="stats.daysTrainedThisMonth" />
                </div>
                <div class="col-xl-4 col-lg-6">
                    <StatCard title="Sets this month" icon="fa-solid fa-list" color="#117a1a" :number="stats.setsDoneThisMonth" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axiosClient from "../../config/axios";
import { useRoute } from "vue-router";

//Components
import Spinner from "../../components/utils/Spinner.vue";
import StatCard from "../../components/stats/StatCard.vue";

import getAthleteStats from "../../functions/stats";

const route = useRoute();
const loading = ref(true);
const athlete = ref({});
const stats = ref({})

async function getUser() {
    try {
        const response = await axiosClient("users/" + route.params.id);
        athlete.value = response.data;
    } catch (e) {
        console.log(e);
    }
}


onMounted(async () => {
    loading.value = true;
    await getUser();
    await getAthleteStats(route.params.id, stats);
    loading.value = false;
});
</script>
