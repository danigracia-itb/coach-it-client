<template>
    <div class="mt-5 text-center">
        <div class="d-flex justify-content-start">
            <button class="btn btn-primary" @click="$router.back()">
                <font-awesome-icon icon="fa-solid fa-left-long" />
            </button>
        </div>
        <!-- Contenedor principal -->
        <h1 class="text-center mb-5">Profile</h1>
        <div class="container">
    <div class="row justify-content-center">
        <!-- Centra el contenido horizontalmente -->
        <div class="align-bottom text-center col-12 col-sm-8"> <!-- Utiliza col-12 para ocupar todo el ancho en pantallas pequeñas -->
            <img class="img-user rounded-circle" :src="`${backendUrl}/${authStore.picture}`" />
            <input type="file" id="seleccionArchivos" accept="image/*" @change="handleFileChange" style="display: none" />
            <button class="align-bottom bg-transparent border-0" @click="openFilePicker">
                <font-awesome-icon class="text-primary" icon="fa-solid fa-arrow-up-from-bracket" size="xl" />
            </button>
        </div>

        <div class="d-flex flex-column align-items-center justify-content-between camposPerfil col-12 col-sm-8"> <!-- Utiliza col-12 para ocupar todo el ancho en pantallas pequeñas -->
            <p class="fw-bold mt-5">Name</p>
            <div v-if="!editing" class="flex-grow-1">
                <p class="text-start">{{ authStore.name }}</p>
            </div>
            <div v-else class="flex-grow-1">
                <input v-model="newName" style="width: 100%" type="text" class="form-control" />
            </div>

            <button v-if="!editing && !configStore.loading" class="btn btn-primary mt-3" @click="editName"> <!-- Utiliza mt-3 para añadir margen superior en pantallas pequeñas -->
                <font-awesome-icon icon="fa-solid fa-pen" class="text-white" />
            </button>
            <button v-if="editing" class="btn btn-primary mt-3" @click="saveName"> <!-- Utiliza mt-3 para añadir margen superior en pantallas pequeñas -->
                <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-white" />
            </button>
            <Spinner v-if="configStore.loading" />
        </div>
    </div>
</div>

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

let editing = ref(false);
function editName() {
    editing.value = !editing.value;
}

function saveName() {
    //Dejar de editar
    editing.value = false;
    authController.updateUserName(newName.value);
}
</script>

<style scoped>
.img-user {
    width: 30rem;
    height: 30rem;
}

@media (max-width: 768px) {
    .camposPerfil {
        margin-top: 15%;
    }
}
</style>
