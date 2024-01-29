<template>
  <div class="row container">
    <p class="text-center display-3 fw-bold">Profile</p>
    <div class="col-lg-6 align-bottom text-center">
      <img
        class="img-user rounded-circle"
        :src="imagenPrevisualizacion || user.picture"
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
    <div class="col-lg-6 row align-items-center camposPerfil">
      <p class="fw-bold">Name</p>
      <div class="d-inline-flex align-items-center" v-if="!coachName">
        <span class="flex-grow-1">{{ user.name }}</span>
      </div>
      <div v-else>
        <input
          v-model="namePerfil"
          style="width: 50%"
          type="text"
          class="form-control"
        />
      </div>
      <button
        class="bg-transparent border-0 ms-3"
        style="width: 20%"
        @click="editName"
      >
        <font-awesome-icon
          icon="fa-solid fa-pen"
          size="xl"
          class="text-primary"
        />
      </button>
      <div class="d-flex flex-column ms-3">
        <p>
          Recover password
          <RouterLink to="/request-password-recover">
            <font-awesome-icon icon="fa-solid fa-key" size="xl" />
          </RouterLink>
        </p>
        <button class="btn btn-primary mt-2" @click="saveChanges">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getUser } from "../../functions/helpers";
import { ref, onMounted } from "vue";

const user = ref({});
const selectedFile = ref(null);
const imagenPrevisualizacion = ref("");
const namePerfil = ref("");

onMounted(() => {
  user.value = getUser();
  namePerfil.value = user.value.name; // Asignar el valor inicial de user.name a namePerfil
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

let coachName = ref(false);
function editName() {
  coachName.value = !coachName.value;
}

function saveChanges() {
  if (coachName.value) {
    // Si el campo de edición de nombre está visible, actualiza el nombre del usuario
    user.value.name = namePerfil.value;
    coachName.value = false; // Cambia el estado de coachName a falso para cambiar el input a span
  }
  console.log("Nuevo nombre:", user.value.name); // Imprimir nuevo nombre en la consola
}
</script>

<style scoped>
.container {
  margin-top: 18%;
}

.img-user {
  width: 25rem;
  height: 25rem;
}

@media (max-width: 768px) {
  .camposPerfil {
    margin-top: 15%;
  }
}
</style>
