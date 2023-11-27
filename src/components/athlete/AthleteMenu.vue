<template>
    <div class="menu bg-primary col-2 ml-0 text-center pr-0">
        <RouterLink to="" class="text-white d-flex text-decoration-none">
            <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-regular fa-calendar-days" />
            <p class="mt-4 fs-1">Dashboard</p>
        </RouterLink><br />
        <RouterLink to="" class="text-white d-flex text-decoration-none">
            <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-solid fa-list-check" />
            <p class="mt-4 fs-1">Routines</p>
        </RouterLink><br />
    </div>
</template>

<script setup>
</script>

<style scoped>
.menu {
    height: 100%;
    width: 25rem;
    position: fixed;
    z-index: 1;
    top: 8rem;
    left: 0;
    overflow-x: hidden;
}
</style>
