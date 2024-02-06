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
                <tr
                    v-for="athlete in athletes"
                    :key="athlete.id"
                    :class="
                        isDateBeforeOrEqualToToday(athlete.payments[0].date)
                            ? 'table-danger'
                            : ''
                    "
                >
                    <td>{{ athlete.id }}</td>
                    <td>{{ athlete.name }}</td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? formatDate(athlete.payments[0].date)
                                : "No data"
                        }}
                    </td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? addOneMonth(athlete.payments[0].date)
                                : "No data"
                        }}
                    </td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? athlete.payments[0].quantity
                                : "No data"
                        }}
                    </td>
                    <td class="d-flex gap-3">
                        <button
                            class="btn btn-success"
                            @click="handleAddPayment(athlete.id)"
                        >
                            <font-awesome-icon icon="fa-solid fa-add" />
                        </button>
                        <button
                            class="btn btn-info"
                            @click="handleAthleteHistoric(athlete.id)"
                        >
                            <font-awesome-icon
                                icon="fa-solid fa-clock-rotate-left"
                            />
                        </button>
                        <button
                            class="btn btn-warning"
                            v-tooltip="'Send payment reminder'"
                            @click="sendPaymentReminder(athlete)"
                        >
                            <font-awesome-icon icon="fa-solid fa-bell" />
                        </button>
                        <button class="btn btn-danger" @click="deleteAthlete(athlete.id)">
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
import Swal from "sweetalert2";
import { RouterLink } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";
import {
    addOneMonth,
    formatDate,
    isDateBeforeOrEqualToToday,
    getUser,
} from "../../functions/helpers";
import {
    addPaymentPopUp,
    athletePaymentsHistoric,
} from "../../functions/alerts";
import axios from "axios";

const loading = ref(true);
var athletes = ref([]);
var athlete = ref(null);
const coach_id = localStorage.getItem("id");

async function getLastPayments() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athletes-with-last-payments/" + coach_id
        );

        athletes.value = response.data;

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
        athlete.value = response.data;
    } catch (e) {
        console.log(e);
    }
}

async function sendPaymentReminder(athlete) {
    try {
        loading.value = true;
        await axiosClient.post("send-payment-reminder", {
            athlete_email: athlete.email,
            athlete_name: athlete.name,
            coach: getUser().name,
            date: addOneMonth(athlete.payments[0].date),
            quantity: athlete.payments[0].quantity,
        });
        loading.value = false;
        Swal.fire({
            title: "Sended Successfully",
            text: `Payment reminder sent successfully to ${athlete.name} for an amount of ${athlete.payments[0].quantity}€ `,
            showCancelButton: true,
            confirmButtonText: "Confirm",
            confirmButtonColor: "#711bba",
        });
    } catch (error) {
        loading.value = false;
        console.log(e);
    }
}

async function deleteAthlete(id) {
    Swal.fire({
        title: "¿Do you want to delete this athlete?",
        text: "Once deleted, it cannot be recovered",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#711bba",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          //Enviar la petición al servidor
          axiosClient
            .delete(`/athlete/${id}`)
            .then(() => {
            console.log()
              Swal.fire({
                title: "Athlete deleted",
                text: "Athlete deleted successfully",
                icon: "success",
              });

              //Eliminar categoría del DOM
              athletes.value = athletes.value.filter((a) => a.id != id)
            })
            .catch((error) => {
                Swal.fire({
                    title: "Error 505!",
                    text: "Server error, contact with webmaster for more info",
                    icon: "error",
              });
            });
        }
      });
}

function handleAthleteHistoric(id) {
    getAthletePayments(id);
    athletePaymentsHistoric(athlete.value);
}

function handleAddPayment(athlete) {
    addPaymentPopUp(coach_id, athlete).then(() => {
        getLastPayments();
    });
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
