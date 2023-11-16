<template>
    <div class="p-3 mb-2 bg-form text-white full-screen d-flex justify-content-center align-items-center">
        <form class="form-quest p-5 px-5 border rounded-5 bg-white text-center">
            <img class="auth-logo-img mx-auto" src="../../assets/logo.png" alt="">

            <fieldset v-if="currentPage === 1" class="text-center">
                <div class="form-group mt-5">
                    <label for="date" class="text-black">Date of Birth</label>
                    <input v-model="date_birth" type="date" id="date" class="form-control" placeholder="Introduce your birthday">
                </div>

                <div class="form-group mt-5">
                    <label for="height" class="text-black">Introduce your Height</label>
                    <input v-model="height" type="text" id="height" class="form-control" placeholder="Introduce your Height">
                </div>

                <div class="form-group mt-5">
                    <label for="bodyWeight" class="text-black">Body weight</label>
                    <input v-model="body_weight" type="text" id="bodyWeight" class="form-control" placeholder="Introduce your body weight">
                </div>

                <p class="btn btn-primary mx-2 mt-3">{{ currentPage }}/{{ totalPages }}</p>
                <button @click="nextPage" class="btn btn-secondary">
                    <img width="20" src="../../assets/img/arrow-right.svg" alt="nextPage">
                </button>
            </fieldset>


            <fieldset v-if="currentPage === 2" class="text-center">
                <div class="form-group mt-5">
                    <label for="timeTraining" class="text-black">How long have you been training?</label>
                    <select v-model="time_training" id="timeTraining" class="form-control">
                        <option value="0-6 months">0 - 6 months</option>
                        <option value="6 months-1 year">6 months - 1 year</option>
                        <option value="1-2 years">1 - 2 years</option>
                        <option value="2+ years">+2 years</option>
                    </select>
                </div>

                <div class="form-group mt-5">
                    <label class="text-black">Amount of time available for training</label>
                    <input v-model="train_available_time" type="time" class="form-control" placeholder="Enter time available">
                </div>

                <div class="form-group mt-5 text-black">
                    <label class="text-black">Days available for training</label><br>
                    <input v-model="train_available_days" type="checkbox" id="monday" name="day" value="Monday"><label
                            for="monday">Mon</label>
                    <input v-model="train_available_days" type="checkbox" id="tuesday" name="day" value="Tuesday"><label
                            for="tuesday">Tue</label>
                    <input v-model="train_available_days" type="checkbox" id="wednesday" name="day" value="Wednesday"><label
                            for="wednesday">Wed</label>
                    <input v-model="train_available_days" type="checkbox" id="thursday" name="day" value="Thursday"><label
                            for="thursday">Thu</label>
                    <input v-model="train_available_days" type="checkbox" id="friday" name="day" value="Friday"><label
                            for="friday">Fri</label>
                    <input v-model="train_available_days" type="checkbox" id="saturday" name="day" value="Saturday"><label
                            for="saturday">Sat</label>
                    <input v-model="train_available_days" type="checkbox" id="sunday" name="day" value="Sunday"><label
                            for="sunday">Sun</label>
                </div>

                <button @click="previousPage" class="btn btn-secondary">
                    <img width="20" src="../../assets/img/arrow-left.svg" alt="Previous">
                </button>
                <p class="btn btn-primary mx-2 mt-3">{{ currentPage }}/{{ totalPages }}</p>
                <button @click="nextPage" class="btn btn-secondary">
                    <img width="20" src="../../assets/img/arrow-right.svg" alt="nextPrevious">
                </button>
            </fieldset>

            <fieldset v-if="currentPage === 3" class="text-center">
                <div class="form-group">
                    <label for="favoriteExercises" class="text-black">Favorite Exercises</label>
                    <textarea v-model="wishlist_exercises" id="favoriteExercises" class="form-control"
                        placeholder="Enter your favorite exercises"></textarea>
                </div>

                <div class="form-group">
                    <label for="hatedExercises" class="text-black">Hated Exercises</label>
                    <textarea v-model="banlist_exercises" id="hatedExercises" class="form-control" placeholder="Enter your hated exercises"></textarea>
                </div>
                <button @click="previousPage" class="btn btn-secondary">
                    <img width="20" src="../../assets/img/arrow-left.svg" alt="Previous">
                </button>
                <p class="btn btn-primary mx-2 mt-3">{{ currentPage }}/{{ totalPages }}</p>
                <button @click="nextPage" class="btn btn-secondary">
                    <img width="20" src="../../assets/img/arrow-right.svg" alt="nextPage">
                </button>
            </fieldset>

            <fieldset v-if="currentPage === 4" class="text-center">
                <div class="form-group">
                    <label for="shortTermGoals" class="text-black">Short-Term Goals</label>
                    <textarea v-model="short_term_goals" id="shortTermGoals" class="form-control" placeholder="Enter your short-term goals"></textarea>
                </div>

                <div class="form-group">
                    <label for="longTermGoals" class="text-black">Long-Term Goals</label>
                    <textarea v-model="long_term_goals" id="longTermGoals" class="form-control" placeholder="Enter your long-term goals"></textarea>
                </div>

                <p class="btn btn-primary mx-2 mt-3">
                    {{ currentPage }}/{{ totalPages }}
                </p>
                <button @click="enviarFormulario" class="btn btn-secondary mx-2">Send</button>
            </fieldset>
        </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const currentPage = ref(1);
const totalPages = 4;

/*primera pagina*/
const date_birth = ref("");
const height = ref("");
const body_weight = ref("");
/*segunda pagina*/
const time_training = ref("");
const train_available_time = ref("");
const train_available_days = ref([]);
/*tercera pagina*/ 
const wishlist_exercises = ref("");
const banlist_exercises = ref("");
/*cuarta pagina*/
const short_term_goals = ref("");
const long_term_goals = ref("");

const daysOfWeek = [
    { id: 'monday', label: 'Mon', value: 'Monday' },
    { id: 'tuesday', label: 'Tue', value: 'Tuesday' },
    { id: 'wednesday', label: 'Wed', value: 'Wednesday' },
    { id: 'thursday', label: 'Thu', value: 'Thursday' },
    { id: 'friday', label: 'Fri', value: 'Friday' },
    { id: 'saturday', label: 'Sat', value: 'Saturday' },
    { id: 'sunday', label: 'Sun', value: 'Sunday' },
];

function nextPage() {
    if (currentPage.value < totalPages) {
        currentPage.value += 1;
    }
}

function previousPage() {
    if (currentPage.value > 1) {
        currentPage.value -= 1;
    }
}

function enviarFormulario() {
    
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

label {
    margin-left: 1%;
}

.form-quest{
    width: 50rem;
    height: 55rem;
}

</style>