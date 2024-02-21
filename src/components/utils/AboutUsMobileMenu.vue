<template>
    <div
        class="bg-light px-5 py-2 d-flex flex-column flex-sm-row align-items-center shadow-sm"
    >
        <div>
            <RouterLink to="/">
                <img width="300" src="../../../public/assets/logo.png" />
            </RouterLink>
        </div>
        <div class="d-flex flex-grow-1 justify-content-end">
            <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        @click="toggleNav"
                        aria-controls="navbarNav"
                        :aria-expanded="isNavOpen ? 'true' : 'false'"
                        aria-label="Toggle navigation"
                        :style="{
                            borderBottom: isNavOpen
                                ? 'none'
                                : '1px solid transparent',
                            fontSize: '4rem',
                        }"
                    >
                        <font-awesome-icon
                            size=""
                            icon="fa-solid fa-bars"
                            class="text-secondary"
                        />
                    </button>
                    <div
                        :class="[
                            'collapse',
                            'navbar-collapse',
                            { show: isNavOpen },
                        ]"
                        id="navbarNav"
                    >
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <RouterLink to="/">
                                    <a
                                        class="nav-link"
                                        href="#"
                                        @click="closeNav"
                                        >Home</a
                                    >
                                </RouterLink>
                            </li>
                            <li class="nav-item aboutus fw-bold">
                                <RouterLink to="/aboutus">
                                    <a
                                        class="nav-link"
                                        href="#"
                                        @click="closeNav"
                                        >About us</a
                                    >
                                </RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/login">
                                    <a
                                        class="nav-link"
                                        href="#"
                                        @click="closeNav"
                                        >Login</a
                                    >
                                </RouterLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
        <div>
            <RouterLink to="/register">
                <button class="btn start-today-btn btn btn-primary mb-3">
                    Start Today
                </button>
            </RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const isNavOpen = ref(false);

const toggleNav = () => {
    isNavOpen.value = !isNavOpen.value;
};

const closeNav = () => {
    isNavOpen.value = false;
};
</script>

<style scoped>
body {
    overflow-x: hidden;
}

header {
    position: relative;
    z-index: 1000;
}

.d-flex {
    display: flex;
    justify-content: right;
}

.navbar-custom .navbar-nav .nav-link {
    color: #000000;
    margin-right: 20px;
}

.navbar-nav .nav-link:hover {
    color: #9329f4;
    text-decoration-thickness: 2px;
}

.nav-link {
    text-decoration: none;
    padding: 5px;
    display: inline-block;
    text-decoration: none;
    padding: 5px;
    display: inline-block;
    position: relative;
}

.nav-link::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.nav-link:hover::after {
    background-color: #9329f4;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: transparent;
    transition: background-color 0.3s ease;
}

.nav-link:hover::after {
    background-color: #9329f4;
}

.aboutus {
    pointer-events: none;
}

.start-today-btn {
    color: #9329f4;
    border: none;
    color: #fff;
    font-size: 20px;
    width: 150px;
    height: 50px;
    border-radius: 5px;
}

.start-today-btn:active {
    transform: scale(0.95);
    color: #fff;
}

h3 {
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
}

@keyframes fade {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 1;
    }
}

.fade-image {
    animation: fade 5s infinite;
    animation-delay: 8s;
}

.navbar-toggler {
    border: none;
    background-color: transparent;
    outline: none;
}

@media (max-width: 576px) {
    .d-flex {
        justify-content: center;
    }
    .navbar-custom .navbar-collapse {
        justify-content: center;
    }
}
</style>
src/components/utils/HomeMobileMenu.vue
