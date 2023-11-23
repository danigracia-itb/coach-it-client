<template>
    <div>
        <h1 class="text-center mt-5">Exercises</h1>

        <!-- Acciones -->
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" @click="addExercisePopup">Add</button>
        </div>

        <Spinner class="mt-5" v-if="loading" />

        <div v-else>
            <div v-for="(exercises, group) in groupedExercises" :key="group" class="mt-5">
                <h4>{{ group }}</h4>

                <div class="exercises-grid">
                    <ExerciseCard
                        v-for="exercise in exercises"
                        :key="exercise.id"
                        :exercise="exercise"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";
import ExerciseCard from "../../components/ExerciseCard.vue";
import {addExercisePopup} from "../../functions/alerts"

const route = useRoute();

const loading = ref(true);
var exercises = reactive([]);

async function getExercises() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "exercises/get-all-user/" + localStorage.getItem("id")
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

//Group exercises
const groupedExercises = computed(() => {
    const grouped = exercises.reduce((acc, exercise) => {
        var groupKey = "No Type";

        switch (exercise.muscular_group) {
            case 1:
                groupKey = "Push";
                break;
            case 2:
                groupKey = "Pull";
                break;
            case 3:
                groupKey = "Leg";
                break;
            case 4:
                groupKey = "Core";
                break;
        }

        if (!acc[groupKey]) {
            acc[groupKey] = [];
        }

        acc[groupKey].push(exercise);

        return acc;
    }, {});

    return grouped;
});
</script>

<style scoped>
.exercises-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
}
</style>
