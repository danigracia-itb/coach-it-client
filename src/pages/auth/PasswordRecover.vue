<template>
    <div class="row">
        <div class="img-password col-7 d-none d-md-block"></div>
        <div
            class="col-md-5 d-flex flex-column align-items-center justify-content-center"
        >
            <RouterLink to="/"
                ><img class="auth-logo-img" src="../../../public/assets/logo.png" alt=""
            /></RouterLink>
            <div class="p-5 px-5 border rounded-5">
                <img
                    class="key-img mx-auto d-block mb-4"
                    src="../../../public/assets/img/key-solid.svg"
                    alt=""
                    srcset=""
                />
                <h1 class="text-uppercase text-center fw-bold">
                    Recover your <span class="text-primary">Password</span>
                </h1>
                <p>Introduce your new password</p>
                <form @submit.prevent="recoverPassword">
                    <div class="form-group mt-5">
                        <label for="password">Password</label>
                        <input
                            v-model="password"
                            type="password"
                            id="password"
                            class="form-control p-3"
                            :class="
                                errors.password || errors.password_confirmation
                                    ? 'is-invalid'
                                    : ''
                            "
                            placeholder="Introduce your password"
                        />
                        <div v-if="errors.password" class="invalid-feedback">
                            {{ errors.password }}
                        </div>
                    </div>
                    <div class="form-group mt-5">
                        <label for="password">Confirm password</label>
                        <input
                            v-model="password_confirmation"
                            type="password"
                            id="password_confirmation"
                            class="form-control p-3"
                            :class="
                                errors.password_confirmation ? 'is-invalid' : ''
                            "
                            placeholder="Repeat your password"
                        />
                        <div
                            v-if="errors.password_confirmation"
                            class="invalid-feedback"
                        >
                            {{ errors.password_confirmation }}
                        </div>
                    </div>

                    <Spinner v-if="loading" />

                    <button
                        v-else
                        type="submit"
                        class="text-uppercase btn btn-primary mt-5 rounded-4 w-100"
                    >
                        Recover password
                    </button>
                </form>
            </div>

            <RouterLink to="/" class="mt-5"><font-awesome-icon size="2xl" icon="fa-solid fa-house" /></RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import axiosClient from "../../config/axios";
import { passwordChangedSuccessfully } from "../../functions/alerts";
import Spinner from "../../components/utils/Spinner.vue";

const route = useRoute();
const token = route.params.token;

const password = ref("");
const password_confirmation = ref("");

//General
var errors = reactive({});
const loading = ref(false);
const router = useRouter();

async function recoverPassword() {
    if (!password.value && !password_confirmation.value) {
        errors.password_confirmation = "Both passwords fields are mandatory.";
    }

    if (password.value != password_confirmation.value) {
        errors.password_confirmation = "Passwords do not match.";
    }

    //If there's any error
    if (Object.entries(errors).length > 0) {
        return;
    }

    loading.value = true;

    try {
        await axiosClient.post(
            "users/password-recover",
            {
                password: password.value,
                token: token,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        loading.value = false;

        passwordChangedSuccessfully().then(() => {
            router.push("/login");
        });
    } catch (e) {
        loading.value = false;
        console.log(e);

        if (e?.response.data.error) {
            const apiErrors = e.response.data.error;

            for (let key in apiErrors) {
                if (apiErrors.hasOwnProperty(key)) {
                    let value = apiErrors[key];
                    errors[key] = value[0];
                    console.log(`Key: ${key}, Value: ${value}`);
                }
            }
        }
    }
}
</script>

<style scoped></style>
