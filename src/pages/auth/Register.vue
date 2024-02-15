<template>
    <div class="row no-scroll">
        <div class="img-register col-7 vh-100 d-none d-md-block"></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <RouterLink to="/"
                ><img
                    class="auth-logo-img"
                    src="../../../public/assets/logo.png"
                    alt=""
            /></RouterLink>
            <div class="p-5 mx-auto border rounded-5 bg-white">
                <h1 class="text-uppercase text-center fw-bold">
                    Register as {{ is_coach ? "a" : "an" }}
                    <span :class="{ 'text-primary': is_coach }">
                        {{ is_coach ? "Coach" : "Athlete" }}
                    </span>
                </h1>
                <p v-if="!is_coach && code" class="text-center fw-bold mt-4">
                    Registering using code:
                    <span class="text-primary">{{ code }}</span>
                </p>
                <form @submit.prevent="handleRegister" novalidate>
                    <div class="form-group mt-5">
                        <label for="name">Name</label>
                        <input
                            type="name"
                            id="name"
                            class="form-control p-3"
                            :class="
                                configStore.validationErrors.name
                                    ? 'is-invalid'
                                    : ''
                            "
                            placeholder="Introduce your name"
                            required
                            v-model="name"
                        />

                        <div
                            v-if="configStore.validationErrors.name"
                            class="invalid-feedback"
                        >
                            {{ configStore.validationErrors.name }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            class="form-control p-3"
                            :class="
                                configStore.validationErrors.email
                                    ? 'is-invalid'
                                    : ''
                            "
                            placeholder="Introduce your email"
                            required
                            v-model="email"
                        />

                        <div
                            v-if="configStore.validationErrors.email"
                            class="invalid-feedback"
                        >
                            {{ configStore.validationErrors.email }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            class="form-control p-3"
                            :class="
                                configStore.validationErrors
                                    .password_confirmation
                                    ? 'is-invalid'
                                    : ''
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
                                configStore.validationErrors
                                    .password_confirmation
                                    ? 'is-invalid'
                                    : ''
                            "
                            placeholder="Repeat your password"
                            required
                            v-model="password_confirmation"
                        />

                        <div
                            v-if="
                                configStore.validationErrors
                                    .password_confirmation
                            "
                            class="invalid-feedback"
                        >
                            {{
                                configStore.validationErrors
                                    .password_confirmation
                            }}
                        </div>
                    </div>

                    <div class="form-check mt-4">
                        <input
                            class="form-check-input"
                            :class="
                                configStore.validationErrors.terms_conditions
                                    ? 'is-invalid'
                                    : ''
                            "
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
                            v-if="configStore.validationErrors.terms_conditions"
                            class="invalid-feedback"
                        >
                            {{ configStore.validationErrors.terms_conditions }}
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
                        v-if="!configStore.loading"
                        type="submit"
                        class="text-uppercase btn btn-primary mt-5 rounded-4 w-100"
                    >
                        Register
                    </button>
                    <Spinner v-else />

                    <!-- <div v-if="configStore.validationErrors.general" class="alert alert-danger mt-5">
                        {{ configStore.validationErrors.general }}
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
                            >Register as an athlete
                        </RouterLink>
                    </p>
                    <p v-else>
                        You are a coach?
                        <RouterLink
                            to="/register?type=coach"
                            class="text-primary fw-bolder"
                            >Register as a coach
                        </RouterLink>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import authController from "../../controllers/authController";
import useAuthStore from "../../stores/useAuthStore";
import useConfigStore from "../../stores/useConfigStore";

//Alerts
import { enterCoachCode, showTermsConditions } from "../../functions/alerts";

//Components
import Spinner from "../../components/utils/Spinner.vue";

const authStore = useAuthStore();
const configStore = useConfigStore();

//Router
const route = useRoute();
const router = useRouter();

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

async function handleRegister() {
    authController.validateRegister({
        name: name.value,
        email: email.value,
        password: password.value,
        password_confirmation: password_confirmation.value,
        terms_conditions: terms_conditions.value,
    });

    //If there's any error
    if (Object.entries(configStore.validationErrors).length > 0) {
        return;
    }

    //Call API
    await authController.register({
        name: name.value,
        email: email.value,
        password: password.value,
        is_coach: is_coach.value,
        code: code.value ?? null,
    });
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
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

html,
body {
    height: 100%;
    overflow-y: hidden;
}

.col-md-5 {
    overflow-y: auto;
    max-height: 100vh;
    /* Ajusta la altura máxima según sea necesario */
}

.row {
    max-width: 100%;
    overflow: hidden;
}

.img-register {
    background-image: url(../../../public/assets/img/img-register.webp);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center right;
    max-width: 100%;
    background-position: center;
    max-width: 100%;
    height: 100%;
}
</style>
