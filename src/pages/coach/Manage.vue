<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Manage Clients</h1>

            <Spinner class="mt-5" v-if="loading" />
        </header>

        <table class="table mt-5">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Last Payment</th>
                    <th scope="col">Next Payment</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="athlete in athletes" :key="athlete.id">
                    <th scope="row">{{ athlete.id }}</th>
                    <td>{{ athlete.name }}</td>
                    <td>13/10/2024</td>
                    <td>13/10/2024</td>
                    <td>35.00€</td>
                    <td class="d-flex gap-3">
                        <button class="btn btn-info">
                            <font-awesome-icon
                                icon="fa-solid fa-clock-rotate-left"
                            />
                        </button>
                        <button class="btn btn-success"  v-tooltip="'Send payment reminder'">
                            <font-awesome-icon icon="fa-solid fa-bell" />
                        </button>
                        <button class="btn btn-danger">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
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
