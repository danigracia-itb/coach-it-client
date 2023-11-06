<template>
    <div class="row">
        <div
            class="img-auth vh-100 col-7 d-none d-md-block"
            src="recover.png"
        ></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <img class="auth-logo-img" src="../../assets/logo.png" alt="" />
            <div class="p-8 border rounded-5">
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
                    <button
                        type="submit"
                        class="text-uppercase btn btn-primary mt-5 rounded-4 w-100"
                    >
                        Login
                    </button>
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

        const { is_coach } = response.data.user;

        if (is_coach) {
            const { token } = response.data;
            localStorage.setItem("token", token);

            router.push({ path: "/coach" });
        } else {
            router.push({ path: "/athlete" });
        }
    } catch (error) {
        loading.value = false;
        error.value = true;
        console.log(error);
    }
};

// const Spinner = defineAsyncComponent(() => import("../components/layout/Spinner.vue"));
</script>

<style scoped>
.p-8 {
    padding: 7rem;
}
</style>
