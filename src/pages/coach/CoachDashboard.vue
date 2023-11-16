<template>
    <div class="vh-100 overflow-hidden">
        <header>
        <img width="250" class="mx-auto" src="../../assets/logo.png" alt="logo">
    </header>
    <div class="row h-100">
        <CoachMenu></CoachMenu>
        <div class="col-10">
            <p>col 9</p>
        </div>
    </div>
    </div>

</template>

<script setup>
    import CoachMenu from '../../components/coach/CoachMenu.vue'
</script>

<style scoped>
header {
    background-color: #DBDEE2;
}
</style>