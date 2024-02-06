<template>
    <div v-if="showMenu" id="myNav" class="overlay">
        <a href="javascript:void(0)" class="closebtn" @click="toggleMenu"
            >&times;</a
        >
        <div class="overlay-content">
            <RouterLink to="/coach" @click="handleClick">Dashboard</RouterLink>
            <RouterLink to="/coach/exercises" @click="handleClick"
                >Exercises</RouterLink
            >
            <RouterLink to="/coach/manage" @click="handleClick"
                >Manage</RouterLink
            >
            <hr class="bg-white border-5 border-top border-white" />
            <RouterLink to="/coach/profile" @click="handleClick"
                >Edit profile</RouterLink
            >
            <RouterLink
                to="/coach/exercises"
                @click="() => {logOut(); handleClick();}"
                class="text-danger fw-bold d-flex gap-3 justify-content-center align-items-center"
            >
                <font-awesome-icon icon="fa-solid fa-right-from-bracket" />
                <span>Log out</span>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { logOut } from '../../functions/helpers';

const { showMenu, toggleMenu } = defineProps(["showMenu", "toggleMenu"]);

function handleClick() {
    toggleMenu()
}
</script>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
}

.overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
}

.overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;
}

.overlay a:hover,
.overlay a:focus {
    color: #f1f1f1;
}

.overlay .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
}

@media screen and (max-height: 450px) {
    .overlay a {
        font-size: 20px;
    }
    .overlay .closebtn {
        font-size: 40px;
        top: 15px;
        right: 35px;
    }
}
</style>
