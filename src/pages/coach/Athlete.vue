<template>
    <div class="mt-5">
        <Spinner v-if="loading" />
        <div v-else>
            <header class="d-flex justify-content-between">
                <div></div>
                <h1>{{ athlete.name }}</h1>

                <div class="d-flex gap-2">
                    <RouterLink
                        :to="`/coach/athlete/${athlete.id}/profile`"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-user"/>
                    </RouterLink>
                </div>
            </header>

            <div>
                <Calendar :athlete="athlete" :workouts="workouts" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";
import Calendar from "../../components/coach/calendar/Calendar.vue"

const route = useRoute();

const loading = ref(true);
var athlete = reactive({});
var workouts = reactive({});

async function getAthleteProfile() {
    loading.value = true;
    try {
        const profileResponse = await axiosClient(
            "coach/get-athlete-profile/" + route.params.id
        );
        const workoutsResponse = await axiosClient(
            "coach/get-athlete-workouts/" + route.params.id
        );

        athlete = profileResponse.data;
        workouts = workoutsResponse.data;

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
