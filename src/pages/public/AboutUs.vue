<template>
    <header>
        <section class="bg-dark d-flex">
            <a class="social" href="https://www.instagram.com">
                <img class="social-net svg-container" src="/src/assets/img/instagram.svg" />
            </a>
            <a class="social" href="https://www.facebook.com">
                <img class="social-net" src="/src/assets/img/facebook.svg" />
            </a>
            <a class="social" href="https://www.twitter.com">
                <img class="social-net" src="/src/assets/img/twitterX.svg" />
            </a>
        </section>

        <section
            class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm">
            <RouterLink to="/"><img width="300" src="../../assets/logo.png" /></RouterLink>
            <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" @click="toggleNav" data-bs-toggle="collapse"
                        data-bs-target="#navbarNav" aria-controls="navbarNav" :aria-expanded="isNavOpen ? 'true' : 'false'"
                        aria-label="Toggle navigation" style="font-size: 4rem">
                        >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div :class="[
                        'collapse',
                        'navbar-collapse',
                        { show: isNavOpen },
                    ]" id="navbarNav">
                        <ul class="navbar-nav ms-auto">
                            <li class="nav-item">
                                <RouterLink to="/"><a class="nav-link" href="#">Home</a></RouterLink>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link aboutus fw-bold" href="#">About us</a>
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
        </section>
    </header>

    <section class="bg-light p-5 about-us-container">
        <div class="container">
            <h2 class="text-center mb-5 primary">About Us</h2>

            <div class="row">
                <div class="col-md-6">
                    <img src="/src/assets/img/company-image.jpg" alt="Company Image" class="img-fluid mb-4" />
                </div>
                <div class="col-md-6">
                    <p>
                        Welcome to Coach IT, your gateway to a transformative fitness coaching experience. We are
                        dedicated to
                        empowering aspiring strength coaches like you to turn their passion for fitness into a rewarding
                        career.
                    </p>
                    <p>
                        Our mission is to provide comprehensive tools and a user-friendly platform that enables coaches
                        to create
                        effective training programs, track client progress, and make a global impact.
                    </p>
                </div>
            </div>

            <div class="row mt-5">
                <div class="col-md-6 order-md-2">
                    <img src="/src/assets/img/team-image.jpg" alt="Team Image" class="img-fluid mb-4" />
                </div>
                <div class="col-md-6 order-md-1">
                    <p>
                        At Coach IT, we have a dedicated team of fitness enthusiasts, developers, and professionals
                        committed to
                        supporting your coaching journey. Whether you're just starting or looking to expand your reach,
                        we're here
                        to help you achieve your goals.
                    </p>
                    <p>
                        Join us on this exciting adventure and be a part of the future of strength coaching.
                    </p>
                </div>
            </div>
        </div>
    </section>

    <section class="bg-light p-5 contact-container">
        <div class="container">
            <h2 class="text-center mb-5">Contact Us</h2>

            <div class="row justify-content-center">
                <form @submit.prevent="submitForm" class="col-md-8">
                    <div class="mb-3">
                        <label for="inputEmail" class="form-label">Email</label>
                        <input v-model="email" type="email" class="form-control" id="inputEmail" placeholder="Your email"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="inputSubject" class="form-label">Subject</label>
                        <input v-model="subject" type="text" class="form-control" id="inputSubject" placeholder="Subject"
                            required>
                    </div>
                    <div class="mb-3">
                        <label for="inputMessage" class="form-label">Message</label>
                        <textarea v-model="message" class="form-control" id="inputMessage" rows="10"
                            placeholder="Your message" style="font-size: 16px;" required></textarea>
                    </div>
                    <div class="mb-3 text-center">
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'Contact',
    data() {
        return {
            email: '',
            subject: '',
            message: '',
        };
    },
    methods: {
        submitForm() {
            console.log('Email:', this.email);
            console.log('Subject:', this.subject);
            console.log('Message:', this.message);
        },
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
    border-radius: 10px;
}

.start-today-btn:active {
    transform: scale(0.95);
    color: #fff;
}

.about-us-container {
    padding-top: 80px;
    padding-bottom: 80px;
}

.img-fluid {
    max-width: 100%;
    height: auto;
}

.contact-container {
    padding-top: 80px;
    padding-bottom: 80px;
}

.form-label {
    font-weight: bold;
}

.btn-primary {
    background-color: #9329f4;
    border: none;
}

.btn-primary:hover {
    background-color: #6c1c9c;
}
</style>