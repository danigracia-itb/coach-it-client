<template>
    <div class="p-3 mb-2 bg-primary text-white full-screen d-flex justify-content-center align-items-center">
        <div class="border rounded p-5 bg-white text-center">
            <img class="auth-logo-img mx-auto" src="../../assets/logo.png" alt="">
            <form class="text-center">
                <div class="form-group mt-5">
                    <label for="age" class="fw-bold text-black">Hou old are you?</label>
                    <input type="age" id="age" class="form-control" placeholder="Introduce your age">
                </div>

                <div class="form-group mt-5">
                    <label for="weight" class="fw-bold text-black">Introduce your weight</label>
                    <input type="weight" id="weight" class="form-control" placeholder="Introduce your weight">
                </div>

                <div class="form-group mt-5">
                    <label for="height" class="fw-bold text-black">What's your height?</label>
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
</style>