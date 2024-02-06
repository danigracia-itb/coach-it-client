<template>
    <div
        class="card d-flex flex-row justify-content-between align-items-center gap-2 p-3 user-select-none"
        :class="
            exercise.is_default
                ? 'bg-light'
                : 'bg-primary text-white card-nodefault'
        "
    >
        <a
            target="_blank"
            :href="`https://www.google.com/search?tbm=isch&q=${exercise.name}`"
            :class="exercise.is_default ? 'text-primary' : 'text-white'"
            ><font-awesome-icon icon="fa-solid fa-eye"
        /></a>
        <p class="fw-bold mb-0">{{ exercise.name }}</p>

        <button
            class="delete-btn btn btn-danger"
            v-if="!exercise.is_default"
            @click="() => deleteExercise(exercise.id)"
        >
            <font-awesome-icon icon="fa-solid fa-trash" />
        </button>
        <p class="mb-0" v-else>Default</p>
    </div>
</template>

<script setup>
import axiosClient from "../config/axios";
const { exercise, deleteExercise } = defineProps([
    "exercise",
    "deleteExercise",
]);
</script>

<style>
.card-nodefault {
    transition: all ease-in-out 0.4s;
}
.card-nodefault:hover,
.card-nodefault:focus,
.card-nodefault:active {
    background-color: black !important;
    transition: all ease-in-out 0.4s;
}

.card-nodefault:hover .delete-btn,
.card-nodefault:focus .delete-btn,
.card-nodefault:active .delete-btn {
    opacity: 1;
    transition: all ease-in-out 0.4s;
}
.delete-btn {
    opacity: 0;
    transition: all ease-in-out 0.4s;
}
</style>
