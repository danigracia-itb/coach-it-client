<template>
    <div class="row">
        <div class="img-auth vh-100 col-7 d-none d-md-block" src="recover.png">

        </div>
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
            <img class="auth-logo-img" src="../../assets/logo.png" alt="">
            <div class="p-8 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">login</h1>
                <form class="">
                    <div class="form-group mt-5">
                        <Icon icon="material-symbols:mail" />
                        <label for="email">Email</label>
                        <input type="email" id="email" class="form-control p-3" placeholder="Introduce your email">
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input type="password" id="password" class="form-control p-3" placeholder="Introduce your password">
                    </div>
                    <button type="submit" class="text-uppercase btn btn-primary mt-5 rounded-4 w-100">Login</button>
                </form>
                <div class="mt-5 text-small">
                    <p class="text-lg">Don't you have account? Create one <br>
                        <RouterLink to="/register?type=coach" class="text-primary fw-bold">Coach</RouterLink> or <RouterLink
                            to="/register?type=coach" class="text-primary fw-bold">Athlete</RouterLink>
                    </p>
                    <p>Forgot password? <RouterLink to="/request-password-recover" class="text-primary fw-bold">Recover it
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

<style scoped>
.p-8 {
    padding: 7rem;
}
</style>