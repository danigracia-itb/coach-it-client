<template>
    <div>
        <header class="mt-5">
            <h1 class="text-center">Manage Clients</h1>

            <Spinner class="mt-5" v-if="configStore.loading" />

            <div class="d-flex justify-content-start mt-5 mt-md-0" v-if="!configStore.loading">
                <input type="text" id="searchTerm" class="form-control w-auto" placeholder="Search athlete..."
                    v-model="searchInput" />
            </div>
        </header>

        <div class="table-responsive">
            <table class="table table-striped mt-5" v-if="!configStore.loading && coachStore.athletes.length > 0">
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
                    <tr v-for="athlete in coachStore.getFilteredAthletes(searchInput)" :key="athlete.id" :class="{
                        'table-danger': athlete.payments.length > 0 && isDateBeforeOrEqualToToday(athlete.payments[athlete.payments.length - 1].date)
                    }">
                        <td data-label="#">{{ athlete.id }}</td>
                        <td data-label="Name">{{ athlete.name }}</td>
                        <td data-label="Last Payment">
                            {{ athlete.payments.length > 0 ? formatDate(athlete.payments[athlete.payments.length - 1].date)
                                : "-" }}
                        </td>
                        <td data-label="Next Payment">
                            {{ athlete.payments.length > 0 ? addMonths(athlete.payments[athlete.payments.length - 1].date,
                                paymentTypeToMonths(athlete.payments[athlete.payments.length - 1].payment_type)) : "-" }}
                        </td>
                        <td data-label="Quantity">
                            {{ athlete.payments.length > 0 ? athlete.payments[athlete.payments.length - 1].quantity + "€" :
                                "-" }}
                        </td>
                        <td class="d-flex gap-3">
                            <button class="btn btn-success" @click="handleAddPayment(athlete)">
                                <font-awesome-icon icon="fa-solid fa-add" />
                            </button>
                            <button class="btn btn-info" @click="handleAthleteHistoric(athlete.id)">
                                <font-awesome-icon icon="fa-solid fa-clock-rotate-left" />
                            </button>
                            <button class="btn btn-warning" v-tooltip="'Send payment reminder'" @click="
                                coachController.sendPaymentReminder(athlete)
                                ">
                                <font-awesome-icon icon="fa-solid fa-bell" />
                            </button>
                            <button class="btn btn-danger" @click="coachController.deleteAthlete(athlete.id)">
                                <font-awesome-icon icon="fa-solid fa-unlink" />
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="w-100 mt-5" v-if="!configStore.loading && coachStore.athletes.length <= 0">
            <h4 class="text-center">
                You have no athletes,
                <span class="cursor-pointer text-primary" @click="inviteAthlete(host, authStore.id)">invite your first
                    athlete</span>
            </h4>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import Spinner from "../../components/utils/Spinner.vue";
import {
    addMonths,
    formatDate,
    isDateBeforeOrEqualToToday,
    paymentTypeToMonths,
} from "../../functions/helpers";
import {
    addPaymentPopUp,
    athletePaymentsHistoric,
    inviteAthlete,
} from "../../functions/alerts";

import useCoachStore from "../../stores/useCoachStore";
import useConfigStore from "../../stores/useConfigStore";
import useAuthStore from "../../stores/useAuthStore";
import coachController from "../../controllers/coachController";

const coachStore = useCoachStore();
const configStore = useConfigStore();
const authStore = useAuthStore();

const host = window.location.host;

const searchInput = ref("");

function handleAthleteHistoric(id) {
    athletePaymentsHistoric(coachStore.getAthleteById(id));
}

function handleAddPayment(athlete) {
    addPaymentPopUp(authStore.id, athlete).then((data) => {
        coachStore.addAthletePayment(athlete, data);
    });
}

onMounted(() => {
    if (coachStore.athletes.length <= 0) {
        coachController.getAthletes();
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

@media (max-width: 1024px) {

    .table th {
        display: none;
    }

    .table td {
        padding: 0.5rem;
    }

    .table td {
        display: block;
    }

    .table td {
        text-align: left;
    }

    .table td::before {
        font-weight: bold;
        float: left;
        text-transform: uppercase;
        content: attr(data-label);
        padding-right: 0.5rem;
    }

    .table td:last-child::before {
        content: none;
    }

    .d-flex.flex-wrap.justify-content-between.mb-2 {
        display: block;
    }

    .btn {
        width: 100%;
        margin-bottom: 0.5rem;
    }

    .mt-md-0 {
        margin-top: 0 !important;
    }
}
</style>
