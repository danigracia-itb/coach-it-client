<template>
    <Spinner v-if="loading" class="mx-auto mt-5" />
    <div class="mt-5" v-else>
        <header>
            <h1 class="text-center">Create Workout</h1>
            <p class="text-primary text-center fw-bold">{{ date }}</p>
        </header>

        <section class="container mt-5">
            <h4>Exercises List</h4>

            <!-- workout List -->
            <ul class="list-unstyled mt-3">
                <li
                    v-for="exercise in orderedWorkout"
                    :key="exercise.id"
                    class="card exercise-card p-4 mb-2"
                >
                    <button
                        class="delete-exercise btn"
                        @click="() => deleteExercise(exercise.id)"
                    >
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>

                    <div class="order-exercise">
                        <button
                            class="btn"
                            @click="
                                () => changeExerciseOrder(exercise.id, true)
                            "
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-up" />
                        </button>
                        <button
                            class="btn"
                            @click="
                                () => changeExerciseOrder(exercise.id, false)
                            "
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-down" />
                        </button>
                    </div>

                    <header class="text-center mb-4">
                        <p class="fw-bold mb-0 h4">{{ exercise.name }}</p>
                        <div
                            class="d-flex justify-content-between align-items-center"
                        >
                            <p class="mb-0">
                                <span class="fw-bold">Total Sets:</span>
                                {{ exercise.sets.length }}
                            </p>
                            <p class="mb-0">
                                <span class="fw-bold">Tonelage:</span>
                                {{ calculateTonelage(exercise.sets) }}kg
                            </p>
                        </div>
                    </header>

                    <!-- Sets header -->
                    <section
                        v-if="exercise.sets.length > 0"
                        class="set-header p-0 text-center"
                    >
                        <div class="fw-normal">WEIGHT</div>
                        <div class="fw-normal">REPS</div>
                        <div class="fw-normal">RPE</div>
                    </section>

                    <!-- Sets list -->
                    <ol
                        v-if="exercise.sets.length > 0"
                        class="my-3 text-unstyled p-0 border rounded"
                    >
                        <li
                            v-for="(set, index) in exercise.sets"
                            :key="set.id"
                            class="d-flex bg-white border-bottom"
                        >
                            <!-- Set Number -->
                            <p
                                class="set-number bg-primary d-flex align-items-center justify-content-center mb-0 text-white"
                            >
                                {{ index + 1 }}
                            </p>

                            <!-- Set content -->
                            <div class="m-3 w-100 d-flex gap-2">
                                <input
                                    type="number"
                                    class="form-control text-center"
                                    v-model="set.weight"
                                />
                                <input
                                    type="number"
                                    class="form-control text-center"
                                    v-model="set.reps"
                                />
                                <input
                                    type="number"
                                    class="form-control text-center"
                                    v-model="set.rpe"
                                />
                            </div>

                            <button
                                class="set-number btn btn-danger mx-2 my-3 text-white"
                                @click="() => deleteSet(exercise.id, set.id)"
                            >
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                        </li>
                    </ol>
                    <button
                        class="btn btn-secondary"
                        @click="() => addSet(exercise.id)"
                    >
                        Add Set
                    </button>
                </li>
            </ul>
            <button class="btn btn-dark w-100" @click="addExercise">
                Add Exercise
            </button>

            <button
                v-if="workout.length > 0"
                class="btn btn-primary w-100 mt-5"
                @click="saveWorkout"
            >
                Save Workout
            </button>
        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute } from "vue-router";
import _ from "lodash";

import axiosClient from "../../../config/axios";

import { selectExercise } from "../../../functions/alerts";
import { calculateTonelage } from "../../../functions/helpers";
import Spinner from "../../../components/utils/Spinner.vue";

const route = useRoute();
const athlete_id = route.params.id;
const date = route.query.date;

const loading = ref(false);

//API EXERCISES
const exercises = ref([]);

const workout = reactive([]);
const orderedWorkout = computed(() => _.orderBy(workout, "order"));

const counter = ref(1);

async function getExercises() {
    loading.value = true;
    try {
        const response = await axiosClient(
            "exercises/get-all-user/" + localStorage.getItem("id")
        );

        exercises.value = response.data;
        loading.value = false;
    } catch (e) {
        console.log(e);
        loading.value = false;
    }
}

function findExerciseInWorkout(exercise_id) {
    return workout.findIndex((e) => e.id === exercise_id);
}

function findExercise(exercise_id) {
    return exercises.value.findIndex((e) => e.id === exercise_id);
}

//Exercise
function addExercise() {
    selectExercise(exercises.value, workout).then((result) => {
        const exerciceToAdd = exercises.value[findExercise(parseInt(result))];

        workout.push({
            ...exerciceToAdd,
            sets: [],
        });
    });
}

function deleteExercise(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    if (index !== -1) {
        workout.splice(index, 1);
    }
}

//go_up is a boolean
function changeExerciseOrder(exercise_id, go_up) {
    const index = findExerciseInWorkout(exercise_id);

    if (go_up && index > 0) {
        // Swap the current exercise with the one above it
        [workout[index - 1], workout[index]] = [
            workout[index],
            workout[index - 1],
        ];
    } else if (!go_up && index < workout.length - 1) {
        // Swap the current exercise with the one below it
        [workout[index], workout[index + 1]] = [
            workout[index + 1],
            workout[index],
        ];
    }
}

//Sets
function addSet(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    workout[index].sets.push({
        id: counter.value,
        weight: 0,
        reps: 0,
        rpe: 0,
    });
    counter.value = counter.value + 1;
}

function deleteSet(exercise_id, set_id) {
    const exerciseIndex = findExerciseInWorkout(exercise_id);
    const setIndex = workout[exerciseIndex].sets.findIndex(
        (set) => set.id === set_id
    );

    if (setIndex !== -1) {
        workout[exerciseIndex].sets.splice(setIndex, 1);
    }
}

//Enviar api
async function saveWorkout() {
    loading.value = true;
    try {
        const respuesta = await axiosClient.post("workout", {
            user_id: athlete_id,
            date,
            workout
        })
        console.log(respuesta)
        loading.value = false;
    } catch (error) {
        console.log(error)
        loading.value = false;
    }
}

onMounted(() => {
    getExercises();
});
</script>

<style scoped>
.set-header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 6rem 0 3.5rem;
}
.set-number {
    width: 3.5rem;
}

.exercise-card {
    background-color: rgb(230, 230, 230);
}

.delete-exercise {
    position: absolute;
    right: 0;
    top: 0;

    border: 1px solid lightgray;
    border-radius: 0px 2px 0px 0px;
}

.delete-exercise:hover {
    background-color: white;
}

.order-exercise {
    position: absolute;
    left: 0;
    top: 0;
}

.order-exercise .btn {
    border: 1px solid lightgray;
    border-radius: 0px 2px 0px 0px;
}

.order-exercise .btn:hover {
    background-color: white;
}
</style>
