<template>
    <div class="mt-5">
        <h1 class="text-center">Exercises</h1>

        <!-- Acciones -->

        <Spinner class="mt-5" v-if="configStore.loading" />

        <div class="d-flex justify-content-between" v-else>
            <input type="text" class="form-control w-auto"
                placeholder="Search exercises..."
                v-model="searchInput" />

            <button class="btn btn-primary"
                @click="exerciseController.addExercise">
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
        </div>

        <div
            v-if="!configStore.loading && !areAllEmptyArrays(exercisesStore.getFilteredExercises(searchInput))">
            <div v-for="(exercises, group) in exercisesStore.getFilteredExercises(searchInput)"
                :key="group" class="mt-5">
                <div class="d-flex gap-2">
                    <h4>{{ group }}</h4>
                    <font-awesome-icon
                        v-tooltip="getTooltipContent(group)"
                        icon="fa-regular fa-circle-question"
                        class="fa-xs" />
                </div>
                <div class="exercises-grid">
                    <ExerciseCard v-for="exercise in exercises"
                        :key="exercise.id" :exercise="exercise"
                        :deleteExercise="exerciseController.deleteExercise" />
                </div>
            </div>
        </div>
        <div v-else-if="!configStore.loading && areAllEmptyArrays(exercisesStore.getFilteredExercises(searchInput))">
            <h4 v-if="!searchInput" class="text-center">There
                are no exercises, <span
                    class="cursor-pointer text-primary"
                    @click="exerciseController.addExercise">add
                    one</span></h4>
            <h4 v-else class="text-center">No search results
            </h4>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

import { areAllEmptyArrays } from "../../functions/helpers";

//Components
import Spinner from "../../components/utils/Spinner.vue";
import ExerciseCard from "../../components/exercises/ExerciseCard.vue";

//Stores
import useExercisesStore from "../../stores/useExercisesStore"
import useConfigStore from "../../stores/useConfigStore"

//Controllers
import exerciseController from '../../controllers/exerciseController'

const exercisesStore = useExercisesStore();
const configStore = useConfigStore();

const searchInput = ref("");

function getTooltipContent(group) {
    const tooltips = {
        Push: "Excercises that involves: chest, shoulders and triceps",
        Pull: "Exercises that involves: all back muscles and biceps",
        Leg: "Exercises that involves all leg muscles such as quadriceps, femoral and glutes",
        Core: "Exercises that involves all core muscles such as abdominals, obliques and lumbar",
        "No Type": "Generic exercises",
    };
    return tooltips[group];
}

onMounted(() => {
    if (exercisesStore.exercises.length <= 0) {
        exerciseController.getExercises();
    }
});
</script>

<style scoped>
.exercises-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    /* align-items: center; */
}

@media (min-width: 768px) {
    .exercises-grid {
        display: grid;
        gap: 1rem;
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
