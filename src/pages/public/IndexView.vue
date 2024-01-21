<template>
    <header>
        <div class="bg-dark d-flex">
            <a class="social" href="https://www.instagram.com">
                <img class="social-net svg-container" src="../../../public/assets/img/instagram.svg" />
            </a>
            <a class="social" href="https://www.facebook.com">
                <img class="social-net" src="../../../public/assets/img/facebook.svg" />
            </a>
            <a class="social" href="https://www.twitter.com">
                <img class="social-net" src="../../../public/assets/img/twitterX.svg" />
            </a>
        </div>

        <div class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm">
            <RouterLink to="/"><img width="300" src="../../../public/assets/logo.png" /></RouterLink>
            <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" @click="toggleNav" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" :aria-expanded="isNavOpen ? 'true' : 'false'"
                        aria-label="Toggle navigation" style="font-size: 4rem">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div :class="[
                        'collapse',
                        'navbar-collapse',
                        { show: isNavOpen },
                    ]" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <a class="nav-link home fw-bold" href="#">Home</a>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/aboutus"><a class="nav-link" href="#">About us</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <RouterLink to="/login"><a class="nav-link" href="#">Login</a></RouterLink>
                            </li>
                        </ul>
                    </div>
                    <RouterLink to="/register"><button class="btn start-today-btn btn btn-primary">
                            Start Today
                        </button></RouterLink>
                </div>
            </nav>
        </div>
    </header>

    <section class="hero">
        <div class="hero-overlay d-flex flex-column justify-content-center align-items-center">
            <h1 class="journey text-center text-white text-uppercase">
                Start your journey as an
                <br />
                <img src="../../../public/assets/img/Strength.png" class="mb-2 fade-image" alt="strength coach"
                    style="max-width: 100%;" />
            </h1>
            <div>
                <RouterLink to="/register">
                    <button class="free-trial-btn btn btn-primary text-uppercase btn-xl m-5">
                        Start now
                    </button>
                </RouterLink>
            </div>
            <div class="motivational-text container py-5">
                <p class="text-justify">
                    Are you ready to transform your passion for fitness into a
                    fulfilling and rewarding career? Welcome to a revolutionary
                    web app designed for aspiring strength coaches like you!
                </p>

                <h3 class="mt-4">Embark on your coaching pathway:</h3>

                <p class="text-justify">
                    The path to becoming a force in the world of strength
                    coaching starts here. Our web app is not just a platform;
                    it's a gateway to your dreams. Imagine guiding individuals
                    on their transformative fitness journey, witnessing their
                    strength soar, and celebrating their victories. It's time to
                    turn your passion into purpose!
                </p>
            </div>
            <img src="../../../public/assets/img/calendar2.png" alt="Calendar Image" class="calendar-img" />
        </div>
    </section>

    <section class="info-ci bg-dark py-5">
        <div class="container">
            <h2 class="text-center text-white fw-bold mb-4">
                THE BEST TOOL FOR PERSONAL TRAINERS
            </h2>
            <h3 class="text-center text-white fw-bold">Why Join Us?</h3>
            <div class="motivational-text container py-5">
                <p class="mb-5 text-justify">
                    <img class="social-net" src="../../../public/assets/img/tools.svg" />

                    <strong>Comprehensive Tools:</strong> Access cutting-edge
                    tools tailored for powerlifting coaching—RPE calculators,
                    E1RM assessments, Stress index metrics, and more - all at
                    your fingertips. Craft effective training programs with
                    ease.
                </p>

                <p class="mb-5 text-justify">
                    <img class="social-net" src="../../../public/assets/img/track.svg" />
                    <strong> Be the Performance Tracking:</strong>
                    architect of success! Follow your clients' journeys, analyze
                    their progress, and elevate their performance to new
                    heights. The satisfaction of helping others achieve their
                    goals awaits.
                </p>

                <p class="mb-5 text-justify">
                    <img class="social-net" src=" ../../../public/assets/img/ux.svg" /><strong> Intuitive
                        Interface:</strong> A
                    user-friendly
                    interface ensures a seamless experience. No tech hurdles,
                    just a straightforward platform for you to focus on what you
                    do best: coaching.
                </p>

                <p class="mb-5 text-justify">
                    <strong><img class="social-net" src="../../../public/assets/img/global.svg" />
                        Global Reach:</strong>
                    Connect with clients worldwide. Whether you're just starting
                    or looking to expand your reach, our platform empowers you
                    to make a global impact.
                </p>
            </div>
            <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="m-5">
                    <img src="../../../public/assets/img/powerlifting2.jpg" alt="Powerlifting Image" class="calendar-img" />
                </div>
            </div>

            <div class="d-flex flex-column justify-content-center align-items-center">
                <div class="row gx-5 ">
                    <h3 class="text-center text-white fw-bold pb-4">
                        Athlete Dashboard example
                    </h3>
                </div>
                <img src="../../../public/assets/img/calendar2.png" alt="Calendar Image" class="calendar-img" />
            </div>

            <div class="row gx-5">
                <div class="row gx-5">
                    <h3 class="text-center text-white fw-bold pb-4 mt-5 mb-2">
                        Perform Tracking
                    </h3>
                    <div class="perform-tracking-container">
                    </div>
                </div>
                <div class="col-md-6 text-white d-flex flex-column justify-content-center"></div>
            </div>
            <img src="../../../public/assets/img/tracking.jpg" alt="Tracking Image" class="calendar-img" />
        </div>
    </section>

    <Footer />

    <CookieBanner :cookies-accepted="cookiesAccepted" @accept-cookies="acceptCookies" @decline-cookies="declineCookies" />
