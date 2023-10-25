<template>
    <div class="container-auth">
        <div class="imagen-izquierda">
            <img src="tu-imagen.jpg" alt="Descripción de la imagen">
        </div>
        <div class="contenido-derecha">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.container-auth {
    display: grid;
    grid-template-columns: 3fr 2fr;
}

.imagen-izquierda {
    flex: 1;
}

.imagen-izquierda img {
    max-width: 100%;
    height: auto;
    display: block;
}

.contenido-derecha {
    flex: 2;
    padding: 20px;
}

</style>