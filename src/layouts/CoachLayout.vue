<template>
    <div>
        <header class="d-flex justify-content-between overflow-hidden px-md-5 w-vw">
            <!-- PC -->
            <img width="200" src="../../public/assets/logo.png" alt="logo" />

            <UserMenu class="d-none d-md-flex"></UserMenu>

            <!-- MOVIL -->
            <button class="d-block d-md-none btn btn-outline-secondary border-0 px-4 py-0" @click="toggleMenu">
                <font-awesome-icon size="2xl" icon="fa-solid fa-bars" />
            </button>

            <MobileMenu :showMenu="showMenu" :toggleMenu="toggleMenu"></MobileMenu>

        </header>


        <div class="h-100">
            <CoachMenu class="d-none d-md-block"></CoachMenu>
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
import Footer from "../pages/public/Footer.vue";
import MobileMenu from "../components/coach/MobileMenu.vue"

let showMenu = ref(false);
function toggleMenu() {
    showMenu.value = !showMenu.value;
    console.log(showMenu.value);
}
</script>

<style scoped>
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
        padding: 0.5rem 4rem 4rem 4rem;
    }
}
</style>
