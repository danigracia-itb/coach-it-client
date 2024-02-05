<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Manage Clients</h1>

            <Spinner class="mt-5" v-if="loading" />
        </header>

        <table class="table table-striped mt-5" v-if="!loading">
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
                <tr v-for="athlete in athletes" :key="athlete.id" :class="isDateBeforeOrEqualToToday(athlete.payments[0].date) ? 'table-danger' : ''">
                    <td>{{ athlete.id }}</td>
                    <td>{{ athlete.name }}</td>
                    <td>{{ athlete.payments.length > 0 ? formatDate(athlete.payments[0].date) : "No data" }}</td>
                    <td >{{ athlete.payments.length > 0 ? addOneMonth(athlete.payments[0].date) : "No data" }}</td>
                    <td>{{ athlete.payments.length > 0 ? "35.3€" : "No data" }}</td>
                    <td class="d-flex gap-3">
                        <button class="btn btn-success" @click="handleAddPayment(athlete.id)">
                            <font-awesome-icon icon="fa-solid fa-add" />
                        </button>
                        <button class="btn btn-info" @click="handleAthleteHistoric(athlete.id)">
                            <font-awesome-icon
                                icon="fa-solid fa-clock-rotate-left"
                            />
                        </button>
                        <button class="btn btn-warning"  v-tooltip="'Send payment reminder'">
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
import {addOneMonth, formatDate, isDateBeforeOrEqualToToday} from "../../functions/helpers"
import { addPaymentPopUp, athletePaymentsHistoric } from "../../functions/alerts";

const loading = ref(true);
var athletes = reactive([]);
var athlete = ref(null);
const coach_id = localStorage.getItem("id")

async function getLastPayments() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athletes-with-last-payments/" +coach_id
        );

        athletes = response.data;

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

async function getAthletePayments(id) {
    try {
        const response = await axiosClient(
            "coach/get-athlete-with-payments/" + id
        );
        athlete.value = response.data

    } catch (e) {
        console.log(e);
    }
}

function handleAthleteHistoric(id) {
    getAthletePayments(id);
    athletePaymentsHistoric(athlete.value)
}

function handleAddPayment(athlete) {
    addPaymentPopUp(coach_id, athlete).then(() => {
        getLastPayments();
    })
}

onMounted(() => {
    getLastPayments();
});
</script>

<style scoped>
th {
    background-color: black !important;
    color: white !important;
}

td {
    vertical-align: middle;
}
</style>