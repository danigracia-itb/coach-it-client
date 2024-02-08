<template>
    <div>
        <Spinner v-if="loading" />

        <div v-else class="mt-5">
            <div class="d-flex justify-content-start">
                <RouterLink :to="`/coach/athlete/${athlete.id}`" class="btn btn-primary">
                    <font-awesome-icon icon="fa-solid fa-left-long" />
                </RouterLink>
            </div>
            <h1 class="text-center p-5"><span class="text-primary">{{ athlete.name }}</span> Profile</h1>
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0 d-flex justify-content-center align-items-center">
                    <img class="rounded-circle img-user-small" width="400" :src="`${backendUrl}/${athlete.picture}`" alt="">
                </div>


                <div class="col-lg-8">
                    <div class="mb-4">
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-envelope" size="2xl" />
                            <p class="m-0">{{ athlete.email }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-cake-candles" size="2xl" />
                            <p class="m-0">{{ athlete.user_data.date_birth }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-ruler-vertical" size="2xl" />
                            <p class="m-0">{{ athlete.user_data.height }}cm</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-weight-scale" size="2xl" />
                            <p class="m-0">{{ athlete.user_data.body_weight }}kg</p>
                        </div>

                        <p><strong>Time training: </strong>{{ athlete.user_data.time_training }}</p>
                        <p><strong>Time for training: </strong>{{ athlete.user_data.train_available_time }}</p>


                        <AvailableDaysTable :available_days="athlete.user_data.available_days"></AvailableDaysTable>

                        <section>
                            <h4 class="text-center mt-5">Exercises</h4>
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Wishlist</th>
                                        <th>Banlist</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ athlete.user_data.wishlist_exercises }}</td>
                                        <td>{{ athlete.user_data.banlist_exercises }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                        <section>
                            <h4 class="text-center mt-5">Goals</h4>
                            <table class="table table-bordered text-center">
                                <thead>
                                    <tr>
                                        <th>Short-term goals</th>
                                        <th>Long-term goals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{{ athlete.user_data.short_term_goals }}</td>
                                        <td>{{ athlete.user_data.short_term_goals }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, RouterLink } from "vue-router";
import axiosClient from "../../../config/axios";
import Spinner from "../../../components/utils/Spinner.vue";
import AvailableDaysTable from '../../../components/coach/AvailableDaysTable.vue'

const route = useRoute();

const backendUrl = import.meta.env.VITE_API_URL;

const loading = ref(true);
var athlete = reactive({});

async function getAthleteProfile() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-athlete-profile/" + route.params.id
        );

        athlete = response.data;

        console.log(athlete);

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getAthleteProfile();
});
</script>

<style scoped>
.img-user-small {
    width: 20rem;
    height: 20rem;
}

@media (min-width: 768px) {
    .img-user-small {
        width: 25rem;
        height: 25rem;
    }
}
</style>