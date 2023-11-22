<template>
    <div class="mt-5">
        <h1 class="text-center">Exercises</h1>

        <Spinner class="mt-5" v-if="loading" />

        <div class="h-100 p-5 " v-else>
            <p
                class=""
                v-for="exercise in exercises"
                :key="exercise.id"
            >
                {{ exercise.name }}
            </p>
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
var exercises = reactive([]);

async function getExercises() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "coach/get-exercises/" + route.params.id
        );

        exercises = response.data;

        console.log(exercises);

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

onMounted(() => {
    getExercises();
});
</script>
