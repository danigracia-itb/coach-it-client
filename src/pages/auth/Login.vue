<template>
    <div class="row">
        <div
            class="img-login vh-100 col-7 d-none d-md-block"
        ></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <img class="auth-logo-img" src="../../assets/logo.png" alt="Logo Coach IT" />
            <div class="p-5 mx-2 mx-md-0 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">login</h1>
                <form @submit.prevent="login" class="">
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

                    <div style="height: 4rem;" class="mt-5 d-flex align-items-center">
                        <button
                            v-if="!loading"
                            type="submit"
                            class="text-uppercase btn btn-primary rounded-4 w-100"
                        >
                            Login
                        </button>
                        <Spinner v-else />
                    </div>

                    <div v-if="error" class="alert alert-danger mt-5">
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
            <RouterLink to="/" class="mt-5">Home</RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axiosClient from "../../config/axios";
import { useRouter, RouterLink } from "vue-router";

import Spinner from "../../components/Utils/Spinner.vue";

const email = ref("");
const password = ref("");

const error = ref("");
const loading = ref(false);
const router = useRouter();

const login = async (e) => {
    e.preventDefault();
    loading.value = true;

    try {
        const response = await axiosClient.post(
            "login",
            {
                email: email.value,
                password: password.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        loading.value = false;
        error.value = false;

        const { is_coach } = response.data.user;

        if (is_coach) {
            const { token } = response.data;
            localStorage.setItem("token", token);

            router.push({ path: "/coach" });
        } else {
            router.push({ path: "/athlete" });
        }
    } catch (e) {
        loading.value = false;
        error.value = true;
    }
};

// const Spinner = defineAsyncComponent(() => import("../components/layout/Spinner.vue"));
</script>

<style scoped>
.img-login {
    background-image: url(./src/assets/img/img-login.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center right;
}
</style>
