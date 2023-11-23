<template>
  <div
    class="p-3 bg-form text-white full-screen d-flex justify-content-center align-items-center"
  >
    <form
      :class="{ 'form-error': showError }"
      class="form-quest p-5 px-5 border rounded-5 bg-white text-center"
    >
      <img class="auth-logo-img mx-auto" src="../../assets/logo.png" alt="" />

      <!-- Page 1 -->
      <fieldset v-if="currentPage === 1" class="text-center form-page">
        <div class="form-group mt-5">
          <label for="date" class="text-black">Date of Birth</label>
          <input
            @input="validateDate"
            type="date"
            id="date"
            class="form-control"
            :class="errors.dateError ? 'is-invalid' : ''"
            placeholder="Introduce your birthday"
            required
            v-model="date_birth"
          />

          <div v-if="errors.dateError" class="invalid-feedback">
            {{ errors.dateError }}
          </div>
        </div>

        <div class="form-group mt-5">
          <label for="height" class="text-black">Introduce your Height</label>
          <input
            @input="validateHeight"
            type="text"
            id="height"
            class="form-control"
            :class="errors.heightError ? 'is-invalid' : ''"
            placeholder="Introduce your Height"
            required
            v-model="height"
          />
          <div v-if="errors.heightError" class="invalid-feedback">
            {{ errors.heightError }}
          </div>
        </div>

        <div class="form-group mt-5">
          <label for="bodyWeight" class="text-black">Body Weight</label>
          <input
            @input="validateBodyWeight"
            type="text"
            id="bodyWeight"
            class="form-control"
            :class="errors.bodyWeightError ? 'is-invalid' : ''"
            placeholder="Introduce your body weight"
            required
            v-model="body_weight"
          />
          <div v-if="errors.bodyWeightError" class="invalid-feedback">
            {{ errors.bodyWeightError }}
          </div>
        </div>

        <div v-if="showError" class="alert alert-danger mt-5">
          Please complete all fields before moving to the next page.
        </div>

        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="nextPage" class="btn btn-secondary mt-4">
          <img
            width="20"
            src="../../assets/img/arrow-right.svg"
            alt="nextPage"
          />
        </button>
      </fieldset>

      <!-- Page 2 -->
      <fieldset v-if="currentPage === 2" class="text-center form-page">
        <div class="form-group mt-5">
          <label for="timeTraining" class="text-black"
            >How long have you been training?</label
          >
          <select
            id="timeTraining"
            class="form-control"
            :class="errors.timeTraining ? 'is-invalid' : ''"
            required
            v-model="time_training"
          >
            <option value="0-6 months">0 - 6 months</option>
            <option value="6 months-1 year">6 months - 1 year</option>
            <option value="1-2 years">1 - 2 years</option>
            <option value="2+ years">+2 years</option>
          </select>
        </div>

        <div v-if="errors.timeTraining" class="invalid-feedback">
          {{ errors.timeTraining }}
        </div>

        <div class="form-group mt-5">
          <label class="text-black"
            >Amount of time available for training</label
          >
          <input
            type="time"
            class="form-control"
            :class="errors.train_available_time ? 'is-invalid' : ''"
            placeholder="Enter time available"
            requiered
            v-model="train_available_time"
          />
        </div>

        <div v-if="errors.train_available_time" class="ivalid-feedback">
          {{ errors.train_available_time }}
        </div>

        <div class="form-group mt-5 text-black">
          <label class="text-black">Days available for training</label><br />
          <input
            type="checkbox"
            id="monday"
            name="day"
            value="Monday"
            v-model="train_available_days"
          /><label for="monday">Mon</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="tuesday"
            name="day"
            value="Tuesday"
          /><label for="tuesday">Tue</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="wednesday"
            name="day"
            value="Wednesday"
          /><label for="wednesday">Wed</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="thursday"
            name="day"
            value="Thursday"
          /><label for="thursday">Thu</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="friday"
            name="day"
            value="Friday"
          /><label for="friday">Fri</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="saturday"
            name="day"
            value="Saturday"
          /><label for="saturday">Sat</label>
          <input
            v-model="train_available_days"
            type="checkbox"
            id="sunday"
            name="day"
            value="Sunday"
          /><label for="sunday">Sun</label>
        </div>

        <div v-if="showError" class="alert alert-danger mt-5">
          Please complete all fields before moving to the next page.
        </div>
        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="nextPage" class="btn btn-secondary mt-4">
          <img
            width="20"
            src="../../assets/img/arrow-right.svg"
            alt="nextPrevious"
          />
        </button>
      </fieldset>

      <!-- Page 3 -->
      <fieldset v-if="currentPage === 3" class="text-center form-page">
        <div class="form-group">
          <label for="favoriteExercises" class="text-black"
            >Favorite Exercises</label
          >
          <textarea
            id="favoriteExercises"
            class="form-control"
            :class="errors.favoriteExercises ? 'is-invalid' : ''"
            placeholder="Enter your favorite exercises"
            required
            v-model="wishlist_exercises"
          ></textarea>
        </div>

        <div v-if="errors.favoriteExercises" class="invalid-feedback"></div>

        <div class="form-group">
          <label for="hatedExercises" class="text-black">Hated Exercises</label>
          <textarea
            id="hatedExercises"
            class="form-control"
            :class="errors.heatedExercises ? 'is-invalid' : ''"
            placeholder="Enter your hated exercises"
            required
            v-model="banlist_exercises"
          ></textarea>
        </div>

        <div v-if="errors.heatedExercises" class="invalid-feedback">
          {{ errors.heatedExercises }}
        </div>

        <div v-if="showError" class="alert alert-danger mt-5">
          Please complete all fields before moving to the next page.
        </div>
        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="nextPage" class="btn btn-secondary mt-4">
          <img
            width="20"
            src="../../assets/img/arrow-right.svg"
            alt="nextPage"
          />
        </button>
      </fieldset>

      <!-- Page 4 -->
      <fieldset v-if="currentPage === 4" class="text-center form-page">
        <div class="form-group">
          <label for="shortTermGoals" class="text-black"
            >Short-Term Goals</label
          >
          <textarea
            id="shortTermGoals"
            class="form-control"
            :classs="errors.shortTermGoalsError ? 'is-invalid' : ''"
            placeholder="Enter your short-term goals"
            requiered
            v-model="short_term_goals"
          ></textarea>
        </div>

        <div v-if="errors.shortTermGoalsError" class="invalid-feedback">
          {{ errors.shortTermGoalsError }}
        </div>
        <div class="form-group">
          <label for="longTermGoals" class="text-black">Long-Term Goals</label>
          <textarea
            id="longTermGoals"
            class="form-control"
            :class="errors.long_term_goals ? 'is-invalid' : ''"
            placeholder="Enter your long-term goals"
            requiered
            v-model="long_term_goals"
          ></textarea>
        </div>

        <div v-if="errors.longTermGoalsError" class="invalid-feedback">
          {{ errors.longTermGoalsError }}
        </div>
        <div v-if="showError" class="alert alert-danger mt-5">
          Please complete all fields before moving to the next page.
        </div>
        <button
          @click.prevent="enviarFormulario"
          class="btn btn-secondary mx-2 mt-5"
        >
          Send
        </button>
      </fieldset>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from "vue";

