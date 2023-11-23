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
      <fieldset v-if="currentPage === 1" class="form-page">
        <div class="form-group mt-5">
          <label for="date" class="text-center text-black">Date of Birth</label>
          <input
            @input="validateDate"
            type="date"
            id="date"
            class="form-control"
            :class="errors.date_birth ? 'is-invalid' : ''"
            placeholder="Introduce your birthday"
            required
            v-model="date_birth"
          />

          <div v-if="errors.date_birth" class="invalid-feedback">
            {{ errors.date_birth }}
          </div>
        </div>

        <div class="form-group mt-5">
          <label for="height" class="text-black">Introduce your Height</label>
          <input
            @input="validateHeight"
            type="text"
            id="height"
            class="form-control"
            :class="errors.height ? 'is-invalid' : ''"
            placeholder="Introduce your Height"
            required
            v-model="height"
          />
          <div v-if="errors.height" class="invalid-feedback">
            {{ errors.height }}
          </div>
        </div>

        <div class="form-group mt-5">
          <label for="bodyWeight" class="text-black">Body Weight</label>
          <input
            @input="validateBodyWeight"
            type="text"
            id="bodyWeight"
            class="form-control"
            :class="errors.body_weight ? 'is-invalid' : ''"
            placeholder="Introduce your body weight"
            required
            v-model="body_weight"
          />
          <div v-if="errors.body_weight" class="invalid-feedback">
            {{ errors.body_weight }}
          </div>
        </div>

        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="validatePage(1)" class="btn btn-secondary mt-4">
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
            :class="errors.time_training ? 'is-invalid' : ''"
            required
            v-model="time_training"
          >
            <option value="0-6 months">0 - 6 months</option>
            <option value="6 months-1 year">6 months - 1 year</option>
            <option value="1-2 years">1 - 2 years</option>
            <option value="2+ years">+2 years</option>
          </select>
          <div v-if="errors.time_training" class="invalid-feedback">
            {{ errors.time_training }}
          </div>
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
          <div v-if="errors.train_available_time" class="ivalid-feedback">
            {{ errors.train_available_time }}
          </div>
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

          <div v-if="errors.train_available_days" class="invalid-feedback">
            {{ errors.train_available_days }}
          </div>
        </div>

        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="validatePage(2)" class="btn btn-secondary mt-4">
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
            :class="errors.wishlist_exercises_ ? 'is-invalid' : ''"
            placeholder="Enter your favorite exercises"
            required
            v-model="wishlist_exercises"
          ></textarea>
          <div v-if="errors.wishlist_exercises_" class="invalid-feedback">
            {{ errors.wishlist_exercises_ }}
          </div>
        </div>

        <div class="form-group">
          <label for="hatedExercises" class="text-black">Hated Exercises</label>
          <textarea
            id="hatedExercises"
            class="form-control"
            :class="errors.banlist_exercises ? 'is-invalid' : ''"
            placeholder="Enter your hated exercises"
            required
            v-model="banlist_exercises"
          ></textarea>
          <div v-if="errors.banlist_exercises" class="invalid-feedback">
            {{ errors.banlist_exercises }}
          </div>
        </div>
        <p class="btn btn-primary mx-2 mt-5">
          {{ currentPage }}/{{ totalPages }}
        </p>
        <button @click.prevent="validatePage(3)" class="btn btn-secondary mt-4">
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
            :classs="errors.short_term_goals ? 'is-invalid' : ''"
            placeholder="Enter your short-term goals"
            requiered
            v-model="short_term_goals"
          ></textarea>
          <div v-if="errors.short_term_goals" class="invalid-feedback">
            {{ errors.short_term_goals }}
          </div>
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
          <div v-if="errors.long_term_goals" class="invalid-feedback">
            {{ errors.long_term_goals }}
          </div>
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
});
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

/* CONTROL DE ERRORES */
function validatePage(num) {
  switch (num) {
    case 1:
      if (!date_birth.value) {
        errors.date_birth = "Date field is mandatory.";
      }
      if (!height.value) {
        errors.height = "Height field is mandatory.";
      }
      if (!body_weight.value) {
        errors.body_weight = "Body weight field is mandatory.";
      }
      if (
        errors.date_birth == "" &&
        errors.height == "" &&
        errors.body_weight == ""
      ) {
        nextPage();
      }
    case 2:
      if (!time_training.value) {
        errors.time_training = "Time training field is mandatory.";
      }
      if (!train_available_time.value) {
        errors.train_available_time =
          "Train available time field is mandatory.";
      }
      if (!train_available_days.value) {
        errors.train_available_days =
          "Train available days field is mandatory.";
      }
      if (
        errors.time_training == "" &&
        errors.train_available_time == "" &&
        errors.train_available_days == ""
      ) {
        nextPage();
      }
    case 3:
      if (!wishlist_exercises.value) {
        errors.wishlist_exercises = "Wishlist exercises field is mandatory.";
      }
      if (!banlist_exercises.value) {
        errors.banlist_exercises = "Bablist exercises field is mandatory.";
      }
      if (errors.wishlist_exercises == "" && errors.banlist_exercises == "") {
        nextPage();
      }
    case 4:
      if (!short_term_goals.value) {
        errors.short_term_goals = "Short term goals field is mandatory.";
      }
      if (!long_term_goals.value) {
        errors.long_term_goals = "Long term goals field is mandatory.";
      }
      if (errors.short_term_goals == "" && errors.long_term_goals == "") {
        nextPage();
      }
      break;

    default:
      break;
  }
}
function validateDate() {
  const selectedDate = new Date(date_birth.value);
  const currentDate = new Date();

  return selectedDate <= currentDate;
}
function nextPage() {
  if (currentPage.value < totalPages) {
    currentPage.value += 1;
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
