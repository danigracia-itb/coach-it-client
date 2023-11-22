<template>
    <div>
        <h1 class="text-center mt-5">Dashboard</h1>

        <Spinner class="mt-5" v-if="loading" />

        <div class="clients-grid mt-5" v-else>
            <RouterLink
                :to="`/coach/athlete/${client.id}`"
                class="athlete-card p-3 border border-3 rounded border-primary text-decoration-none text-black"
                v-for="client in clients"
                :key="client.id"
            >
                {{ client.name }}
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
var clients = reactive([]);

async function getClients() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athletes/" + localStorage.getItem("id")
        );

        clients = response.data;

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getClients();
});
</script>

<style scoped>
.clients-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

.athlete-card {
    height: 15rem;
}
</style>
