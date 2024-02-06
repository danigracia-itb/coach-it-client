<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Dashboard</h1>

            <Spinner class="mt-5" v-if="loading" />

            <div class="d-flex justify-content-end">
                <InviteAthlete v-if="!loading" />
            </div>
        </header>

        <div class="athletes-grid h-100 w-100 mt-5" v-if="!loading">
            <RouterLink
                :to="`/coach/athlete/${athlete.id}`"
                class="athlete-card p-3 border border-black border-1 rounded text-decoration-none text-black align-middle bg-white"
                v-for="athlete in coachStore.athletes"
                :key="athlete.id"
            >
                <img
                    width="130"
                    class="p-2 rounded-circle"
                    :src="athlete.picture"
                    alt=""
                />
                <p class="display-6 fw-bold mx-4">{{ athlete.name }}</p>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import axiosClient from "../../config/axios";

import useAuthStore from "../../stores/useAuthStore";
import useCoachStore from "../../stores/useCoachStore";

import Spinner from "../../components/utils/Spinner.vue";
import InviteAthlete from "../../components/coach/InviteAthlete.vue";


const authStore = useAuthStore()
const coachStore = useCoachStore()

const loading = ref(true);

async function getAthletes() {
    try {
        const response = await axiosClient(
            "coach/get-athletes-with-last-payments/" + authStore.user.id
        );
        coachStore.setAthletes(response.data)
        loading.value = false
    } catch (e) {
        loading.value = false
        console.log(e);
    }
}

onMounted(() => {
    getAthletes();
});
</script>

<style scoped>


.athletes-grid {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1.5rem;
    }

@media (min-width: 768px) {
    .athletes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}
}

.athlete-card {
    height: 15rem;
    display: flex;
    gap: 1rem;
    align-items: center;
}
</style>
