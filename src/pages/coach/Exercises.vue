<template>
    <div>
      <h1 class="text-center mt-5">Exercises</h1>
  
      <!-- Acciones -->
      <div class="d-flex justify-content-end">
        <button class="btn btn-primary" @click="addExercise">
          <font-awesome-icon icon="fa-solid fa-plus" />
        </button>
      </div>
      <Spinner class="mt-5" v-if="loading" />
  
      <div v-else>
        <div
          v-for="(exercises, group) in groupedExercises"
          :key="group"
          class="mt-5"
        >
          <div class="d-flex gap-2">
            <h4>{{ group }}</h4>
            <font-awesome-icon v-tooltip="getTooltipContent(group)" icon="fa-regular fa-circle-question" class="fa-xs"/>
          </div>
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
  import { onMounted, reactive, ref } from "vue";
  import axiosClient from "../../config/axios";
  import Spinner from "../../components/utils/Spinner.vue";
  import ExerciseCard from "../../components/ExerciseCard.vue";
  import { addExercisePopup } from "../../functions/alerts";
  
  const loading = ref(true);
  var exercises = reactive([]);
  
  function addExercise() {
    addExercisePopup().then(({ exercise }) => {
      exercises.push(exercise);
      updateGroupedExercises();
    });
  }
  
  async function deleteExercise(id) {
    try {
      deleteExerciseFromArray(id);
      updateGroupedExercises();
  
      await axiosClient.delete("exercises/" + id);
    } catch (e) {
      console.log(e);
    }
  }
  
  async function getExercises() {
    loading.value = true;
    try {
      const response = await axiosClient(
        "exercises/get-all-user/" + localStorage.getItem("id")
      );
  
      exercises = response.data;
  
      updateGroupedExercises();
  
      loading.value = false;
    } catch (e) {
      console.log(e);
      loading.value = false;
    }
  }
  
  function deleteExerciseFromArray(id) {
    const index = exercises.findIndex((exercise) => exercise.id === id);
  
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
  