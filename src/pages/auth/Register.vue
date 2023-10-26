<template>
    <div class="row">
        <div class="img-auth vh-100 col-5 d-none d-md-block">

        </div>
        <div class="col-md-7 d-flex flex-column align-items-center justify-content-center">
            <img class="auth-logo-img" src="../../assets/logo.png" alt="">
            <div class="border rounded p-5">
                <h1 class="text-uppercase text-center fw-bold">Register as a <span class="text-primary">Coach</span></h1>
                <form class="text-center">
                    <div class="form-group mt-5">
                        <label for="name" class="text-uppercase fw-bold">Name</label>
                        <input type="name" id="name" class="form-control" placeholder="Introduce your name">
                    </div>

                    <div class="form-group mt-5">
                        <label for="email" class="text-uppercase fw-bold">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Introduce your email">
                    </div>

                    <div class="form-group mt-5">
                        <label for="password" class="text-uppercase fw-bold">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Introduce your password">
                        <input type="password" id="password" class="form-control" placeholder="Repeat your password">
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            I agree to the <span class="text-primary fw-bold">Terms & Conditions</span>
                        </label>
                    </div>

                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                        <label class="form-check-label" for="flexCheckChecked">
                            I agree to recive communications from Coach IT
                        </label>
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5">Register</button>

                </form>
                <div class="mt-5 fw-bold">
                    <p>Don't you have an account?<br>
                        <RouterLink to="/register?type=coach" class="text-primary">Log in Register as an athlete
                        </RouterLink>
                    </p>
                </div>
            </div>
            <RouterLink to="/" class="mt-5">Home</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>