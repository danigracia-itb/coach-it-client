<template>
    <!-- Button trigger modal -->
    <button
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#addExerciseModal"
        class="btn btn-success w-100"
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

                    <div class="my-5">
                        <input
                            type="text"
                            class="form-control w-100"
                            placeholder="Search exercises..."
                            v-model="searchInput"
                        />
                    </div>

                    <div v-if="!areAllEmptyArrays(exerciseStore.getFilteredExercises(searchInput))">
                        <div
                            v-for="(
                                exercises, group
                            ) in exerciseStore.getFilteredExercises(
                                searchInput
                            )"
                            :key="group"
                            class="mt-5"
                        >
                            <h4>{{ group }}</h4>
                            <div class="exercises-grid">
                                <button
                                    v-for="exercise in exercises"
                                    :key="exercise.id"
                                    :class="[
                                        'border p-2 rounded fw-bold',
                                        {
                                            'bg-primary text-white':
                                                selectedExercises.some(
                                                    (e) => e === exercise
                                                ),
                                        },
                                    ]"
                                    @click="selectExercise(exercise)"
                                    :disabled="
                                        workout.find(
                                            (w) => w.exercise_id == exercise.id
                                        )
                                    "
                                >
                                    <span
                                        v-if="
                                            selectedExercises.some(
                                                (e) => e === exercise
                                            )
                                        "
                                        >{{
                                            selectedExercises.findIndex(
                                                (e) => e === exercise
                                            ) + 1
                                        }}</span
                                    >
                                    {{ exercise.name }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <h4 class="text-center">No results</h4>
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
                        :disabled="selectedExercises.length <= 0"
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref, toRaw } from "vue";
import useExercisesStore from "../../stores/useExercisesStore";
import { areAllEmptyArrays } from "../../functions/helpers";

const exerciseStore = useExercisesStore();

const { workout, addExercises } = defineProps([
    "workout",
    "exercises",
    "addExercises",
]);

function handleAddExercise() {
    addExercises(toRaw(selectedExercises));
    selectedExercises.length = 0;
}

function selectExercise(exercise) {
    const index = selectedExercises.findIndex((e) => e.id == exercise.id);
    if (index >= 0) {
        selectedExercises.splice(index, 1);
    } else {
        selectedExercises.push(exercise);
    }
}
const selectedExercises = reactive([]);
const searchInput = ref("");
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
