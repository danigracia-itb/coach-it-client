<template>
    <div class="vh-100">
        <header>
            <img
                width="200"
                class="mx-auto"
                src="../assets/logo.png"
                alt="logo"
            />
        </header>
        <div class="h-100">
            <CoachMenu></CoachMenu>
            <main class="main-content">
                <RouterView />
            </main>
        </div>
    </div>
</template>

<script setup>
import { RouterView } from "vue-router";
import CoachMenu from "../components/coach/CoachMenu.vue";
</script>

<style scoped>
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
    margin-left: 25rem;
    margin-top: 8rem;
    padding-top: .5rem;
}
</style>
