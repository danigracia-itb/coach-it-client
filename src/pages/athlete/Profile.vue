<template>
    <div class="mt-2">
        <div class="d-flex justify-content-end justify-content-md-between">
            <button class="btn btn-primary d-none d-md-block" @click="$router.back()">
                <font-awesome-icon icon="fa-solid fa-left-long" />
            </button>
            <button class="btn btn-outline-secondary" @click="saveData()">
                Save
            </button>
        </div>

        <!-- Contenedor principal -->
        <div class="d-flex flex-column align-items-center justify-content-center">
            <img class="img-user rounded-circle" :src="`${backendUrl}/${authStore.picture}`" @click="openFilePicker" />
            <input type="file" id="seleccionArchivos" accept="image/*" @change="handleFileChange" style="display: none" />
        </div>

        <section class="mt-5">
            <p class="text-uppercase mb-1">Profile settings</p>
            <form class="d-flex flex-column gap-2">
                <div>
                    <input type="text" class="form-control" v-model="newName">
                </div>
                <div>
                    <input type="text" class="form-control" v-model="authStore.email">
                </div>
            </form>
        </section>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axiosClient from "../../config/axios";

//Components
import Spinner from "../../components/utils/Spinner.vue";

//Stores
import useAuthStore from "../../stores/useAuthStore";
import useConfigStore from "../../stores/useConfigStore";

//Controllers
import authController from "../../controllers/authController";

const authStore = useAuthStore();
const configStore = useConfigStore();

const backendUrl = import.meta.env.VITE_API_URL;

const newName = ref(authStore.name);

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

function saveData() {
    authController.updateUserName(newName.value);
}
</script>

<style scoped>
.img-user {
    width: 7rem;
    height: 7rem;
    cursor: pointer;
}

@media (max-width: 768px) {
    .camposPerfil {
        margin-top: 15%;
    }
}
</style>
