<template>
    <!-- Button trigger modal -->
    <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addExerciseModal"
        class="btn btn-dark w-100"
        :disabled="workout.length >= 15"
    >
        {{
            workout.length >= 15
                ? "You have reached the exercises limit"
                : "Add Exercise"
        }}
    </button>

    <!-- Modal -->
    <div
        class="modal fade"
        id="addExerciseModal"
        tabindex="-1"
        data-bs-backdrop="static"
        aria-labelledby="addExerciseModal"
        aria-hidden="true"
    >
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addExerciseModal">
                        Add Exercise To Workout
                    </h1>
                    <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                    ></button>
                </div>
                <div class="modal-body">
                    <h2 class="h3 text-center mt-4">
                        Select an Exercise to Add
                    </h2>
                    <div
                        v-for="(exercises, group) in exercises"
                        :key="group"
                        class="mt-5"
                    >
                        <h4>{{ group }}</h4>
                        <div class="exercises-grid">
                            <button
                                v-for="exercise in exercises"
                                :key="exercise.id"
                                :class="['border p-2 rounded fw-bold', {'bg-primary text-white': selectedExercises.some(e => e === exercise)}]"
                                @click="selectExercise(exercise)"
                            >
                                {{ exercise.name }}
                            </button>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                    >
                        Close
                    </button>
                    <button
                        type="button"
                        class="btn btn-primary"
                        data-bs-dismiss="modal"
                        @click="handleAddExercise"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, toRaw } from "vue";

const { workout, exercises, addExercises } = defineProps([
    "workout",
    "exercises",
    "addExercises",
]);

function handleAddExercise() {
    addExercises(toRaw(selectedExercises));
    selectedExercises.length = 0;
}

function selectExercise(exercise) {
    selectedExercises.push(exercise);
}
const selectedExercises = reactive([]);

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
        grid-template-columns: repeat(3, 1fr);
    }
}
</style>
