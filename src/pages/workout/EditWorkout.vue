<template>
    <Spinner v-if="loading" class="mx-auto mt-5" />
    <div class="mt-5" v-else>
        <div class="d-flex justify-content-start">
            <button class="btn btn-primary" @click="$router.back()">
                <font-awesome-icon icon="fa-solid fa-left-long" />
            </button>
        </div>

        <header>
            <h1 class="text-center">
                Edit
                <span class="text-primary">{{ workout_date }}</span> Workout
            </h1>
            <p class="text-primary text-center fw-bold">{{ date }}</p>
        </header>

        <section class="container mt-5">
            <h4>Exercises List</h4>

            <!-- workout List -->
            <ul class="list-unstyled mt-3">
                <li v-for="exercise in orderedWorkout" :key="exercise.id" class="card exercise-card p-4 mb-4">
                    <button class="delete-exercise btn" @click="() => deleteExercise(exercise.exercise_id)">
                        <font-awesome-icon icon="fa-solid fa-xmark" />
                    </button>

                    <!-- <div class="order-exercise">
                        <button
                            class="btn"
                            @click="
                                () => changeExerciseOrder(exercise.exercise_id, true)
                            "
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-up" />
                        </button>
                        <button
                            class="btn"
                            @click="
                                () => changeExerciseOrder(exercise.exercise_id, false)
                            "
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-down" />
                        </button>
                    </div> -->

                    <header class="text-center mb-4">
                        <p class="fw-bold mb-0 h4">{{ exercise.name }}</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <p class="mb-0">
                                <span class="fw-bold">Total Sets:</span>
                                {{ exercise.sets.length }}
                            </p>

                            <div class="d-flex flex-column align-items-end">
                                <p class="mb-0">
                                    <span class="fw-bold">Actual / Target Tonelage:</span>
                                    {{
                                        calculateTonelage(
                                            exercise.sets,
                                            true,
                                            false
                                        )
                                    }}kg /
                                    {{
                                        calculateTonelage(exercise.sets, true)
                                    }}kg
                                </p>
                                <p class="mb-0">
                                    <span class="fw-bold">E1RM: </span>
                                    {{ calculateMaxRpe(exercise.sets) }}kg
                                </p>
                            </div>
                        </div>
                    </header>

                    <!-- Sets header -->
                    <section class="set-headers-group" v-if="exercise.sets.length > 0">
                        <section class="text-center bg-light set-header-target">
                            <div class="fw-normal">TARGET</div>

                            <div class="set-labels">
                                <div class="fw-normal cursor-pointer" v-tooltip="'WEIGHT: number of KG used in the set'
                                    ">
                                    WEIGHT
                                </div>
                                <div class="fw-normal cursor-pointer" v-tooltip="'REPS: number of repetitions that should be performed in the set'
                                    ">
                                    REPS
                                </div>
                                <div class="fw-normal cursor-pointer" v-tooltip="'RPE: effort level for the set, on a scale of 1 to 10'
                                    ">
                                    RPE
                                </div>
                            </div>
                        </section>

                        <section class="text-center bg-white set-header-actual">
                            <div class="fw-normal">ACTUAL</div>

                            <div class="set-labels">
                                <div class="fw-normal cursor-pointer" v-tooltip="'WEIGHT: number of KG used in the set'
                                    ">
                                    WEIGHT
                                </div>
                                <div class="fw-normal cursor-pointer" v-tooltip="'REPS: number of repetitions that should be performed in the set'
                                    ">
                                    REPS
                                </div>
                                <div class="fw-normal cursor-pointer" v-tooltip="'RPE: effort level for the set, on a scale of 1 to 10'
                                    ">
                                    RPE
                                </div>
                            </div>
                        </section>
                    </section>

                    <!-- Sets list -->
                    <ol v-if="exercise.sets.length > 0" class="my-3 text-unstyled p-0 border rounded">
                        <li v-for="(set, index) in exercise.sets" :key="set.id" class="d-flex bg-white border-bottom">
                            <!-- Set Number -->
                            <p
                                class="set-number bg-primary d-flex align-items-center justify-content-center mb-0 text-white">
                                {{ index + 1 }}
                            </p>

                            <!-- Set content -->
                            <div class="p-3 w-100 d-flex gap-2 bg-light border-end">
                                <input type="number" class="form-control text-center" v-model="set.target_weight" />
                                <input type="number" class="form-control text-center" v-model="set.target_reps" />
                                <input type="number" class="form-control text-center" v-model="set.target_rpe" />
                            </div>

                            <button class="btn btn-primary rounded-0" @click="copyToActual(set)">
                                <font-awesome-icon icon="fa-solid fa-arrow-right" />
                            </button>

                            <div class="p-3 w-100 d-flex gap-2">
                                <!-- ACTUAL -->
                                <input type="number" class="form-control text-center" v-model="set.actual_weight" />
                                <input type="number" class="form-control text-center" v-model="set.actual_reps" />
                                <input type="number" class="form-control text-center" v-model="set.actual_rpe" />
                            </div>

                            <button class="btn btn-danger mx-2 my-3 text-white" @click="() =>
                                deleteSet(exercise.exercise_id, set.id)
                                ">
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>

                            <button class="btn btn-primary rounded-0" :disabled="index + 1 == exercise.sets.length"
                                @click="copyToNextSet(exercise, index, set)">
                                <font-awesome-icon icon="fa-solid fa-arrow-down" />
                            </button>
                        </li>
                    </ol>
                    <button class="btn btn-secondary" @click="() => addSet(exercise.exercise_id)"
                        :disabled="exercise.sets.length >= 8">
                        {{
                            exercise.sets.length >= 8
                            ? "You have reached the sets limit"
                            : "Add Set"
                        }}
                    </button>
                </li>
            </ul>
            <button class="btn btn-dark w-100" @click="addExercise" :disabled="workout.length >= 15">
                {{
                    workout.length >= 15
                    ? "You have reached the exercises limit"
                    : "Add Exercise"
                }}
            </button>

            <button v-if="workout.length > 0" class="btn btn-primary w-100 mt-5" @click="saveWorkout(false)">
                Save Workout
            </button>
            <button v-if="workout.length > 0" class="btn btn-dark w-100 mt-3" @click="saveWorkout(true)">
                Save Workout and Close
            </button>
        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import _ from "lodash";