</template>

<script>
import { RouterLink } from "vue-router";
import CookieBanner from "../../components/CookieBanner.vue";
import Footer from './Footer.vue'

export default {
    data() {
        return {
            isNavOpen: false,
            currentImageIndex: 0,
            images: [
                {
                    src: "../../../public/assets/img/DashboardCoach.png",
                    alt: "Dashboard",
                },
                {
                    src: "../../../public/assets/img/DashboardAthlete.png",
                    alt: "Dashboard",
                },
            ],
            currentImageIndex: 0,
            images: [
                {
                    src: "../../../public/assets/img/DashboardAthlete.png",
                    alt: "Calendar",
                },
                {
                    src: "../../../public/assets/img/DashboardCoach.png",
                    alt: "Dashboard",
                },
            ],
            cookiesAccepted: false,
        };
    },
    mounted() {
        this.startImageTimer();
    },
    methods: {
        toggleNav() {
            this.isNavOpen = !this.isNavOpen;
        },
        startImageTimer() {
            setInterval(() => {
                this.nextImage();
            }, 5000);
        },
        nextImage() {
            this.currentImageIndex =
                (this.currentImageIndex + 1) % this.images.length;
        },
        acceptCookies() {
            //this.cookiesAccepted = true;
            // Realizar acciones?
        },
        declineCookies() {
            //this.cookiesAccepted = false;
            //Realizar acciones?
        },
    },
    computed: {
        currentImage() {
            return this.images[this.currentImageIndex];
        },
    },
    components: {
        RouterLink,
        CookieBanner,
        Footer,
    },
};
</script>

<style scoped>
header {
    position: relative;
    z-index: 1000;
}

.d-flex {
    display: flex;
    justify-content: flex-end;
}

svg {
    color: #ffffff;
}

.bg-dark {
    background-color: #000;
    padding: 15px;
}

.social {
    margin-left: 15px;
    transition: color 0.3s ease;
}

.social:hover {
    color: #9329f4;
}

.social-net {
    width: 30px;
    height: auto;
    fill: #ffffff;
    transition: fill 0.3s ease;
}

.social-net:hover {
    fill: #9329f4;
}

.social-net:hover {
    filter: brightness(1.2);
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
    border-radius: 10px;
}

.start-today-btn:active {
    transform: scale(0.95);
    color: #fff;
}

.hero {
    background-image: url('../../../public/assets/img/hero-img2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    height: 100vh;
    position: relative;
}

.hero-overlay h1 {
    font-size: 5rem;
    font-weight: 900;
    color: #fff;
    /* Añadido color al texto para mejorar la legibilidad */
}

.journey {
    margin-top: 5rem;
}

.motivational-text {
    text-align: center;
    padding: 3rem;
    position: relative;
    /* Agregado para establecer un contexto de apilamiento */
    z-index: 2;
    /* Ajustado el valor del z-index */
}

.motivational-text p {
    color: #fff;
    font-size: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.motivational-text h3 {
    color: #ffffff;
    margin-top: 1.5rem;
}

.hero-overlay h1 span {
    font-size: 120%;
    -webkit-text-stroke: 2px white;
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

@keyframes grow {
    0% {
        transform: scale(1);
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
    }
}

.free-trial-btn {
    animation: grow 2s infinite;
    border: 2px solid white;
    border-radius: 10px;
}

.motivational-text {
    text-align: center;
    padding: 3rem;
}

.motivational-text p {
    color: #fff;
    font-size: 2rem;
    max-width: 1200px;
    margin: 0 auto;
}

.motivational-text h3 {
    color: #ffffff;
    margin-top: 1.5rem;
}

.calendar-img {
    max-width: 100%;
    height: auto;
    margin-top: 10px;
    margin: 10px;
}

.info-ci h2 {
    margin: 5rem 0;
}

.image-container {
    width: 60rem;
    height: 50rem;
    overflow: hidden;
}

.perform-tracking-container {
    position: relative;
}

.image-container img {
    max-width: 100%;
    height: auto;
}
</style>
