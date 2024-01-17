<template>
    <div class="row">
      <div class="col-4 align-bottom">
        <img class="img-user rounded-circle" :src="imagenPrevisualizacion || user.picture" />
        <input type="file" id="seleccionArchivos" accept="image/*" @change="handleFileChange" style="display: none" />
        <button class="align-bottom style-button" @click="openFilePicker">
          <font-awesome-icon
            class="text-primary"
            icon="fa-solid fa-arrow-up-from-bracket"
            size="2xl"
          />
        </button>
      </div>
      <div class="col-8">
        <p v-if="!editName">{{ user.name }}</p>
        <input v-if="editName" type="text" name="" id="">
        <font-awesome-icon icon="fa-solid fa-pen" size="2xl" class="pen"/>
        <p>
          Recuperar contraseña:
          <RouterLink to="/request-password-recover">
            <font-awesome-icon icon="fa-solid fa-key" size="2xl" />
          </RouterLink>
        </p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { getUser } from "../../functions/helpers";
  import { ref, onMounted } from "vue";
  
  const user = ref({});
  const selectedFile = ref(null);
  const imagenPrevisualizacion = ref("");
  
  onMounted(() => {
    user.value = getUser();
  });
  
  function handleFileChange(event) {
    // Obtener el archivo seleccionado
    selectedFile.value = event.target.files[0];
  
    if (selectedFile.value) {
      // Crear un objeto URL para la previsualización
      imagenPrevisualizacion.value = URL.createObjectURL(selectedFile.value);
    } else {
      // Limpiar la previsualización si no hay archivo seleccionado
      imagenPrevisualizacion.value = "";
    }
  }
  
  function openFilePicker() {
    // Abrir el selector de archivos al hacer clic en el ícono
    document.getElementById("seleccionArchivos").click();
  }
  
  let coachName = ref(false);
  function editName(){
    
  }

  </script>
  
  <style scoped>
  .img-user {
    width: 25rem;
    height: 25rem;
  }
  
  .style-button {
    border: none;
    background-color: transparent;
    outline: none;
  }
  .pen{
    color: #711bba;
  }
  </style>
  