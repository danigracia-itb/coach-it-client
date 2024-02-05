<template>
  <div class="container text-center"> <!-- Contenedor principal -->
    <p class="mt-3 display-3 fw-bold">Profile</p>
    <div class="row justify-content-center"> <!-- Centra el contenido horizontalmente -->
      <div class="align-bottom text-center col-4">
        <img class="img-user rounded-circle" :src="imagenPrevisualizacion || user.picture" />
        <input type="file" id="seleccionArchivos" accept="image/*" @change="handleFileChange" style="display: none" />
        <button class="align-bottom bg-transparent border-0" @click="openFilePicker">
          <font-awesome-icon class="text-primary" icon="fa-solid fa-arrow-up-from-bracket" size="xl" />
        </button>
      </div>



      
      
      
      <div class="d-flex gap-3 align-items-center justify-content-between camposPerfil col-8 align-items-center">
          <p class="fw-bold">Name</p>
          <!-- <p class="fw-bold">Change password</p> -->
          <div v-if="!editing" class="flex-grow-1">
              <p class="text-start">{{ namePerfil }}</p>
            </div>
            <div v-else class="flex-grow-1">
              <input v-model="namePerfil" style="width: 100%;" type="text" class="form-control" />
            </div>

          <button v-if="!editing && !loading" class="btn btn-primary ms-3" @click="editName">
              <font-awesome-icon icon="fa-solid fa-pen" class="text-white" />
            </button>
            <button v-if="editing" class="btn btn-primary ms-3" @click="saveName">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" class="text-white" />
            </button>
            <Spinner v-if="loading" />
      </div>

      <!-- <RouterLink to="/request-password-recover" class="btn btn-primary flex-grow-1">
              <font-awesome-icon icon="fa-solid fa-key" />
            </RouterLink> -->
      
      <!-- <div class="row camposPerfil col-6 align-items-center">
        <div class="col-12">
          <div class="mb-3 d-flex align-items-center">
            <p class="fw-bold">Name</p>
            <div v-if="!editing" class="flex-grow-1">
              <span>{{ namePerfil }}</span>
            </div>
            <div v-else class="flex-grow-1">
              <input v-model="namePerfil" style="width: 100%;" type="text" class="form-control" />
            </div>
            <button v-if="!editing && !loading" class="bg-transparent border-0 ms-3" @click="editName">
              <font-awesome-icon icon="fa-solid fa-pen" size="xl" class="text-primary" />
            </button>
            <button v-if="editing" class="bg-transparent border-0 ms-3" @click="saveName">
              <font-awesome-icon icon="fa-solid fa-floppy-disk" size="xl" class="text-primary" />
            </button>
            <Spinner v-if="loading" />
          </div>
          <div class="mb-3 d-flex align-items-center">
            <p class="fw-bold">Change password</p>
            <RouterLink to="/request-password-recover" class="flex-grow-1">
              <font-awesome-icon icon="fa-solid fa-key" size="xl" />
            </RouterLink>
          </div>
        </div>
      </div> -->
      
      
      
      
      
      
    </div>
  </div>
</template>

<script setup>
import { getUser } from "../../functions/helpers";
import { ref, onMounted } from "vue";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const user = ref({});
const selectedFile = ref(null);
const imagenPrevisualizacion = ref("");
const namePerfil = ref("");

onMounted(() => {
  user.value = getUser();
  namePerfil.value = user.value.name;
});

function handleFileChange(event) {
  selectedFile.value = event.target.files[0];
  if (selectedFile.value) {
    imagenPrevisualizacion.value = URL.createObjectURL(selectedFile.value);
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

const loading = ref(false);
async function saveName() {
  editName()
  console.log(namePerfil.value)

  loading.value = true;

  const response = await axiosClient.put("users/change-name/" + user.value.id, {
    name: namePerfil.value
  })
  loading.value = false;

  localStorage.removeItem("user")
  localStorage.setItem("user", JSON.stringify({
    ...user.value,
    name: namePerfil.value
  }))

  console.log(response)
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
