<template>
    <div class="row no-scroll">
        <div class="img-password col-7 d-none d-md-block"></div>
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
            <RouterLink to="/"><img class="auth-logo-img" src="../../../public/assets/logo.png" alt="" /></RouterLink>
            <div class="p-5 px-5 border rounded-5 bg-white">
                <h1 class="text-uppercase text-center fw-bold">
                    Forgot your <span class="text-primary">Password?</span>
                </h1>
                <form @submit.prevent="requestPasswordRecover">
                    <div class="form-group mt-5">
                        <label for="email">Email</label>
                        <input v-model="email" type="email" id="email" class="form-control p-3"
                            :class="errors.email ? 'is-invalid' : ''" placeholder="Introduce your email" required />

                        <div v-if="errors.email" class="invalid-feedback">
                            {{ errors.email }}
                        </div>
                    </div>

                    <Spinner v-if="loading" />

                    <button v-else type="submit" class="text-uppercase btn btn-primary mt-5 rounded-4 w-100">
                        Send mail
                    </button>
                </form>
            </div>

            <RouterLink to="/" class="mt-5"><font-awesome-icon size="2xl" icon="fa-solid fa-house" /></RouterLink>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import axiosClient from "../../config/axios";
import { passwordRecoverRequestedSuccess } from "../../functions/alerts";

import Spinner from "../../components/utils/Spinner.vue";

const email = ref("");

//General
var errors = reactive({});
const loading = ref(false);
const router = useRouter();

async function requestPasswordRecover() {
    //Validar
    if (!email.value) {
        errors.email = "The email field is required.";
    }

    //If there's any error
    if (Object.entries(errors).length > 0) {
        return;
    }

    loading.value = true;

    try {
        await axiosClient.post(
            "users/request-password-recover",
            {
                email: email.value,
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        loading.value = false;
        passwordRecoverRequestedSuccess(email.value).then(() => {
            router.push("/login");
        });
    } catch (e) {
        loading.value = false;
        if (e.response.data.error.email[0]) {
            errors.email = e.response.data.error.email[0];
        }
    }
}
</script>


<style scoped>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
}

html, body {
    height: 100%;
    overflow-y: hidden;
}

.row.no-scroll {
    overflow: hidden;
    height: 100vh;
    margin: 0;
}

.col-md-5 {
    overflow-y: auto; 
    max-height: 100vh; 
}
</style>