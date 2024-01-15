<template>
    <header>
        <section class="bg-dark d-flex">
            <a class="social" href="https://www.instagram.com">
                <img
                    class="social-net svg-container"
                    src="../../../public/assets/img/instagram.svg"
                />
            </a>
            <a class="social" href="https://www.facebook.com">
                <img class="social-net" src="../../../public/assets/img/facebook.svg" />
            </a>
            <a class="social" href="https://www.twitter.com">
                <img class="social-net" src="../../../public/assets/img/twitterX.svg" />
            </a>
        </section>

        <section
            class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm"
        >
            <RouterLink to="/"
                ><img width="300" src="../../../public/assets/logo.png"
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
                                <RouterLink to="/">
                                    <a class="nav-link" href="#"
                                        >Home</a
                                    ></RouterLink
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

    <div class="container-pp mb-5">
        <section class="privacy-section">
            <h2 class="text-center mt-5 mb-5 primary">Privacy Policy</h2>
            <img
                class="center-image mb-5"
                src="../../../public/assets/img/privacy-policy.jpg"
            />
            <div class="privacy-content">
                <p>
                    Welcome to Coach It, the premier online coaching platform
                    for strength sports!
                </p>

                <p><b>1. Information We Collect</b></p>
                <p>
                    We may collect personal information such as your name, email
                    address, and other relevant details when you register for an
                    account.
                </p>

                <p><b>2. How We Use Your Information</b></p>
                <p>
                    Your information is used to provide and improve our
                    services. We may also use it to communicate with you and
                    personalize your experience on Coach It.
                </p>

                <p><b>3. Information Sharing</b></p>
                <p>
                    We do not share your personal information with third parties
                    without your consent, except as required by law.
                </p>

                <p><b>4. Security</b></p>
                <p>
                    We prioritize the security of your information and take
                    reasonable precautions to protect it.
                </p>

                <p><b>5. Cookies</b></p>
                <p>
                    Coach It may use cookies to enhance your experience. You can
                    adjust your browser settings to disable cookies if you
                    prefer.
                </p>

                <p><b>6. Changes to Privacy Policy</b></p>
                <p>
                    We may update our Privacy Policy from time to time. Any
                    changes will be reflected on this page.
                </p>

                <p><b>7. Contact Us</b></p>
                <p>
                    If you have any questions or concerns about our Privacy
                    Policy, please contact us at
                    <a href="mailto:privacy@coach.it">privacy@coach.it</a>.
                </p>

                <p>
                    Thank you for choosing Coach It as your online strength
                    sports coaching platform!
                </p>
            </div>
        </section>
    </div>

    <Footer />
</template>

<script>
import { RouterLink } from "vue-router";
import Footer from "./Footer.vue";

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
    components: {
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

.container-pp {
    max-width: 75%; /* Máximo ancho de la columna */
    margin: 0 auto; /* Centrar el contenedor en la página */
    padding: 0 20px; /* Añadir relleno opcional */
}

/* Estilos para centrar la imagen */
.center-image {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    height: auto;
}

.privacy-content {
    text-align: justify; /* Alinear el texto justificado */
}
</style>
