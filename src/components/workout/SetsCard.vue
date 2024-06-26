<template>
    <!-- Desktop -->
    <div class="d-none d-md-block">
        <!-- Sets header -->
        <section class="set-headers-group" v-if="exercise.sets.length > 0">
            <section class="text-center bg-light set-header-target">
                <div class="fw-normal">TARGET</div>
                <hr class="border border-1 border-black w-100" />
                <div class="set-labels">
                    <div class="fw-normal cursor-pointer">
                        WEIGHT
                        <font-awesome-icon
                            v-tooltip="'WEIGHT: number of KG used in the set'"
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                    <div class="fw-normal cursor-pointer">
                        REPS
                        <font-awesome-icon
                            v-tooltip="
                                'REPS: number of repetitions that should be performed in the set'
                            "
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                    <div class="fw-normal cursor-pointer">
                        RPE
                        <font-awesome-icon
                            v-tooltip="
                                'RPE: effort level for the set, on a scale of 1 to 10'
                            "
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                </div>
            </section>

            <section class="text-center bg-white set-header-actual">
                <div class="fw-normal">ACTUAL</div>
                <hr class="border border-1 border-black w-100" />
                <div class="set-labels">
                    <div class="fw-normal cursor-pointer">
                        WEIGHT
                        <font-awesome-icon
                            v-tooltip="'WEIGHT: number of KG used in the set'"
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                    <div class="fw-normal cursor-pointer">
                        REPS
                        <font-awesome-icon
                            v-tooltip="
                                'REPS: number of repetitions that should be performed in the set'
                            "
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                    <div class="fw-normal cursor-pointer">
                        RPE
                        <font-awesome-icon
                            v-tooltip="
                                'RPE: effort level for the set, on a scale of 1 to 10'
                            "
                            icon="fa-regular fa-circle-question"
                            class="fa-s"
                        />
                    </div>
                </div>
            </section>
        </section>

        <!-- Sets list -->
        <ol
            v-if="exercise.sets.length > 0"
            class="my-3 text-unstyled p-0 border rounded"
        >
            <li
                v-for="(set, index) in exercise.sets"
                :key="set.id"
                class="d-flex bg-white border-bottom"
            >
                <!-- Set Number -->
                <p
                    class="set-number bg-dark d-flex align-items-center justify-content-center mb-0 text-white"
                >
                    {{ index + 1 }}
                </p>

                <!-- Set content -->
                <div class="p-3 w-100 d-flex gap-2 bg-light border-end">
                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.target_weight"
                        min="0"
                        step="0.25"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />

                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.target_reps"
                        min="0"
                        step="1"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />

                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.target_rpe"
                        min="0"
                        max="10"
                        step="0.5"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />
                </div>

                <button
                    class="btn btn-primary rounded-0"
                    @click="copyToActual(set)"
                >
                    <font-awesome-icon icon="fa-solid fa-arrow-right" />
                </button>

                <div class="p-3 w-100 d-flex gap-2">
                    <!-- ACTUAL -->
                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.actual_weight"
                        min="0"
                        step="0.25"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />

                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.actual_reps"
                        min="0"
                        step="1"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />

                    <input
                        type="number"
                        class="form-control text-center"
                        v-model="set.actual_rpe"
                        min="0"
                        max="10"
                        step="0.5"
                        onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                    />
                </div>

                <button
                    class="btn btn-danger mx-2 my-3 text-white"
                    @click="() => deleteSet(exercise.exercise_id, set.id)"
                >
                    <font-awesome-icon icon="fa-solid fa-trash" />
                </button>

                <button
                    class="btn btn-primary rounded-0"
                    :disabled="index + 1 == exercise.sets.length"
                    @click="copyToNextSet(exercise, index, set)"
                >
                    <font-awesome-icon icon="fa-solid fa-arrow-down" />
                </button>
            </li>
        </ol>
    </div>

    <!-- Mobile -->
    <div class="d-block d-md-none">
        <ul class="nav nav-tabs border-1 border-black nav-fill">
            <li class="nav-item">
                <button
                    class="nav-link"
                    :class="curretTabTarget ? 'active' : ''"
                    @click="tagToggle(true)"
                >
                    Target
                </button>
            </li>
            <li class="nav-item">
                <button
                    class="nav-link"
                    :class="curretTabTarget ? '' : 'active'"
                    @click="tagToggle(false)"
                >
                    Actual
                </button>
            </li>
        </ul>

        <div>
            <div class="set-labels mt-2">
                <div class="fw-normal cursor-pointer">
                    WEIGHT
                    <font-awesome-icon
                        v-tooltip="'WEIGHT: number of KG used in the set'"
                        icon="fa-regular fa-circle-question"
                        class="fa-s"
                    />
                </div>
                <div class="fw-normal cursor-pointer">
                    REPS
                    <font-awesome-icon
                        v-tooltip="
                            'REPS: number of repetitions that should be performed in the set'
                        "
                        icon="fa-regular fa-circle-question"
                        class="fa-s"
                    />
                </div>
                <div class="fw-normal cursor-pointer">
                    RPE
                    <font-awesome-icon
                        v-tooltip="
                            'RPE: effort level for the set, on a scale of 1 to 10'
                        "
                        icon="fa-regular fa-circle-question"
                        class="fa-s"
                    />
                </div>
            </div>

            <!-- Sets list -->
            <ol
                v-if="exercise.sets.length > 0"
                class="my-3 text-unstyled p-0 border rounded"
            >
                <li
                    v-for="(set, index) in exercise.sets"
                    :key="set.id"
                    class="d-flex bg-white border-bottom"
                >
                    <!-- Set Number -->
                    <p
                        class="set-number bg-dark d-flex align-items-center justify-content-center mb-0 text-white"
                    >
                        {{ index + 1 }}
                    </p>

                    <!-- Target view -->
                    <div
                        class="set-grid-mobile p-3 w-100 bg-light border-end"
                        :class="curretTabTarget ? 'd-grid' : 'd-none'"
                    >
                        <!-- Set content -->
                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.target_weight"
                            min="0"
                            step="0.25"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.target_reps"
                            min="0"
                            step="1"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.target_rpe"
                            min="0"
                            max="10"
                            step="0.5"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <button
                            class="btn btn-primary rounded-0"
                            @click="copyToActual(set)"
                        >
                            <font-awesome-icon icon="fa-solid fa-arrow-right" />
                        </button>
                    </div>

                    <!-- Actual view -->
                    <div
                        class="set-grid-mobile w-100 p-3"
                        :class="curretTabTarget ? 'd-none' : 'd-grid'"
                    >
                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.actual_weight"
                            min="0"
                            step="0.25"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.actual_reps"
                            min="0"
                            step="1"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <input
                            type="number"
                            class="form-control text-center"
                            v-model="set.actual_rpe"
                            min="0"
                            max="10"
                            step="0.5"
                            onkeypress='return event.charCode == 46 || (event.charCode >= 48 && event.charCode <= 57)'
                        />

                        <button
                            class="btn btn-danger text-white"
                            @click="
                                () => deleteSet(exercise.exercise_id, set.id)
                            "
                        >
                            <font-awesome-icon icon="fa-solid fa-trash" />
                        </button>
                    </div>

                    <button
                        class="btn btn-primary rounded-0"
                        :disabled="index + 1 == exercise.sets.length"
                        @click="copyToNextSet(exercise, index, set)"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-down" />
                    </button>
                </li>
            </ol>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const { exercise, copyToNextSet, deleteSet, copyToActual } = defineProps([
    "exercise",
    "copyToNextSet",
    "deleteSet",
    "copyToActual",
]);

const curretTabTarget = ref(true);
function tagToggle(value) {
    curretTabTarget.value = value;
}
</script>

<style scoped>
.set-headers-group {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.set-headers-group section {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.set-header-target {
    padding: 0 5rem 0 6rem !important;
}

.set-header-actual {
    padding: 0 10rem 0 2rem !important;
}

.set-labels {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    text-align: center;
}

.set-super-header {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
.set-header {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin: 0 6rem 0 3.5rem;
}
.set-number {
    width: 5rem;
}

@media (min-width: 768px) {
    .set-number {
        width: 10rem;
    }
}

.set-grid-mobile {
    display: grid;
    gap: 0.75rem;
    grid-template-columns: 2fr 2fr 2fr 1fr;
}
</style>
