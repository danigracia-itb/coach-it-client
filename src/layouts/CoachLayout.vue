<template>
    <div class="vh-100">
        <header class="d-flex justify-content-between overflow-hidden">
            <!-- PC -->
            <img width="200" src="../../public/assets/logo.png" alt="logo" />

            <UserMenu></UserMenu>

            <!-- MOVIL -->
            <button class="d-md-none button-mobile" @click="toggleMenu">
                <img src="../assets/img/mobile-menu.png" width="20" alt="">
            </button>
            <div v-if="showMenu" class="text-center border-bottom bg-primary">
                <RouterLink to="/coach" class="d-flex text-decoration-none text-white">
                    <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-regular fa-calendar-days" />
                    <p class="mt-4 fs-1">Dashboard</p>
                </RouterLink><br />
                <!-- <RouterLink to="/" class="d-flex text-decoration-none text-white">
                    <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-solid fa-list-check" />
                    <p class="mt-4 fs-1">Routines</p>
                </RouterLink><br /> -->
                <RouterLink to="/coach/exercises" class="d-flex text-decoration-none text-white">
                    <font-awesome-icon class="w-25 mt-1 p-3" size="2xl" icon="fa-solid fa-dumbbell" />
                    <p class="mt-4 fs-1">Exercises</p>
                </RouterLink><br />
            </div>
        </header>

        <div class="h-100">
            <CoachMenu  class="d-none d-md-block"></CoachMenu>
            <main class="main-content px-3 px-md-0">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import CoachMenu from "../components/coach/CoachMenu.vue";
import { ref } from "vue";
import UserMenu from "../components/utils/UserMenu.vue";


let showMenu = ref(false)
function toggleMenu() {
    showMenu.value = !showMenu.value
    console.log(showMenu.value)
}

</script>

<style scoped>

.button-mobile {
    border: none;
    background-color: transparent;
    outline: none;
    margin-left: 120px;
}

header {
    background-color: rgb(230, 230, 230);
}


@media (min-width: 768px) {
    header {
        height: 8rem;
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
    }

    .main-content {
        margin-left: 30rem;
        margin-right: 5rem;
        margin-top: 8rem;
        padding: .5rem 4rem 4rem 4rem;
    }
}
</style>
