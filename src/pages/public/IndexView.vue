<template>
    <header>
        <section class="bg-dark px-5 py-1 gap-3 d-flex justify-content-center justify-content-md-end">
            <a href="#" class="text-white text-decoration-none">Register</a>
            <a href="#" class="text-white text-decoration-none">Login</a>
        </section>
        <section
            class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm"
        >
            <img width="175" src="../../assets/logo.png" />
            <nav
                class="navbar navbar-expand-lg d-flex flex-column align-items-center navbar-light bg-light"
            >
                <button
                    class="navbar-toggler"
                    type="button"
                    @click="toggleNav"
                    :aria-expanded="isNavOpen ? 'true' : 'false'"
                    style="font-size: 2rem"
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
                    <ul class="navbar-nav">
                        <li
                            class="nav-item text-center"
                            style="margin-right: 1rem"
                        >
                            <a class="nav-link active" href="#">Home</a>
                        </li>
                        <li
                            class="nav-item text-center"
                            style="margin-right: 1rem"
                        >
                            <a class="nav-link" href="#">About Us</a>
                        </li>
                        <li class="nav-item text-center">
                            <a class="btn btn-primary text-uppercase" href="#"
                                >Free Trial</a
                            >
                        </li>
                    </ul>
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

            <!-- Buttons -->
            <div>
                <a
                    href="#"
                    class="free-trial-btn btn btn-primary text-uppercase btn-xl"
                    >Free Trial</a
                >
            </div>

            <img width="800" src="../../assets/img/calendar.png" alt="Calendar" class="calendar-img">
        </div>
    </section>
</template>

<script>
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
};
</script>

<style>
.hero {
    background-image: url("../../assets/img/hero-img.jpeg");
    height: 75rem;
    background-size: cover;
    background-position: center;
}

@media (min-width: 768px) {
    .hero {
        height: 90rem;
    }
}

.hero-overlay {
    height: 100%;
    padding: 0 10%;
    background-color: rgba(0, 0, 0, 0.75);
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
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
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
</style>
