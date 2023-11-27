<template>
    <div
        class="card"
        :class="exercise.is_default ? 'bg-light' : 'bg-primary text-white card-nodefault'"
    >
        <div
            class="p-3 d-flex flex-row justify-content-between align-items-center"
        >
            <p class="fw-bold mb-0">{{ exercise.name }}</p>

            <button class="delete-btn btn btn-danger" v-if="!exercise.is_default">
                <font-awesome-icon icon="fa-solid fa-trash" />
            </button>
            <p class="mb-0" v-else>Default</p>
        </div>
    </div>
</template>

<script setup>
const { exercise } = defineProps(["exercise"]);
</script>

<style>
.card-nodefault {
    transition: all ease-in-out .4s;
}
.card-nodefault:hover {
    background-color: black !important;
    transition: all ease-in-out .4s;
}

.card-nodefault:hover .delete-btn {
    opacity: 1;
    transition: all ease-in-out .4s;
}
.delete-btn {
    opacity: 0;
    transition: all ease-in-out .4s;
}
</style>
