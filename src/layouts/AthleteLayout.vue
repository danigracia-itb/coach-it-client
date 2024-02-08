<template>
    <div>
        <div class="page-container">
            <header
                class="d-none d-md-flex justify-content-between overflow-hidden px-md-5 w-vw"
            >
                <img
                    width="200"
                    src="../../public/assets/logo.png"
                    alt="logo"
                />
                <UserMenu class="d-block" :athlete="true"></UserMenu>
            </header>
            <div class="main-content px-3">
                <RouterView />
            </div>
        </div>
        <NavBar />
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import UserMenu from "../components/utils/UserMenu.vue";
import NavBar from "../components/athlete/NavBar.vue";
</script>

<style scoped>
.page-container {
    margin: 2rem 0 8rem 0; /* Espacio para el podbar */
}
</style>
