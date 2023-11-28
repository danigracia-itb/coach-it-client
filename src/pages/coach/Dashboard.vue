<template>
    <div>
        <h1 class="text-center mt-5">Dashboard</h1>

        <Spinner class="mt-5" v-if="loading" />

        <div class="athletes-grid h-100 w-100 p-5" v-else>
            <RouterLink :to="`/coach/athlete/${athlete.id}`"
                class="athlete-card p-3 border border-3 rounded text-decoration-none text-black align-middle"
                v-for="athlete in athletes" :key="athlete.id">
                <img width="130" class="p-2 rounded-circle" :src="athlete.picture" alt="">
                <span class="display-6 fw-bold mx-4">{{ athlete.name }}</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { RouterLink } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const loading = ref(true);
var athletes = reactive([]);

async function getAthletes() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athletes/" + localStorage.getItem("id")
        );

        athletes = response.data;

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getAthletes();
});
</script>

<style scoped>
.athletes-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.athlete-card {
    height: 15rem;
}
</style>
