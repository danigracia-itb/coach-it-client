<template>
    <div class="text-center bg-light">
        <RouterLink to="/coach/profile" class="text-center border-bottom bg-primary">
            <p class="mt-4 fs-1"><font-awesome-icon icon="fa-solid fa-user-pen" /> EDIT PROFILE</p>
        </RouterLink>
        <button class="bg-danger text-white m-3 mb-4 border-0 p-3" @click="logOut(router)">LOG OUT</button>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import {logOut} from "../../functions/helpers"

const router = useRouter()
</script>