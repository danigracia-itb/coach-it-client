<template>
    <Spinner v-if="loading" class="mx-auto mt-5" />
    <div class="mt-5" v-else>
        <div class="d-flex justify-content-start">
            <button class="btn btn-primary"
                @click="$router.back()">
                <font-awesome-icon
                    icon="fa-solid fa-left-long" />
            </button>
        </div>

        <header v-if="editing">
            <h1 class="text-center">
                Edit
                <span class="text-primary">{{ workout_date
                }}</span> Workout
            </h1>
        </header>

        <header v-else>
            <h1 class="text-center">Create Workout</h1>
            <p class="text-primary text-center fw-bold">{{ date
            }}</p>
        </header>

        <section class="mt-5">
            <h4>Exercises List</h4>

            <!-- workout List -->
            <ul class="list-unstyled mt-3">
                <li v-for="exercise in orderedWorkout"
                    :key="exercise.id"
                    class="card exercise-card p-4 mb-3 border-2">
                    <header
                        class="d-flex justify-content-between align-items-center">
                        <!-- Right -->
                        <div class="d-flex align-items-center gap-3">
                            <button
                            class="btn btn-dark"
                                @click="exercise.shown = !exercise.shown">
                                <font-awesome-icon
                                        icon="fa-solid fa-plus" />
                            </button>
                            <p class="fw-bold mb-0 h4">{{
                                exercise.name }}</p>
                        </div>
                        <!-- Left -->
                        <div class="d-flex align-items-center gap-3">
                            <div class="d-flex align-items-center gap-1">
                                <button class="btn btn-outline-dark" @click="() => changeExerciseOrder(exercise.exercise_id, true)
                                    ">
                                    <font-awesome-icon
                                        icon="fa-solid fa-arrow-up" />
                                </button>
                                <button class="btn btn-outline-dark" @click="() => changeExerciseOrder(exercise.exercise_id, false)
                                    ">
                                    <font-awesome-icon
                                        icon="fa-solid fa-arrow-down" />
                                </button>
                            </div>

                            <button class="btn btn-danger"
                                @click="() => deleteExercise(exercise.exercise_id)">
                                <font-awesome-icon
                                    icon="fa-solid fa-trash" />
                            </button>

                        </div>
                    </header>

                    <!-- Main exercise content -->
                    <section v-if="exercise.shown" class="mt-5">
                        <header
                            class="d-flex justify-content-between align-items-center mb-3">
                            <p class="mb-0">
                                <span class="fw-bold">Total
                                    Sets:</span>
                                {{ exercise.sets.length }}
                            </p>

                            <div
                                class="d-flex flex-column align-items-end">
                                <p class="mb-0">
                                    <span class="fw-bold">Actual
                                        / Target
                                        Tonelage:</span>
                                    {{
                                        calculateTonelage(
                                            exercise.sets,
                                            true,
                                            false
                                        )
                                    }}kg /
                                    {{
                                        calculateTonelage(exercise.sets,
                                            true)
                                    }}kg
                                </p>
                                <p class="mb-0">
                                    <span class="fw-bold">E1RM:
                                    </span>
                                    {{
                                        calculateMaxRpe(exercise.sets)
                                    }}kg
                                </p>
                            </div>
                        </header>

                        <SetsCard :exercise="exercise"
                            :copy-to-next-set="copyToNextSet"
                            :copy-to-actual="copyToActual"
                            :delete-set="deleteSet" />

                        <button class="btn btn-secondary w-100"
                            @click="() => addSet(exercise.exercise_id)"
                            :disabled="exercise.sets.length >= 8">
                            {{
                                exercise.sets.length >= 8
                                ? "You have reached the sets limit"
                                : "Add Set"
                            }}
                        </button>

                        <!-- Comentarios -->
                        <div class="mt-4">
                            <p>Exercise Notes</p>
                            <textarea rows="1"
                                class="form-control"
                                v-model="exercise.notes"></textarea>
                        </div>
                    </section>
                </li>
            </ul>

            <AddExerciseToWorkout :workout="workout"
                :add-exercises="addExercises" />

            <button v-if="workout.length > 0"
                class="btn btn-primary w-100 mt-5"
                @click="saveWorkout(false)">
                Save Workout
            </button>
            <button v-if="workout.length > 0 && editing"
                class="btn btn-dark w-100 mt-3"
                @click="saveWorkout(true)">
                Save Workout and Close
            </button>
            <button v-if="workout.length > 0 && !editing"
                class="btn btn-dark w-100 mt-3"
                @click="$router.back()">
                Close
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
import { useToast } from "vue-toast-notification";

