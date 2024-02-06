<template>
    <div class="row">
        <div class="img-login vh-100 col-7 d-none d-md-block"></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <RouterLink to="/"
                ><img width="300" src="../../../public/assets/logo.png"
            /></RouterLink>
            <div class="p-5 mx-2 mx-md-0 border rounded-5 bg-white">
                <h1 class="text-uppercase text-center fw-bold">login</h1>
                <form @submit.prevent="handleLogin" class="">
                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input
                            v-model="email"
                            type="email"
                            id="email"
                            class="form-control p-3"
                            placeholder="Introduce your email"
                        />
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            id="password"
                            class="form-control p-3"
                            placeholder="Introduce your password"
                        />
                    </div>

                    <div
                        style="height: 4rem"
                        class="mt-5 d-flex align-items-center"
                    >
                        <button
                            v-if="!configStore.loading"
                            type="submit"
                            class="text-uppercase btn btn-primary rounded-4 w-100"
                        >
                            Login
                        </button>
                        <Spinner v-else />
                    </div>

                    <div v-if="configStore.error" class="alert alert-danger mt-5">
                        Error: Incorrect credentials.
                    </div>
                </form>
                <div class="mt-5 text-small">
                    <p class="text-lg">
                        Don't you have account? Create one <br />
                        <RouterLink
                            to="/register?type=coach"
                            class="text-primary fw-bold"
                            >Coach</RouterLink
                        >
                        or
                        <RouterLink
                            to="/register?type=athlete"
                            class="text-primary fw-bold"
                            >Athlete</RouterLink
                        >
                    </p>
                    <p>
                        Forgot password?
                        <RouterLink
                            to="/request-password-recover"
                            class="text-primary fw-bold"
                            >Recover it
                        </RouterLink>
                    </p>
                </div>
            </div>
            <RouterLink to="/" class="mt-5"
                ><font-awesome-icon size="2xl" icon="fa-solid fa-house"
            /></RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import authController from "../../controllers/authController";
import useAuthStore from "../../stores/useAuthStore"
import useConfigStore from "../../stores/useConfigStore";
import Spinner from "../../components/utils/Spinner.vue";

const authStore = useAuthStore()
const configStore = useConfigStore()

const email = ref("");
const password = ref("");

const handleLogin = async () => {
    await authController.login({email: email.value, password: password.value})
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

html,
body {
    height: 100%;
}

.row {
    height: 100vh;
    margin: 0;
}

.img-login {
    background-image: url(../../../public/assets/img/img-login.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center right;
    max-width: 100%;
}
</style>
