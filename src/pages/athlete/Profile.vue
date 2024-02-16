<template>
    <div class="mt-5">
        <div class="d-flex justify-content-start">
            <button class="btn btn-primary d-none d-md-block" @click="$router.back()">
                <font-awesome-icon icon="fa-solid fa-left-long" />
            </button>
        </div>

        <!-- Contenedor principal -->
        <div class="d-flex flex-row align-items-center justify-content-center" @click="openFilePicker">
            <img class="img-user rounded-circle" :src="`${backendUrl}/${authStore.picture}`" />
            <input type="file" id="seleccionArchivos" accept="image/*" @change="handleFileChange" style="display: none" />

            <button class="btn align-self-end"> <font-awesome-icon class="text-primary" icon="fa-solid fa-arrow-up-from-bracket" size="xl" /></button>
        </div>

        <section class="mt-5">
            <p class="text-uppercase mb-1">Profile settings</p>
            <form class="d-flex flex-column gap-2" @submit.prevent="saveData()">
                <div>
                    <input type="text" class="form-control" placeholder="Enter your name..." v-model="newName" />
                </div>
                <div>
                    <input type="text" class="form-control" placeholder="Enter your email..." v-model="newEmail" />
                </div>

                <button class="btn btn-success" type="submit"><font-awesome-icon :icon="['fas', 'save']" />
                    Save</button>
            </form>
        </section>

        <section class="mt-5">
            <p class="text-uppercase mb-1">Your Coach</p>
            <form class="d-flex flex-column gap-2" @submit.prevent="saveCoachCode()">
                <div>
                    <select class="form-select" v-model="newHaveCoach">
                        <option :value="true">I have a coach</option>
                        <option :value="false">I don't have a coach</option>
                    </select>
                </div>

                <div v-if="newHaveCoach">
                    <input type="text" class="form-control" placeholder="Enter your coach code..." v-model="newCoach" />
                </div>
                <div v-else>
                    <input type="text" class="form-control" placeholder="No coach code" disabled />
                </div>
                <button class="btn btn-success" type="submit">
                    <font-awesome-icon :icon="['fas', 'save']" /> Save
                </button>
            </form>
        </section>

        <section class="mt-5">
            <p class="text-uppercase mb-1">Others</p>
            <div class="d-flex flex-column gap-2">
                <RouterLink class="w-100 btn btn-secondary" :to="`/form?id=${id}`"><font-awesome-icon
                        :icon="['fas', 'pen-to-square']" />
                    Edit personal data
                </RouterLink>

                <button class="bg-white text-danger w-100 btn btn-outline-danger border border-1 fw-bold"
                    @click="authController.logout()">
                    Log Out
                </button>


            </div>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axiosClient from "../../config/axios";

import { useToast } from "vue-toast-notification";

//Components
import Spinner from "../../components/utils/Spinner.vue";

//Stores
import useAuthStore from "../../stores/useAuthStore";
import useConfigStore from "../../stores/useConfigStore";

//Controllers
import authController from "../../controllers/authController";

const authStore = useAuthStore();
const configStore = useConfigStore();

const toast = useToast();

const backendUrl = import.meta.env.VITE_API_URL;

const id = ref(authStore.id);
const newName = ref(authStore.name);
const newEmail = ref(authStore.email);
const newCoach = ref(authStore.coach_id);
const newHaveCoach = ref(authStore.coach_id ? true : false);

const selectedFile = ref(null);
const imagenPrevisualizacion = ref("");

async function handleFileChange(event) {
    selectedFile.value = event.target.files[0];
    if (selectedFile.value) {
        imagenPrevisualizacion.value = URL.createObjectURL(selectedFile.value);
        try {
            const formData = new FormData();
            formData.append("image", selectedFile.value);
            const response = await axiosClient.post(
                "users/change-picture/" + authStore.id,
                formData
            );
            authStore.setUser(response.data);
        } catch (error) {
            console.error(error);
        }
    } else {
        imagenPrevisualizacion.value = "";
    }
}

function openFilePicker() {
    document.getElementById("seleccionArchivos").click();
}

async function saveData() {
    await authController.updateUserData(newName.value, newEmail.value);

    if (configStore.error) {
        toast.error("Server Error: Changes have not been saved.", {
            position: "top",
        });
    } else {
        toast.success("Profile Settings Updated", {
            position: "top",
        });
    }
}

async function saveCoachCode() {
    await authController.updateUserCoach(
        !newHaveCoach.value ? "nocoach" : newCoach.value
    );
    if (configStore.error) {
        toast.error(configStore.validationErrors.coach_id, {
            position: "top",
        });
    } else {
        toast.success("Coach Code Updated", {
            position: "top",
        });
    }
}
</script>

<style scoped>
.img-user {
    width: 20rem;
    height: 20rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .img-user {
        width: 12rem;
        height: 12rem;
    }

    .camposPerfil {
        margin-top: 15%;
    }
}

.logout-btn {
    transition: background-color 0.3s ease;
}

.logout-btn:hover {
    background-color: #b80000;
    /* Cambia este valor al color que desees para oscurecer el botón */
}
</style>
