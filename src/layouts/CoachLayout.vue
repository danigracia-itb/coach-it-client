<template>
    <div class="vh-100 overflow-hidden">
        <header>
            <img
                width="200"
                class="mx-auto"
                src="../assets/logo.png"
                alt="logo"
            />
        </header>
        <div class="row h-100">
            <CoachMenu></CoachMenu>
            <div class="col-10">
                <RouterView />
            </div>
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
}
</style>
