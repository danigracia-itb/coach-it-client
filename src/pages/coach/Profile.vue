<template>
    <div class="container text-center">
        <!-- Contenedor principal -->
        <p class="mt-3 display-3 fw-bold">Profile</p>
        <div class="row justify-content-center">
            <!-- Centra el contenido horizontalmente -->
            <div class="align-bottom text-center col-4">
                <img
                    class="img-user rounded-circle"
                    :src="`${backendUrl}/${authStore.picture}`"
                />
                <input
                    type="file"
                    id="seleccionArchivos"
                    accept="image/*"
                    @change="handleFileChange"
                    style="display: none"
                />
                <button
                    class="align-bottom bg-transparent border-0"
                    @click="openFilePicker"
                >
                    <font-awesome-icon
                        class="text-primary"
                        icon="fa-solid fa-arrow-up-from-bracket"
                        size="xl"
                    />
                </button>
            </div>

            <div
                class="d-flex gap-3 align-items-center justify-content-between camposPerfil col-8 align-items-center"
            >
                <p class="fw-bold">Name</p>
                <!-- <p class="fw-bold">Change password</p> -->
                <div v-if="!editing" class="flex-grow-1">
                    <p class="text-start">{{ authStore.name }}</p>
                </div>
                <div v-else class="flex-grow-1">
                    <input
                        v-model="newName"
                        style="width: 100%"
                        type="text"
                        class="form-control"
                    />
                </div>

                <button
                    v-if="!editing && !configStore.loading"
                    class="btn btn-primary ms-3"
                    @click="editName"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-pen"
                        class="text-white"
                    />
                </button>
                <button
                    v-if="editing"
                    class="btn btn-primary ms-3"
                    @click="saveName"
                >
                    <font-awesome-icon
                        icon="fa-solid fa-floppy-disk"
                        class="text-white"
                    />
                </button>
                <Spinner v-if="configStore.loading" />
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
                formData,
            );
            authStore.setUser(response.data)
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
