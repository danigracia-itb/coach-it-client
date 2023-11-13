<template>
    <div class="p-3 mb-2 bg-form text-white full-screen d-flex justify-content-center align-items-center">
        <form class="p-5 px-5 border rounded-5 bg-white text-center">
            <img class="auth-logo-img mx-auto" src="../../assets/logo.png" alt="">

            <fieldset v-if="currentPage === 1" class="text-center">
                <div class="form-group mt-5">
                    <label for="date" class="text-black">Date of Birth</label>
                    <input type="date" id="date" class="form-control" placeholder="Introduce your birthday">
                </div>

                <div class="form-group mt-5">
                    <label for="height" class="text-black">Introduce your Height</label>
                    <input type="text" id="height" class="form-control" placeholder="Introduce your Height">
                </div>

                <div class="form-group mt-5">
                    <label for="bodyWeight" class="text-black">Body weight</label>
                    <input type="text" id="bodyWeight" class="form-control" placeholder="Introduce your body weight">
                </div>
                <button @click="nextPage">Next</button>
            </fieldset>


            <fieldset v-if="currentPage === 2" class="text-center">
                <div class="form-group mt-5">
                    <label for="timeTraining" class="text-black">Time training:</label>
                    <select id="timeTraining" class="form-control">
                        <option value="0-6 months">0 - 6 months</option>
                        <option value="6 months-1 year">6 months - 1 year</option>
                        <option value="1-2 years">1 - 2 years</option>
                        <option value="2+ years">+2 years</option>
                    </select>
                </div>

                <div class="form-group mt-5">
                    <label class="text-black">Amount of time available for training (hours:minutes)</label>
                    <input type="time" class="form-control" placeholder="Enter time available">
                </div>

                <div class="form-group mt-5 text-black">
                    <label class="text-black">Days available for training</label><br>
                    <span><input type="checkbox" id="monday" name="day" value="Monday"><label
                            for="monday">Mon</label></span>
                    <span><input type="checkbox" id="tuesday" name="day" value="Tuesday"><label
                            for="tuesday">Tue</label></span>
                    <span><input type="checkbox" id="wednesday" name="day" value="Wednesday"><label
                            for="wednesday">Wed</label></span>
                    <span><input type="checkbox" id="thursday" name="day" value="Thursday"><label
                            for="thursday">Thu</label></span>
                    <span><input type="checkbox" id="friday" name="day" value="Friday"><label
                            for="friday">Fri</label></span>
                    <span><input type="checkbox" id="saturday" name="day" value="Saturday"><label
                            for="saturday">Sat</label></span>
                    <span><input type="checkbox" id="sunday" name="day" value="Sunday"><label
                            for="sunday">Sun</label></span>
                </div>
                <button @click="nextPage">Next</button>
            </fieldset>

            <fieldset v-if="currentPage === 3" class="text-center">
                <div class="form-group">
                    <label for="favoriteExercises" class="text-black">Favorite Exercises</label>
                    <textarea id="favoriteExercises" class="form-control"
                        placeholder="Enter your favorite exercises"></textarea>
                </div>

                <div class="form-group">
                    <label for="hatedExercises" class="text-black">Hated Exercises</label>
                    <textarea id="hatedExercises" class="form-control" placeholder="Enter your hated exercises"></textarea>
                </div>
                <button @click="nextPage">Next</button>
            </fieldset>

            <fieldset v-if="currentPage === 4" class="text-center">
                <div class="form-group">
                    <label for="shortTermGoals" class="text-black">Short-Term Goals</label>
                    <textarea id="shortTermGoals" class="form-control" placeholder="Enter your short-term goals"></textarea>
                </div>

                <div class="form-group">
                    <label for="longTermGoals" class="text-black">Long-Term Goals</label>
                    <textarea id="longTermGoals" class="form-control" placeholder="Enter your long-term goals"></textarea>
                </div>
                <button @click="nextPage">Next</button>
            </fieldset>
        </form>
    </div>
</template>
  
<script setup>
import { ref } from 'vue';

const currentPage = ref(1);
const totalPages = 4;

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

span {
    margin: 1%;
}

label {
    margin-left: 1%;
}
button{
    background-color: #711bba;
    margin-top: 5%;
}
</style>