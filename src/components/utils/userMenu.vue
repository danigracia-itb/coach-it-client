<template>
    <div>
        <RouterLink to="/coach/profile" class="text-center border-bottom bg-primary">
            <p class="mt-4 fs-1"><font-awesome-icon icon="fa-solid fa-user-pen" /> EDIT PROFILE</p>
        </RouterLink>
        <button @click="logOut()">LOG OUT</button>
    </div>
</template>

<script setup>
</script>