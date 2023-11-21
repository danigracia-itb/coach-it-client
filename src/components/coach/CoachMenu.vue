<template>
        <div class="bg-primary col-2 ml-0 text-center pr-0">
            <RouterLink to="/coach" class="text-white d-flex text-style">
                <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-regular fa-calendar-days" />
                <p class="mt-4 fs-1">Dashboard</p>
            </RouterLink><br>
            <RouterLink to="/" class="text-white d-flex text-style">
                <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-solid fa-list-check" />
                <p class="mt-4 fs-1">Routines</p>
            </RouterLink><br>
            <RouterLink to="/" class="text-white d-flex text-style">
                <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-solid fa-dumbbell" />
                <p class="mt-4 fs-1">Exercises</p>
            </RouterLink><br>
        </div>
</template>

<script setup>

</script>

<style scoped>
.text-style {
    text-decoration: none;
}
</style>