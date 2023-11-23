<template>
    <div>
        <Spinner v-if="loading" />

        <div v-else>
            <h1 class="text-center m-5">{{ athlete.name }}</h1>
            <div class="row">
                <div class="col-lg-4 mb-4 mb-lg-0 d-flex justify-content-center align-items-center">
                    <img class="rounded-circle" width="400" :src="athlete.picture" alt="">
                </div>


                <div class="col-lg-8">
                    <div class="mb-4">
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-envelope" size="2xl" />
                            <p class="m-0">{{ athlete.email }}</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-cake-candles" size="2xl" />
                            <p class="m-0">22/11/2023</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-ruler-vertical" size="2xl" />
                            <p class="m-0">170cm</p>
                        </div>
                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-weight-scale" size="2xl" />
                            <p class="m-0">70kg</p>
                        </div>

                        <p><strong>Time training:</strong></p>
                        <p><strong>Time for training:</strong></p>


                        <table class="table table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>Monday</th>
                                    <th>Tuesday</th>
                                    <th>Wednesday</th>
                                    <th>Thursday</th>
                                    <th>Friday</th>
                                    <th>Saturday</th>
                                    <th>Sunday</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><font-awesome-icon icon="fa-solid fa-square-check" class="text-success" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-xmark" class="text-danger" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-check" class="text-success" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-xmark" class="text-danger" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-check" class="text-success" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-xmark" class="text-danger" size="xl" />
                                    </td>
                                    <td><font-awesome-icon icon="fa-solid fa-square-check" class="text-success" size="xl" />
                                    </td>
                                    <!-- <td>
                                {{ athlete.available_days.monday ? 'true' :'false' }}
                                </td> -->
                                </tr>
                            </tbody>

                        </table>

                        <div class="d-flex align-items-center">
                            <font-awesome-icon class="p-3" icon="fa-solid fa-star" size="2xl" />
                            <p class="m-0"><strong>Favorite exercises: </strong></p>
                        </div>

                        <p><strong>Hated exercises:</strong></p>
                        <p><strong>Short-term goals:</strong></p>
                        <p><strong>Long-term goals:</strong></p>

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const route = useRoute();

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

<style scoped></style>