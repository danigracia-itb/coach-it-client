<template>
    <div>
        <h1 class="text-center mt-5">Dashboard</h1>
        <div class="clients-grid h-100 w-100 p-5" v-if="clients.length > 0">
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
import { onMounted, reactive } from "vue";
import axiosClient from "../../config/axios";

var clients = reactive([]);

async function getClients() {
    try {
        const respuesta = await axiosClient(
            "coach/get-clients/" + localStorage.getItem("id")
        );
        clients = respuesta.data;
        console.log(clients);
    } catch (e) {
        console.log(e);
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
