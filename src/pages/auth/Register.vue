<template>
    <div class="row">
        <div class="img-register vh-100 col-7 d-none d-md-block"></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <RouterLink to="/"
                ><img class="auth-logo-img" src="../../assets/logo.png" alt=""
            /></RouterLink>
            <div class="p-5 mx-2 mx-md-0 border rounded-5">
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
                <form @submit.prevent="register" novalidate>
                    <div class="form-group mt-5">
                        <label for="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            class="form-control p-3"
                            :class="errors.name ? 'is-invalid' : ''"
                            placeholder="Introduce your name"
                            required
                            v-model="name"
                        />

                        <div v-if="errors.name" class="invalid-feedback">
                            {{ errors.name }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            class="form-control p-3"
                            :class="errors.email ? 'is-invalid' : ''"
                            placeholder="Introduce your email"
                            required
                            v-model="email"
                        />

                        <div v-if="errors.email" class="invalid-feedback">
                            {{ errors.email }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            class="form-control p-3"
                            :class="
                                errors.password_confirmation ? 'is-invalid' : ''
                            "
                            placeholder="Introduce your password"
                            required
                            v-model="password"
                        />
                        <input
                            type="password"
                            id="password"
                            class="form-control p-3 mt-4"
                            :class="
                                errors.password_confirmation ? 'is-invalid' : ''
                            "
                            placeholder="Repeat your password"
                            required
                            v-model="password_confirmation"
                        />

                        <div
                            v-if="errors.password_confirmation"
                            class="invalid-feedback"
                        >
                            {{ errors.password_confirmation }}
                        </div>
                    </div>

                    <div class="form-check mt-4">
                        <input
                            class="form-check-input"
                            :class="errors.terms_conditions ? 'is-invalid' : ''"
                            type="checkbox"
                            required
                            v-model="terms_conditions"
                        />
                        <label class="form-check-label" for="flexCheckDefault">
                            I agree to the
                            <span
                                class="text-primary fw-bold text-decoration-underline cursor-pointer"
                                @click="callTermsAndConditions"
                                >Terms & Conditions</span
                            >
                        </label>
                        <div
                            v-if="errors.terms_conditions"
                            class="invalid-feedback"
                        >
                            {{ errors.terms_conditions }}
                        </div>
                    </div>

                    <div class="form-check mt-2">
                        <input
                            class="form-check-input"
                            type="checkbox"
                            value=""
                            checked
                            v-model="comunications"
                        />
                        <label class="form-check-label" for="flexCheckChecked">
                            I agree to recive communications from Coach IT
                        </label>
                    </div>

                    <button
                        v-if="!loading"
                        type="submit"
                        class="text-uppercase btn btn-primary mt-5 rounded-4 w-100"
                    >
                        Register
                    </button>
                    <Spinner v-else />

                    <!-- <div v-if="errors.general" class="alert alert-danger mt-5">
                        {{ errors.general }}
                    </div> -->
                </form>
                <div class="mt-5 text-center">
                    <p>
                        Already have an account?
                        <RouterLink to="/login" class="text-primary fw-bolder"
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
import { onMounted, reactive, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import axiosClient from "../../config/axios";

//Alerts
import { enterCoachCode, showTermsConditions } from "../../functions/alerts";

//Components
import Spinner from "../../components/utils/Spinner.vue";

//Router
const route = useRoute();
const router = useRouter();

//Variables
var errors = reactive({});
const loading = ref(false);

const is_coach = ref(false);
const code = ref(false);

//Form Variables
const name = ref("");
const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const terms_conditions = ref(true);
const comunications = ref(false);

function callTermsAndConditions() {
    showTermsConditions().then((userAgreed) => {
        if (userAgreed) {
            terms_conditions.value = true;
        } else {
            terms_conditions.value = false;
        }
    });
}

async function register() {
    //Validate form
    if (!name.value) {
        errors.name = "Name field is mandatory.";
    }
    if (!email.value) {
        errors.email = "Email field is mandatory.";
    }
    if (!password.value && !password_confirmation.value) {
        errors.password_confirmation = "Both passwords fields are mandatory.";
    }

    if (password.value != password_confirmation.value) {
        errors.password_confirmation = "Passwords do not match.";
    }
    if (terms_conditions.value == false) {
        errors.terms_conditions = "You must accept our Terms & Conditions.";
    }

    //If there's any error
    if (Object.entries(errors).length > 0) {
        return;
    }

    //Call API
    loading.value = true;

    try {
        const response = await axiosClient.post(
            "register",
            {
                name: name.value,
                email: email.value,
                password: password.value,
                is_coach: is_coach.value,
                coach_id: code.value ?? null,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        loading.value = false;
        errors = {};

        const { token, user } = response.data;
        localStorage.setItem("token", token);
        localStorage.setItem("id", user.id);

        if (is_coach) {
            router.push({ path: "/coach" });
        } else {
            router.push({ path: "/athlete" });
        }

        console.log(response);
    } catch (e) {
        console.log(e);
        loading.value = false;
        errors.general = "Server error, try again later.";
    }
}

//Check register type()
function registerType() {
    is_coach.value = route.query.type != "athlete"; //if there's no type in URL, coach will be the default mode
    if (is_coach.value == false) {
        code.value = route.query.code;

        if (!code.value) {
            enterCoachCode(code, router);
        }
    }
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