//components
import Spinner from "../../components/utils/Spinner.vue";
import AddExerciseToWorkout from "../../components/workout/AddExerciseToWorkout.vue";
import SetsCard from "../../components/workout/SetsCard.vue";

//stores
import useExercisesStore from "../../stores/useExercisesStore";
import useAuthStore from "../../stores/useAuthStore";

//controllers
import exerciseController from "../../controllers/exerciseController";

const exercisesStore = useExercisesStore();
const authStore = useAuthStore();

//route
const route = useRoute();
const router = useRouter();

const toast = useToast();

const athlete_id = route.params.id;
const workout_id = route.params.workout_id;

const editing = route.params.workout_id ? true : false;

const workout_date = ref(route.query.date ?? null);
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
function addExercises(exercises) {
    for (let exercise of exercises) {
        workout.push({
            ...exercise,
            exercise_id: exercise.id,
            order: workout[workout.length - 1]
                ? workout[workout.length - 1].order + 1
                : 1,
            notes: "",
            sets: [],
            shown: true,
        });
    }

}

function deleteExercise(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    if (index !== -1) {
        workout.splice(index, 1);
    }
}

function changeExerciseOrder(exercise_id, go_up) {
    const index = findExerciseInWorkout(exercise_id);
    const currentExercise = workout[index];

    if (go_up && index > 0) {
        const previousExercise = workout[index - 1];
        if (currentExercise.order === previousExercise.order) return; // No changes if both have the same order
        currentExercise.order--; // Decrease current exercise order
        previousExercise.order++; // Increase previous exercise order
    } else if (!go_up && index < workout.length - 1) {
        const nextExercise = workout[index + 1];
        if (currentExercise.order === nextExercise.order) return; // No changes if both have the same order
        currentExercise.order++; // Increase current exercise order
        nextExercise.order--; // Decrease next exercise order
    }
    workout.sort((a, b) => a.order - b.order); // Sort workout based on order
}

//Sets
function addSet(exercise_id) {
    const index = findExerciseInWorkout(exercise_id);

    workout[index].sets.push({
        id: counter.value,
        actual_weight: "",
        actual_reps: "",
        actual_rpe: "",
        target_weight: "",
        target_reps: "",
        target_rpe: "",
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
    if (close || !editing) {
        loading.value = true;
    }
    try {
        if (editing) {
            await axiosClient.put("workout/" + workout_id, {
                workout,
            });
        } else {
            await axiosClient.post("workout", {
                user_id: athlete_id ?? authStore.id,
                date: workout_date.value,
                workout,
            });
        }
        if (close) {
            loading.value = false;
            router.back();
        } else {
            loading.value = false;
            toast.success("Workout saved", { position: "top" })
        }
    } catch (error) {
        console.log(error);
        loading.value = false;
        toast.error("Error, changes have not been saved", { position: "top" })
    }
}

onMounted(() => {
    if (editing) {
        getWorkout();
    }
    if (exercisesStore.exercises.length <= 0) {
        exerciseController.getExercises();
    }
});
</script>

<style scoped>
.exercise-card {
    background-color: rgb(230, 230, 230);
}
</style>
