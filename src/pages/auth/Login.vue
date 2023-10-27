<template>
    <div class="row">
        <div class="img-auth vh-100 col-5 d-none d-md-block" src="recover.png">

        </div>
        <div class="col-md-7 d-flex flex-column align-items-center justify-content-center">
            <img class="auth-logo-img" src="../../assets/logo.png" alt="">
            <div class="border rounded p-5">
                <h1 class="text-uppercase text-center fw-bold">log in</h1>
                <form class="text-center">
                    <div class="form-group mt-5">
                        <label for="email" class="text-uppercase fw-bold">Email</label>
                        <input type="email" id="email" class="form-control" placeholder="Introduce your email">
                    </div>

                    <div class="form-group mt-5">
                        <label for="password" class="text-uppercase fw-bold">Password</label>
                        <input type="password" id="password" class="form-control" placeholder="Introduce your password">
                    </div>

                    <button type="submit" class="text-uppercase btn btn-primary mt-5">Log in</button>

                </form>
                <div class="mt-5">
                    <p>Don't you have account? Create one <br>
                        <RouterLink to="/register?type=coach" class="text-primary">Coach</RouterLink> or <RouterLink
                            to="/register?type=coach" class="text-primary">Athlete</RouterLink>
                    </p>
                    <p>Forgot password? <RouterLink to="/request-password-recover" class="text-primary">Recover it
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