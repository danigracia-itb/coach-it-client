<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Manage Clients</h1>

            <Spinner class="mt-5" v-if="configStore.loading" />
        </header>

        <table class="table table-striped mt-5" v-if="!configStore.loading">
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
                    v-for="athlete in coachStore.athletes"
                    :key="athlete.id"
                    :class="
                    athlete.payments.length > 0 ? 
                        (isDateBeforeOrEqualToToday(athlete.payments[athlete.payments.length - 1].date)
                            ? 'table-danger'
                            : '') : ''
                    "
                >
                    <td>{{ athlete.id }}</td>
                    <td>{{ athlete.name }}</td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? formatDate(athlete.payments[athlete.payments.length - 1].date)
                                : "No data"
                        }}
                    </td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? addOneMonth(athlete.payments[athlete.payments.length - 1].date)
                                : "No data"
                        }}
                    </td>
                    <td>
                        {{
                            athlete.payments.length > 0
                                ? athlete.payments[athlete.payments.length - 1].quantity
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
                            @click="coachController.sendPaymentReminder(athlete)"
                        >
                            <font-awesome-icon icon="fa-solid fa-bell" />
                        </button>
                        <button class="btn btn-danger" @click="coachController.deleteAthlete(athlete.id)">
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Swal from "sweetalert2";
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

import useCoachStore from "../../stores/useCoachStore";
import useConfigStore from "../../stores/useConfigStore";
import useAuthStore from "../../stores/useAuthStore";
import coachController from "../../controllers/coachController";

const coachStore = useCoachStore()
const configStore = useConfigStore()
const authStore = useAuthStore()

function handleAthleteHistoric(id) {
    athletePaymentsHistoric(coachStore.getAthleteById(id));
}

function handleAddPayment(athlete) {
    addPaymentPopUp(authStore.id, athlete).then((data) => {
        coachStore.setAthleteLastPayment(athlete, data);
    });
}

onMounted(() => {
    if(coachStore.athletes.length <= 0) {
        coachController.getAthletes()
    }
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
