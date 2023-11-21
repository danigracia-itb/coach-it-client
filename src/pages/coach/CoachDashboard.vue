<template>
    <div class="vh-100 overflow-hidden">
        <header>
            <img
                width="250"
                class="mx-auto"
                src="../../assets/logo.png"
                alt="logo"
            />
        </header>
        <div class="row h-100">
            <CoachMenu></CoachMenu>
            <div class="col-10">
                <div v-if="clients.length > 0">
                    <p v-for="client in clients" :key="client.id">{{ client.name }}</p>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive } from "vue";
import axiosClient from "../../config/axios";
import CoachMenu from "../../components/coach/CoachMenu.vue";

var clients = reactive([])

async function getClients() {
    try {
        const respuesta = await axiosClient("coach/get-clients/" + localStorage.getItem("id"))
        clients = respuesta.data
        console.log(clients)
    } catch (e) {
        console.log(e)
    }
}

onMounted( () => {
    getClients()
})

</script>

<style scoped>
header {
    background-color: #dbdee2;
}
</style>
