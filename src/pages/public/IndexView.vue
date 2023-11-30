<template>
    <header>
        <section class="bg-dark d-flex">
            <a class="social" href="https://www.instagram.com">
                <img
                    class="social-net svg-container"
                    src="/src/assets/img/instagram.svg"
                />
            </a>
            <a class="social" href="https://www.facebook.com">
                <img class="social-net" src="/src/assets/img/facebook.svg" />
            </a>
            <a class="social" href="https://www.twitter.com">
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
                                <RouterLink to="/aboutus"
                                    ><a class="nav-link" href="#"
                                        >About us</a
                                    ></RouterLink
                                >
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
            class="hero-overlay d-flex flex-column justify-content-center align-items-center"
        >
            <h1 class="journey text-center text-white text-uppercase">
                Start your journey as an
                <br />
                <img
                    src="../../assets/img/Strength.png"
                    width="1300"
                    class="mb-2 fade-image"
                    alt="strenght coach mt-5"
                />
            </h1>
            <div>
                <RouterLink to="/register">
                    <button
                        class="free-trial-btn btn btn-primary text-uppercase btn-xl m5-5"
                    >
                        Start now
                    </button>
                </RouterLink>
            </div>
            <div class="motivational-text container py-5">
                <p class="justified-text">
                    Are you ready to transform your passion for fitness into a
                    fulfilling and rewarding career? Welcome to a revolutionary
                    web app designed for aspiring strength coaches like you!
                </p>

                <h3 class="mt-4">Embark on your coaching pathway:</h3>

                <p class="justified-text">
                    The path to becoming a force in the world of strength
                    coaching starts here. Our web app is not just a platform;
                    it's a gateway to your dreams. Imagine guiding individuals
                    on their transformative fitness journey, witnessing their
                    strength soar, and celebrating their victories. It's time to
                    turn your passion into purpose!
                </p>
            </div>
        </div>
    </section>

    <img :src="currentImage.src" :alt="currentImage.alt" class="calendar-img" />

    <section class="info-ci bg-dark py-5">
        <div class="container">
            <h2 class="text-center text-white fw-bold mb-4">
                THE BEST TOOL FOR PERSONAL TRAINERS
            </h2>
            <h3 class="text-center text-white fw-bold">Why Join Us?</h3>
            <div class="motivational-text container py-5">
                <p class="mb-5 justified-text">
                    <img class="social-net" src="/src/assets/img/tools.svg" />

                    <strong>Comprehensive Tools:</strong> Access cutting-edge
                    tools tailored for powerlifting coaching—RPE calculators,
                    E1RM assessments, Stress index metrics, and more - all at
                    your fingertips. Craft effective training programs with
                    ease.
                </p>

                <p class="mb-5 justified-text">
                    <img class="social-net" src="/src/assets/img/track.svg" />
                    <strong> Be the Performance Tracking:</strong>
                    architect of success! Follow your clients' journeys, analyze
                    their progress, and elevate their performance to new
                    heights. The satisfaction of helping others achieve their
                    goals awaits.
                </p>

                <p class="mb-5 justified-text">
                    <img
                        class="social-net"
                        src=" /src/assets/img/ux.svg"
                    /><strong> Intuitive Interface:</strong> A user-friendly
                    interface ensures a seamless experience. No tech hurdles,
                    just a straightforward platform for you to focus on what you
                    do best: coaching.
                </p>

                <p class="mb-5 justified-text">
                    <strong
                        ><img
                            class="social-net"
                            src="/src/assets/img/global.svg"
                        />
                        Global Reach:</strong
                    >
                    Connect with clients worldwide. Whether you're just starting
                    or looking to expand your reach, our platform empowers you
                    to make a global impact.
                </p>
            </div>
            <div class="row gx-5">
                <div
                    class="col-md-6 d-flex justify-content-end align-items-center mb-5 mb-md-0"
                >
                    <div class="image-container">
                        <img
                            src="../../assets/img/powerlifting2.jpg"
                            alt="Powerlifting"
                            class="pwl"
                        />
                    </div>
                </div>
                <div
                    class="col-md-6 text-white d-flex flex-column justify-content-center"
                ></div>
            </div>

            <div class="row gx-5">
                <h3 class="text-center text-white fw-bold pb-4">
                    Athlete Dashboard example
                </h3>
                <img
                    :src="currentImage.src"
                    :alt="currentImage.alt"
                    class="calendar-img2 justify-content-end align-items-center"
                />
            </div>

            <div class="row gx-5">
                <h3 class="text-center text-white fw-bold pb-4 mt-5 mb-5">
                    Perform Tracking
                </h3>
                <div
                    class="col-md-6 d-flex justify-content-end align-items-center mb-5 mb-md-0"
                >
                    <div class="image-container">
                        <img
                            src="../../assets/img/tracking.jpg"
                            alt="Tracking"
                            class="ptk"
                        />
                    </div>
                </div>
                <div
                    class="col-md-6 text-white d-flex flex-column justify-content-center"
                ></div>
            </div>
        </div>
    </section>

    <Footer />

    <CookieBanner
        :cookies-accepted="cookiesAccepted"
        @accept-cookies="acceptCookies"
        @decline-cookies="declineCookies"
    />
</template>

<script>
import { RouterLink } from "vue-router";
import CookieBanner from "../../components/CookieBanner.vue";

export default {
    data() {
        return {
            isNavOpen: false,
            currentImageIndex: 0,
            images: [
                {
                    src: "../src/assets/img/DashboardCoach.png",
                    alt: "Dashboard",
                },
                {
                    src: "../src/assets/img/DashboardAthlete.png",
                    alt: "Dashboard",
                },
            ],
            currentImageIndex: 0,
            images: [
                {
                    src: "../src/assets/img/DashboardAthlete.png",
                    alt: "Calendar",
                },
                {
                    src: "../src/assets/img/DashboardCoach.png",
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
.bg-dark {
    background-color: #000;
    padding: 15px;
}

.d-flex {
    display: flex;
    justify-content: flex-end;
}

svg {
    color: #ffffff;
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
    background-image: url("../../assets/img/hero-img.jpeg");
    height: 75rem;
    background-size: cover;
    background-position: center;
    position: relative;
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
    animation-delay: 20s;
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

.justified-text {
    text-align: justify;
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
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    margin-top: 60px;
}

.info-ci h2 {
    margin: 75rem 0;
}

.image-container {
    width: 60rem;
    height: 50rem;
    overflow: hidden;
}

.pwl {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    margin-top: 1440px;
    max-width: 1200px;
}

.ptk {
    display: block;
    margin: 0 auto;
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
    margin-top: 2940px;
    max-width: 1200px;
}

.image-container img {
    width: 100%;
    height: auto;
}
</style>
