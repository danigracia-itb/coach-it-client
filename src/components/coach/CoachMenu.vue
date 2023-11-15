<template>
    <div class="col-3 vh-100 ml-0 text-center pr-0">
        <div>

        </div>
        <img width="250" class="mx-auto" src="../../assets/logo.png" alt="logo">
        <div class="bg-primary w-100 h-100">
            <RouterLink to="/" class="text-white d-flex text-style">
                <img height="40" class="m-3" src="../../assets/img/calendar.svg" alt="">
                <p class="mt-5">Dashboard</p>
                <font-awesome-icon size icon="fa-regular fa-calendar-days" />
            </RouterLink><br>
            <RouterLink to="/" class="text-white">Routines</RouterLink><br>
            <font-awesome-icon icon="fa-solid fa-user-secret" />
            <font-awesome-icon icon="fa-solid fa-calendar-days" />
            <font-awesome-icon icon="fa-regular fa-house" />            <RouterLink to="/" class="text-white">Exercices</RouterLink><br>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.text-style {
    text-decoration: none;
}
</style>