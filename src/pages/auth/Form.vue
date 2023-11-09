<template>
    <div class="p-3 mb-2 bg-form text-white full-screen d-flex justify-content-center align-items-center">
        <div class="p-5 px-5 border rounded-5 bg-white text-center">
            <img class="auth-logo-img mx-auto" src="../../assets/logo.png" alt="">
            <form class="text-center">
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
            </form>


            <form class="text-center">
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
                    <input type="checkbox" id="monday" name="day" value="Monday">
                    <label for="monday">Mon</label><br>
                    <input type="checkbox" id="tuesday" name="day" value="Tuesday">
                    <label for="tuesday">Tuesday</label><br>
                    <input type="checkbox" id="wednesday" name="day" value="Wednesday">
                    <label for="wednesday">Wednesday</label><br>
                    <input type="checkbox" id="thursday" name="day" value="Thursday">
                    <label for="thursday">Thursday</label><br>
                    <input type="checkbox" id="friday" name="day" value="Friday">
                    <label for="friday">Friday</label><br>
                    <input type="checkbox" id="saturday" name="day" value="Saturday">
                    <label for="saturday">Saturday</label><br>
                    <input type="checkbox" id="sunday" name="day" value="Sunday">
                    <label for="sunday">Sunday</label><br>
                </div>

            </form>

            <form class="text-center">
                <div class="form-group mt-5">
                    <label for="age" class="text-black">How old are you?</label>
                    <input type="age" id="age" class="form-control" placeholder="Introduce your age">
                </div>

                <div class="form-group mt-5">
                    <label for="weight" class="text-black">Introduce your weight</label>
                    <input type="weight" id="weight" class="form-control" placeholder="Introduce your weight">
                </div>

                <div class="form-group mt-5">
                    <label for="height" class="text-black">What's your height?</label>
                    <input type="height" id="height" class="form-control" placeholder="Introduce your height">
                </div>
            </form>

            <form class="text-center">
                <div class="form-group mt-5">
                    <label for="age" class="text-black">How old are you?</label>
                    <input type="age" id="age" class="form-control" placeholder="Introduce your age">
                </div>

                <div class="form-group mt-5">
                    <label for="weight" class="text-black">Introduce your weight</label>
                    <input type="weight" id="weight" class="form-control" placeholder="Introduce your weight">
                </div>

                <div class="form-group mt-5">
                    <label for="height" class="text-black">What's your height?</label>
                    <input type="height" id="height" class="form-control" placeholder="Introduce your height">
                </div>
            </form>
        </div>
    </div>
</template>
  

<script setup>

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
</style>