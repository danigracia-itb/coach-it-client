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
                    v-for="exercise in workout"
                    :key="exercise.id"
                    class="card exercise-card p-4 mb-4"
                >
                    <p class="text-center fw-bold mb-1">{{ exercise.name }}</p>
                    <p class="text-end">{{ exercise.sets.length }} sets</p>

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
                            :key="set.n"
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
                                <input type="text" class="form-control" />
                                <input type="text" class="form-control" />
                                <input type="text" class="form-control" />
                            </div>

                            <button
                                class="set-number btn btn-danger mx-2 my-3 text-white"
                                @click="() => deleteSet(exercise.id, set.n)"
                            >
                                <font-awesome-icon icon="fa-solid fa-trash" />
                            </button>
                        </li>
                    </ol>
                    <button class="btn btn-secondary" @click="() => addSet(exercise.id)">
                        Add Set
                    </button>
                </li>
            </ul>
            <button class="btn btn-primary w-100" @click="addExercise">Add Exercise</button>
        </section>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import {selectExercise} from "../../functions/alerts"
import Spinner from "../../components/utils/Spinner.vue";

const route = useRoute();
const athlete_id = route.params.id;
const date = route.query.date;

const loading = ref(false)

const exercises = ref([])
const workout = reactive([]);

const counter = ref(1)

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
    selectExercise(exercises.value).then(result => {
        const exerciceToAdd = exercises.value[findExercise(parseInt(result))]

        workout.push({
            id: exerciceToAdd.id,
            name: exerciceToAdd.name,
            sets: []
        })
    })
}

//Sets
function addSet(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    workout[index].sets.push({
        n: counter.value,
    });
    counter.value = counter.value + 1
}

function deleteSet(exercise_id, set_n) {
    const exerciseIndex = findExerciseInWorkout(exercise_id);
    const setIndex = workout[exerciseIndex].sets.findIndex((set) => set.n === set_n);

    if (setIndex !== -1) {
        workout[exerciseIndex].sets.splice(setIndex, 1);
    }
}

onMounted(() => {
    getExercises()
})
</script>

<style scoped>
.set-header {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 0 4rem 0 3.5rem;
}
.set-number {
    width: 3.5rem;
}

.exercise-card {
    background-color: rgb(230, 230, 230);
}
</style>
