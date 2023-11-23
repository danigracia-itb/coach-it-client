<template>
    <header>
        <section class="bg-dark d-flex">
            <a class="social" href="#">
                <img
                    class="social-net svg-container"
                    src="/src/assets/img/instagram.svg"
                />
            </a>
            <a class="social" href="#">
                <img class="social-net" src="/src/assets/img/facebook.svg" />
            </a>
            <a class="social" href="#">
                <img class="social-net" src="/src/assets/img/twitterX.svg" />
            </a>
        </section>

        <section
            class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm"
        >
            <RouterLink to="/"
                ><img width="300" src="../../assets/logo.png"
            /></RouterLink>
            <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
                <div class="container-fluid">
                    <button
                        class="navbar-toggler"
                        type="button"
                        @click="toggleNav"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        :aria-expanded="isNavOpen ? 'true' : 'false'"
                        aria-label="Toggle navigation"
                        style="font-size: 4rem"
                    >
                        >
                        <span class="navbar-toggler-icon"></span>
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
                                <a class="nav-link home fw-bold" href="#"
                                    >Home</a
                                >
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#">About us</a>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/login"
                                    ><a class="nav-link" href="#"
                                        >Login</a
                                    ></RouterLink
                                >
                            </li>
                        </ul>
                    </div>
                    <RouterLink to="/register"
                        ><button class="btn start-today-btn btn btn-primary">
                            Start Today
                        </button></RouterLink
                    >
                </div>
            </nav>
        </section>
    </header>

    <section class="hero">
        <div
            class="hero-overlay d-flex flex-column gap-5 justify-content-center align-items-center"
        >
            <h1 class="text-center text-white text-uppercase">
                Start your journey as an
                <br />
                <span class="text-primary">strength coach</span>
            </h1>
            <div>
                <a
                    href="#"
                    class="free-trial-btn btn btn-primary text-uppercase btn-xl"
                    >Start now</a
                >
            </div>

            <img
                width="800"
                src="../../assets/img/calendar.png"
                alt="Calendar"
                class="calendar-img"
            />
        </div>
    </section>
    <section class="index-1 bg-dark pt-5">
        <div class="container">
            <h2 class="text-center text-white fw-bold">
                THE BEST TOOL FOR PERSONAL TRAINERS
            </h2>
            <div class="row gx-5">
                <div
                    class="col-md-6 d-flex justify-content-end align-items-center mb-5 mb-md-0"
                >
                    <div class="image-container">
                        <img
                            src="../../assets/img/powerlifting1.jpg"
                            alt="Powerlifting"
                            class="rounded"
                        />
                    </div>
                </div>
                <div
                    class="col-md-6 text-white d-flex flex-column justify-content-center"
                >
                    <h3 class="text-uppercase">Powerlifting Specific Tools</h3>
                    <p class="fs-2">
                        RPE Calculators, E1RM, Stress Index, Volumne, RPE... All
                        things you need for an efective program planning.
                    </p>
                </div>
            </div>

            <div class="row gx-5 mb-5">
                <div
                    class="col-md-6 text-white d-flex flex-column justify-content-center mb-5 mb-md-0"
                >
                    <h3 class="text-uppercase">Performance Tracking</h3>
                    <p class="fs-2">
                        Follow your athletes' journeys and analyze their ups and
                        downs in terms of performance.
                    </p>
                </div>
                <div
                    class="col-md-6 d-flex justify-content-end align-items-center"
                >
                    <div class="image-container">
                        <img
                            src="../../assets/img/graph.jpg"
                            alt="Powerlifting"
                            class="rounded"
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>

    <footer class="bg-light p-3">
        <p class="text-center m-0">
            All rights reserved &copy; - Coach IT 2023
        </p>
    </footer>
</template>

<script>
import { RouterLink } from "vue-router";

export default {
    data() {
        return {
            isNavOpen: false,
        };
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
    },
    components: { RouterLink },
};
</script>

<style scoped>
.bg-dark {
    background-color: #000; /* Puedes ajustar el color de fondo según tus preferencias */
    padding: 15px; /* Ajusta el padding según tus preferencias */
}

.d-flex {
    display: flex; /* Hace que el contenedor sea flexible */
    justify-content: flex-end; /* Alinea los elementos a la derecha */
}

.social {
    margin-left: 15px;
    transition: color 0.3s ease; /* Transición de color al hacer hover */
}

.social:hover {
    color: #9329f4; /* Cambia el color al pasar el ratón sobre el elemento */
}

.social-net {
    width: 30px;
    height: auto;
    fill: #ffffff; /* Establece el color inicial */
    transition: fill 0.3s ease; /* Transición de color al hacer hover */
}

.social-net:hover {
    fill: #9329f4; /* Cambia el color al pasar el ratón sobre el SVG */
}

.social-net:hover {
    filter: brightness(
        1.2
    ); /* Ajusta el brillo para cambiar el color al pasar el ratón sobre el elemento */
}

.hero {
    background-image: url("../../assets/img/hero-img.jpeg");
    height: 75rem;
    background-size: cover;
    background-position: center;
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
    text-decoration: none; /* Elimina el subrayado por defecto */
    padding: 5px; /* Añade espacio alrededor del enlace */
    display: inline-block; /* Hace que el padding se aplique alrededor del texto */
    position: relative;
}

.nav-link::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px; /* Grosor del subrayado */
    bottom: 0;
    left: 0;
    background-color: transparent; /* Color del subrayado inicial */
    transition: background-color 0.3s ease; /* Transición de color al hacer hover */
}

.nav-link:hover::after {
    background-color: #9329f4; /* Cambia el color del subrayado al hacer hover */
}

.home {
    pointer-events: none;
}
.start-today-btn {
    color: #9329f4;
    border: none;
    color: #fff;
    font-size: 20px;
    width: 150px;
    height: 50px;
    border-radius: 10px; /* Ajusta el valor de border-radius en píxeles o em */
}

.start-today-btn:active {
    transform: scale(0.95);
    color: #fff;
}

@media (min-width: 768px) {
    .hero {
        height: 82rem;
    }
}

.hero-overlay {
    height: 100%;
    padding: 22rem 10% 0 10%;
    background-color: rgba(0, 0, 0, 0.75);
}

@media (min-width: 768px) {
    .hero-overlay {
        padding: 8rem 10% 0 10%;
    }
}

.hero-overlay h1 {
    font-size: 5rem;
    font-weight: 900;
}

@media (min-width: 768px) {
    .hero-overlay h1 {
        font-size: 7rem;
    }
}

.hero-overlay h1 span {
    font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
    font-size: 120%;
    -webkit-text-stroke: 2px white;
}
.free-trial-btn {
    border: 2px solid white;
}

.calendar-img {
    position: relative;
    top: 100px;
}

.index-1 h2 {
    margin: 8rem 0;
}

.image-container {
    width: 60rem;
    height: 50rem;
    overflow: hidden; /* Para recortar las imágenes que excedan las dimensiones especificadas */
}

.image-container img {
    width: 100%;
    height: auto;
}
</style>