const currentPage = ref(1);
const totalPages = 4;

const errors = reactive({
  date_birth: "",
  height: "",
  body_weight: "",
  time_training: "",
  train_available_time: "",
  train_available_days: "",
  wishlist_exercises_: "",
  banlist_exercises: "",
  short_term_goals: "",
  long_term_goals: "",
  // daysOfWeek: ""
})
/* Primera página */
const date_birth = ref("");
const height = ref("");
const body_weight = ref("");


/* Segunda página */
const time_training = ref("");
const train_available_time = ref("");
const train_available_days = ref([]);


/* Tercera página */
const wishlist_exercises = ref("");
const banlist_exercises = ref("");

/* Cuarta página */
const short_term_goals = ref("");
const long_term_goals = ref("");


const daysOfWeek = [
  { id: "monday", label: "Mon", value: "Monday" },
  { id: "tuesday", label: "Tue", value: "Tuesday" },
  { id: "wednesday", label: "Wed", value: "Wednesday" },
  { id: "thursday", label: "Thu", value: "Thursday" },
  { id: "friday", label: "Fri", value: "Friday" },
  { id: "saturday", label: "Sat", value: "Saturday" },
  { id: "sunday", label: "Sun", value: "Sunday" },
];

/* CONTROL DE ERRORES */
const showError = ref(false);

function validatePage3() {
  wishlistExercisesError.value = !wishlist_exercises.value.trim();
  banlistExercisesError.value = !banlist_exercises.value.trim();

  return !wishlistExercisesError.value && !banlistExercisesError.value;
}

function validatePage2() {
  timeTrainingError.value = !time_training.value;
  trainAvailableTimeError.value = !train_available_time.value;
  trainAvailableDaysError.value = train_available_days.length === 0;

  return (
    !timeTrainingError.value &&
    !trainAvailableTimeError.value &&
    !trainAvailableDaysError.value
  );
}

function validateFields() {
  if (currentPage.value === 1) {
    dateError.value = !validateDate();
    heightError.value = isNaN(height.value) || height.value <= 0;
    bodyWeightError.value = isNaN(body_weight.value) || body_weight.value <= 0;

    return !dateError.value && !heightError.value && !bodyWeightError.value;
  } else if (currentPage.value === 2) {
    return validatePage2();
  } else if (currentPage.value === 3) {
    return validatePage3();
  } else if (currentPage.value === 4) {
    shortTermGoalsError.value = false;
    longTermGoalsError.value = false;

    return !!short_term_goals.value && !!long_term_goals.value;
  }
  return false;
}

function validateDate() {
  const selectedDate = new Date(date_birth.value);
  const currentDate = new Date();

  return selectedDate <= currentDate;
}

function nextPage() {
  if (validateFields()) {
    if (currentPage.value < totalPages) {
      currentPage.value += 1;
    }
    showError.value = false;
  } else {
    showError.value = true;
  }
}
</script>

<style scoped>
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: auto;
}

.bg-form {
  background-image: url(../../assets/img/img-form.jpg);
  background-repeat: no-repeat;
  background-size: cover;
}

.label {
  margin-left: 1%;
}

.form-quest {
  max-width: 50rem;
  width: 100%;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}

.form-error {
  height: auto;
}
@media (max-width: 768px) {
  .form-quest {
    padding: 1rem;
  }
}

@media (max-width: 576px) {
  .form-quest {
    padding: 0.5rem;
  }
}

</style>
