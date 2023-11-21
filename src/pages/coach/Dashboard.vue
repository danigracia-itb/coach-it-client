<template>
    <div>
        <h1 class="text-center mt-5">Dashboard</h1>

        <Spinner v-if="loading" />

        <div class="clients-grid h-100 w-100 p-5" v-else>
            <div
                class="athlete-card p-3 border border-3 rounded border-primary"
                v-for="client in clients"
                :key="client.id"
            >
                {{ client.name }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const loading = ref(true);
var clients = reactive([]);

async function getClients() {
    loading.value = true;
    try {
        const respuesta = await axiosClient(
            "coach/get-clients/" + localStorage.getItem("id")
        );

        clients = respuesta.data;

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
