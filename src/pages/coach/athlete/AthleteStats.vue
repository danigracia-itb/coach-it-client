<template>
    <div>
        <Spinner v-if="configStore.loading" />

        <div v-if="!configStore.loading && athlete" class="mt-5">
            <div class="d-flex justify-content-start">
                <button @click="$router.back()" class="btn btn-primary">
                    <font-awesome-icon icon="fa-solid fa-left-long" />
                </button>
            </div>
            <h1 class="text-center p-5">
                <span class="text-primary text-capitalize">{{ athlete.name }}</span> Stats
            </h1>

            <div class="row">
                <div class="col-xl-4 col-lg-6">
                    <StatCard
                        title="Days trained last month"
                        icon="fa-solid fa-dumbbell"
                        color="#9f24b5"
                        :number="stats.daysTrainedLastMonth"
                    />
                </div>
                <div class="col-xl-4 col-lg-6">
                    <StatCard
                        title="Days trained this month"
                        icon="fa-solid fa-calendar-check"
                        color="#1560b0"
                        :number="stats.daysTrainedThisMonth"
                    />
                </div>
                <div class="col-xl-4 col-lg-6">
                    <StatCard
                        title="Sets this month"
                        icon="fa-solid fa-list"
                        color="#117a1a"
                        :number="stats.setsDoneThisMonth"
                    />
                </div>
            </div>

            <div class="mt-5 row">
                <BodyWeightChart
                    :data="bodyWeights"
                    class="col-md-6"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../../config/axios";

//Components
import Spinner from "../../../components/utils/Spinner.vue";
import StatCard from "../../../components/stats/StatCard.vue";
import BodyWeightChart from "../../../components/stats/BodyWeightChart.vue";

//helpers
import getAthleteStats from "../../../functions/stats";

//stores
import useCoachStore from "../../../stores/useCoachStore";
import useConfigStore from "../../../stores/useConfigStore";

//controllers
import coachController from "../../../controllers/coachController";

const coachStore = useCoachStore();
const configStore = useConfigStore();

const route = useRoute();
const athlete = computed(() => coachStore.getAthleteById(route.params.id));
const stats = ref({});
const bodyWeights = ref([]);

async function getBodyWeights() {
    try {
        const response = await axiosClient("body-weights/" + route.params.id);

        bodyWeights.value = response.data;
    } catch (e) {
        console.log(e);
    }
}

onMounted(async () => {
    if (coachStore.athletes.length <= 0) {
        coachController.getAthletes();
    }

    configStore.setLoading(true);
    await getBodyWeights();
    await getAthleteStats(route.params.id, stats);
    configStore.setLoading(false);
});
</script>
