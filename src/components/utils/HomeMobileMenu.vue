<template>
  <div class="bg-light px-5 py-2 d-flex flex-column flex-sm-row justify-content-between align-items-center shadow-sm">
    <div class="d-flex align-items-center">
      <RouterLink to="/">
        <img width="300" src="../../../public/assets/logo.png" />
      </RouterLink>
      <nav class="navbar navbar-expand-lg navbar-light navbar-custom">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" @click="toggleNav" aria-controls="navbarNav"
            :aria-expanded="isNavOpen ? 'true' : 'false'" aria-label="Toggle navigation"
            :style="{ borderBottom: isNavOpen ? 'none' : '1px solid transparent', fontSize: '4rem' }">
            <font-awesome-icon size="" icon="fa-solid fa-bars" class="text-secondary" />
          </button>
          <div :class="['collapse', 'navbar-collapse', { show: isNavOpen }]" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <RouterLink to="/">
                  <a class="nav-link home fw-bold" href="#" @click="closeNav">Home</a>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/aboutus">
                  <a class="nav-link" href="#" @click="closeNav">About us</a>
                </RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/login">
                  <a class="nav-link" href="#" @click="closeNav">Login</a>
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
    <RouterLink to="/register">
      <button class="btn start-today-btn btn btn-primary mb-3">
        Start Today
      </button>
    </RouterLink>
  </div>
</template>
  
<script setup>
import { ref } from 'vue';

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
  justify-content: flex-end;
}

.bg-dark {
  background-color: #000;
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
  border-radius: 5px;
}

.start-today-btn:active {
  transform: scale(0.95);
  color: #fff;
}

.hero {
  background-image: url("../../../public/assets/img/hero-img2.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 100px 0;
}

.hero-overlay h1 {
  font-size: 5rem;
  font-weight: 900;
  color: #fff;
}

.journey {
  margin-top: 5rem;
}

h3 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}

.motivational-text {
  text-align: center;
  padding: 3rem;
  position: relative;
  z-index: 2;
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

.img-req {
  max-width: 100%;
  height: auto;
  margin-top: 10px;
  border-radius: 10px;
}

.athlete-dashboard {
  font-size: 2rem;
  text-align: center;
}

.perform-tracking-container {
  position: relative;
}

.navbar-toggler {
  border: none;
  background-color: transparent;
  outline: none;
}
</style>
  