import axiosClient from "../../config/axios";

//helpers
import { selectExercise } from "../../functions/alerts";
import { calculateTonelage, calculateMaxRpe } from "../../functions/helpers";

//components
import Spinner from "../../components/utils/Spinner.vue";

//stores
import useExercisesStore from "../../stores/useExercisesStore";

//controllers
import exerciseController from "../../controllers/exerciseController";

const exercisesStore = useExercisesStore();

//route
const route = useRoute();
const router = useRouter();
const athlete_id = route.params.id;
const workout_id = route.params.workout_id;

const workout_date = ref(null);
const loading = ref(false);

const workout = reactive([]);
const orderedWorkout = computed(() => _.orderBy(workout, "order"));

const counter = ref(1);

async function getWorkout() {
    loading.value = true;
    try {
        const response = await axiosClient("workout/" + workout_id);
        console.log(response.data);
        workout_date.value = response.data[0].date;

        for (let i of response.data) {
            workout.push(i);
        }
        loading.value = false;
    } catch (e) {
        console.log(e);
    }
}

function findExerciseInWorkout(exercise_id) {
    return workout.findIndex((e) => e.exercise_id === exercise_id);
}

//Exercise
function addExercise() {
    selectExercise(exercisesStore.exercises, workout).then((result) => {
        const exerciceToAdd =
            exercisesStore.exercises[
            exercisesStore.getExerciseIndex(parseInt(result))
            ];

        workout.push({
            ...exerciceToAdd,
            exercise_id: exerciceToAdd.id,
            order: workout[workout.length - 1].order + 1,
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

//Sets
function addSet(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    workout[index].sets.push({
        id: counter.value,
        actual_weight: 0,
        actual_reps: 0,
        actual_rpe: 0,
        target_weight: 0,
        target_reps: 0,
        target_rpe: 0,
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

function copyToNextSet(exercise, index, set) {
    const targetSet = exercise.sets[index + 1];

    targetSet.actual_weight = set.actual_weight;
    targetSet.actual_reps = set.actual_reps;
    targetSet.actual_rpe = set.actual_rpe;
    targetSet.target_weight = set.target_weight;
    targetSet.target_reps = set.target_reps;
    targetSet.target_rpe = set.target_rpe;
}

function copyToActual(set) {
    set.actual_weight = set.target_weight;
    set.actual_reps = set.target_reps;
    set.actual_rpe = set.target_rpe;
}

//Enviar api
async function saveWorkout(close = false) {
    if (close) {
        loading.value = true;
    }

    try {
        const respuesta = await axiosClient.put("workout/" + workout_id, {
            workout,
        });
        console.log(respuesta);
        if (close) {
            router.push("/athlete")
        }

        loading.value = false;
    } catch (error) {
        console.log(error);
        loading.value = false;
    }
}

onMounted(() => {
    getWorkout();
    if (exercisesStore.exercises.length <= 0) {
        exerciseController.getExercises();
    }
});
</script>

<style scoped>
.set-headers-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
}

.set-headers-group section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.set-header-target {
    padding: 0 5rem 0 6rem !important;
}

.set-header-actual {
    padding: 0 10rem 0 2rem !important;
}

.set-labels {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
}

.set-super-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}

.set-header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin: 0 6rem 0 3.5rem;
}

.set-number {
    width: 10rem;
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
