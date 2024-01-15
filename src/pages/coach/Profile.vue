<template>
    <div class="row bg-danger">
        <div class="col-4 align-bottom">
            <img class="img-user rounded-circle" :src="user.picture">
            <button @click="uploadFileButton" class="align-bottom style-button"><font-awesome-icon class="text-primary" icon="fa-solid fa-arrow-up-from-bracket" size="2xl" /></button>
        </div>
        <div class="col-8 bg-warning">
            <p>{{ user.name }}</p>
            <input type="text" value>
            <RouterLink to="/request-password-recover">
                <font-awesome-icon icon="fa-solid fa-key" size="2xl" />
            </RouterLink>
            <p>a</p>
        </div>
    </div>
</template>

<script setup>
import {getUser} from "../../functions/helpers"
import {ref, onMounted} from "vue"
const user = ref({})
onMounted(() => {
    user.value = getUser()
})
/*función para que el boton te haga console.log cuando hagas click*/
function uploadFileButton(){
    console.log("subir archivo")
} 
</script>

<style scoped>
.img-user{
    width: 25rem;
    height: 25rem;
}
.style-button{
    border: none;
    background-color: transparent;
    outline: none;
}
</style>