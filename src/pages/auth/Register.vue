<template>
    <div class="row">
        <div class="img-auth col-7 d-none d-md-block">

        </div>
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
           <RouterLink to="/"><img class="auth-logo-img" src="../../assets/logo.png" alt=""></RouterLink>
            <div class="p-5 px-5 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">Register as a <span class="text-primary">Coach</span></h1>
                <form>
                    <div class="form-group mt-5">
                        <label for="name">Name</label>
                        <input type="name" id="name" class="form-control p-3" placeholder="Introduce your name">
                    </div>

                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control p-3" placeholder="Introduce your email">
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control p-3" placeholder="Introduce your password">
                        <input type="password" id="password" class="form-control p-3 mt-4" placeholder="Repeat your password">
                    </div>

                    <div class="form-check mt-4">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            I agree to the <span class="text-primary fw-bold">Terms & Conditions</span>
                        </label>
                    </div>

                    <div class="form-check mt-2">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked>
                        <label class="form-check-label" for="flexCheckChecked">
                            I agree to recive communications from Coach IT
                        </label>
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5 rounded-4 w-100">Register</button>

                </form>
                <div class="mt-5 text-center">
                    <p>Don't you have an account?<br>
                        <RouterLink to="/register?type=coach" class="text-primary fw-bolder">Log in Register as an athlete
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>