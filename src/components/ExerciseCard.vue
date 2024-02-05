<template>
  <div
    class="card"
    :class="
      exercise.is_default ? 'bg-light' : 'bg-primary text-white card-nodefault'
    "
  >
    <div class="p-3 d-flex flex-row justify-content-between align-items-center">
      <a
        target="_blank"
        :href="`https://www.google.com/search?tbm=isch&q=${exercise.name}`"
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
.card-nodefault:hover {
  background-color: black !important;
  transition: all ease-in-out 0.4s;
}

.card-nodefault:hover .delete-btn {
  opacity: 1;
  transition: all ease-in-out 0.4s;
}
.delete-btn {
  opacity: 0;
  transition: all ease-in-out 0.4s;
}
</style>
