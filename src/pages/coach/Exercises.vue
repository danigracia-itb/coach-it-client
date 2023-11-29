<template>
    <div>
        <h1 class="text-center mt-5">Exercises</h1>

        <!-- Acciones -->
        <div class="d-flex justify-content-end">
            <button class="btn btn-primary" @click="addExercise">Add</button>
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
                        :deleteExercise="deleteExercise"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";
import ExerciseCard from "../../components/ExerciseCard.vue";
import {addExercisePopup} from "../../functions/alerts"

const loading = ref(true);
var exercises = reactive([]);

function addExercise() {
    addExercisePopup().then(({exercise}) => {
        exercises.push(exercise)
        updateGroupedExercises()
    })
}

async function deleteExercise(id) {
    try {
        deleteExerciseFromArray(id)
        updateGroupedExercises()

        await axiosClient.delete("exercises/" + id)
    } catch (e) {
        console.log(e)
    }
}

async function getExercises() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "exercises/get-all-user/" + localStorage.getItem("id")
        );

        exercises = response.data;

        updateGroupedExercises()

        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

function deleteExerciseFromArray(id) {
    const index = exercises.findIndex(exercise => exercise.id === id);

    if (index !== -1) {
        exercises.splice(index, 1);
    }
}

//Group exercises
const groupedExercises = ref([]);

function updateGroupedExercises() {
    groupedExercises.value = exercises.reduce((acc, exercise) => {
        var groupKey = "No Type";

        switch (parseInt(exercise.muscular_group)) {
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
}

onMounted(() => {
    getExercises();
});

</script>

<style scoped>
.exercises-grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: repeat(2, 1fr);
}
</style>
