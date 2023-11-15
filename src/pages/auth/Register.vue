<template>
    <div class="row">
        <div class="img-register vh-100 col-7 d-none d-md-block"></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <RouterLink to="/"
                ><img class="auth-logo-img" src="../../assets/logo.png" alt=""
            /></RouterLink>
            <div class="p-5 px-5 border rounded-5">
                <h1 class="text-uppercase text-center fw-bold">
                    Register as {{ is_coach ? "a" : "an" }}
                    <span class="text-primary">{{
                        is_coach ? "Coach" : "Athlete"
                    }}</span>
                </h1>
                <p v-if="!is_coach && code" class="text-center fw-bold mt-4">
                    Registering using code:
                    <span class="text-primary">{{ code }}</span>
                </p>
                <form @submit.prevent="register">
                    <div class="form-group mt-5">
                        <label for="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            class="form-control p-3"
                            placeholder="Introduce your name"
                            required
                        />
                    </div>

                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            class="form-control p-3"
                            placeholder="Introduce your email"
                            required
                        />
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            class="form-control p-3"
                            placeholder="Introduce your password"
                            required
                        />
                        <input
                            type="password"
                            id="password"
                            class="form-control p-3 mt-4"
                            placeholder="Repeat your password"
                            required
                        />
                    </div>

                    <div class="form-check mt-4">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckDefault"
                            required
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            I agree to the
                            <span class="text-primary fw-bold"
                                >Terms & Conditions</span
                            >
                        </label>
                    </div>

                    <div class="form-check mt-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            id="flexCheckChecked"
                            checked
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                            I agree to recive communications from Coach IT
                        </label>
                    </div>

                    <button
                        type="submit"
                        class="text-uppercase btn btn-primary mt-5 rounded-4 w-100"
                    >
                        Register
                    </button>
                </form>
                <div class="mt-5 text-center">
                    <p>
                        Already have an account?
                        <RouterLink
                            to="/login"
                            class="text-primary fw-bolder"
                            >Login</RouterLink
                        >
                    </p>
                    <p v-if="is_coach">
                        You are not a coach?
                        <RouterLink
                            to="/register?type=athlete"
                            class="text-primary fw-bolder"
                            >Register as an athlete</RouterLink
                        >
                    </p>
                    <p v-else>
                        You are a coach?
                        <RouterLink
                            to="/register?type=coach"
                            class="text-primary fw-bolder"
                            >Register as a coach</RouterLink
                        >
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";

//Alerts
import { enterCoachCode } from "../../functions/alerts";

const route = useRoute();
const router = useRouter();
const is_coach = ref(false);
const code = ref(false);

function registerType() {
    is_coach.value = route.query.type != "athlete"; //if there's no type in URL, coach will be the default mode
    if (is_coach.value == false) {
        code.value = route.query.code;

        if (!code.value) {
            enterCoachCode(code, router);
        }
    }
}

function register() {
    //TODO: Validate form

}


onMounted(() => {
    registerType();
});

watch(
    () => route.query,
    () => {
        registerType();
    }
);
</script>

<style scoped>
.img-register {
    background-image: url(./src/assets/img/img-register.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center right;
}
</style>
