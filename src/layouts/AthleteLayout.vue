<template>
    <div class="vh-100">
        <header class="d-flex justify-content-between overflow-hidden px-md-5 w-vw">
            <img width="200" src="../../public/assets/logo.png" alt="logo" />
            <UserMenu class="d-none d-md-block" :athlete="true"></UserMenu>
        </header>
        <div class="h-100">
            <main class="main-content px-3 px-md-0">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import UserMenu from "../components/utils/UserMenu.vue";
</script>

<style scoped>
@media (min-width: 768px) {
    header {
        background-color: #dbdee2;
        height: 8rem;
        width: 100%;
        position: fixed;
        z-index: 1;
        top: 0;
        left: 0;
        overflow-x: hidden;
    }

    .main-content {
        max-width: 90%;
        margin: 8rem auto 0 auto;
        padding: 4rem;
    }
}
</style>
