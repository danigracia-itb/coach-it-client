<template>
    <div class="mt-5">
        <h1 class="text-center">Hello <span class="text-primary">{{ authStore.name }}</span></h1>
    </div>
</template>

<script setup>
//Stores
import useAuthStore from "../../stores/useAuthStore";


const authStore = useAuthStore();
</script>