<template>
    <div class="mt-5">
        <Spinner v-if="loading" />

        <div v-else>
            <h1 class="text-center">{{ athlete.name }}</h1>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const route = useRoute();

const loading = ref(true);
var athlete = reactive({});

async function getAthleteProfile() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athlete-profile/" + route.params.id
        );

        athlete = response.data;

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
