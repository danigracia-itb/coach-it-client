<template>
    <input type="number" class="form-control text-center"
        v-model="weightModel"
        min="0" step="0.25" />

    <input type="number" class="form-control text-center"
        v-model="repsModel"
        min="0" step="1" />

    <input type="number" class="form-control text-center"
        v-model="rpeModel"
        min="0" max="10" step="0.5" />
</template>

<script setup>
import { computed } from 'vue';
const { set, target } = defineProps(["set", "target"]);

const weightModel = computed(() => target ? set.target_weight : set.actual_weight);
const repsModel = computed(() => target ? set.target_reps : set.actual_reps);
const rpeModel = computed(() => target ? set.target_rpe : set.actual_rpe);
</script>
