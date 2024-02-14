<template>
    <Spinner v-if="configStore.loading" class="mx-auto mt-5" />

    <section class="mt-5" v-else>
        <div class="d-flex justify-content-start mb-3" v-if="authStore.is_coach">
            <button class="btn btn-primary" @click="router.push(`/coach/athlete/${athleteId}`)">
                <font-awesome-icon icon="fa-solid fa-left-long" />
            </button>
        </div>

        <header v-if="!editing">
            <h1 class="text-center">Add Training Recovery Assessment Computed</h1>
            <p class="text-primary text-center fw-bold">{{ tracDate }}</p>
        </header>

        <header v-else>

            <h1 class="text-center">Edit Training Recovery Assessment Computed</h1>
            <p class="text-primary text-center fw-bold">Edit {{ tracDate }}</p>
        </header>

        <form class="mt-5" novalidate @submit.prevent="saveTrac()">
            <!-- Soreness -->
            <fieldset class="mb-5">
                <legend class="text-uppercase">
                    <h4 class="fw-bold">Soreness</h4>
                </legend>
                <div class="mb-3 row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="leg_soreness"
                        >Leg Soreness:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.leg_soreness"
                            class="form-select"
                            :class="errors.leg_soreness ? 'is-invalid' : ''"
                            name="leg_soreness"
                            id="leg_soreness"
                            required
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.sorenessLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div
                            v-if="errors.leg_soreness"
                            class="invalid-feedback"
                        >
                            {{ errors.leg_soreness }}
                        </div>
                    </div>
                </div>
                <div class="mb-3 row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="push_soreness"
                        >Push Soreness:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.push_soreness"
                            class="form-select"
                            :class="errors.push_soreness ? 'is-invalid' : ''"
                            name="push_soreness"
                            id="push_soreness"
                            required
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.sorenessLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div
                            v-if="errors.push_soreness"
                            class="invalid-feedback"
                        >
                            {{ errors.push_soreness }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="pull_soreness"
                        >Pull Soreness:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.pull_soreness"
                            class="form-select"
                            :class="errors.pull_soreness ? 'is-invalid' : ''"
                            name="pull_soreness"
                            id="pull_soreness"
                            required
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.sorenessLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div
                            v-if="errors.pull_soreness"
                            class="invalid-feedback"
                        >
                            {{ errors.pull_soreness }}
                        </div>
                    </div>
                </div>
            </fieldset>

            <!-- Sleep / recovery -->
            <fieldset class="mb-5">
                <legend class="text-uppercase">
                    <h4 class="fw-bold">Recovery</h4>
                </legend>
                <div class="mb-3 row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="sleep_nutrition"
                        >Sleep/Nutrition:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.sleep_nutrition"
                            class="form-select"
                            :class="errors.sleep_nutrition ? 'is-invalid' : ''"
                            name="sleep_nutrition"
                            id="sleep_nutrition"
                            required
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.sleepAndNutritionLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div
                            v-if="errors.sleep_nutrition"
                            class="invalid-feedback"
                        >
                            {{ errors.sleep_nutrition }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="recovery"
                        >Parceived Recovery:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.recovery"
                            class="form-select"
                            :class="errors.recovery ? 'is-invalid' : ''"
                            name="recovery"
                            id="recovery"
                            required
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.recoveryLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div v-if="errors.recovery" class="invalid-feedback">
                            {{ errors.recovery }}
                        </div>
                    </div>
                </div>
            </fieldset>

            <!-- AFTER WORKOUT -->
            <fieldset class="mb-5">
                <legend class="text-uppercase">
                    <h4 class="fw-bold">After a workout day</h4>
                </legend>
                <div class="mb-3 row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="motivation"
                        >Motivation:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.motivation"
                            class="form-select"
                            :class="errors.motivation ? 'is-invalid' : ''"
                            name="motivation"
                            id="motivation"
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.motivationLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div v-if="errors.motivation" class="invalid-feedback">
                            {{ errors.motivation }}
                        </div>
                    </div>
                </div>
                <div class="row">
                    <label
                        class="form-label col-md-3 col-form-label"
                        for="technical_comfort"
                        >Technical Comfort:</label
                    >
                    <div class="col-md-9">
                        <select
                            v-model="data.technical_comfort"
                            class="form-select"
                            :class="
                                errors.technical_comfort ? 'is-invalid' : ''
                            "
                            name="technical_comfort"
                            id="technical_comfort"
                        >
                            <option value="" disabled selected>
                                -- Select --
                            </option>
                            <option
                                :value="key"
                                v-for="(
                                    option, key
                                ) in tracOptions.technicalComfortLevels"
                                :key="key"
                            >
                                {{ option }}
                            </option>
                        </select>
                        <div
                            v-if="errors.technical_comfort"
                            class="invalid-feedback"
                        >
                            {{ errors.technical_comfort }}
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset class="mb-5">
                <legend class="text-uppercase">
                    <h4 class="fw-bold">Notes</h4>
                </legend>
                <div>
                    <textarea
                        v-model="data.notes"
                        rows="4"
                        class="form-control"
                        :class="errors.notes ? 'is-invalid' : ''"
                        name="notes"
                        id="notes"
                    ></textarea>
                    <div v-if="errors.notes" class="invalid-feedback">
                        {{ errors.notes }}
                    </div>
                </div>
            </fieldset>

            <button type="submit" class="btn btn-success w-100">
                {{ editing ? "Update Trac" : "Add Trac" }}
            </button>
        </form>
    </section>
</template>

<script setup>
import { onMounted, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { tracOptions } from "../../functions/const";
import { useToast } from "vue-toast-notification";
import axiosClient from "../../config/axios";

import Spinner from "../../components/utils/Spinner.vue";

import useConfigStore from "../../stores/useConfigStore";
import useAuthStore from "../../stores/useAuthStore";
import useAthleteStore from "../../stores/useAthleteStore";
import useCoachStore from "../../stores/useCoachStore";

const authStore = useAuthStore();
const configStore = useConfigStore();
const athleteStore = useAthleteStore();
const coachStore = useCoachStore();

const route = useRoute();
const router = useRouter();

const tracDate = ref(route.query.date ?? null);

const tracId = route.params.trac_id;
const athleteId = route.params.id;

const editing = ref(route.params.trac_id ? true : false);

const data = reactive({
    leg_soreness: "",
    push_soreness: "",
    pull_soreness: "",
    sleep_nutrition: "",
    recovery: "",
    motivation: "",
    technical_comfort: "",
    notes: "",
});

// Objeto para almacenar los errores
const errors = reactive({
    leg_soreness: "",
    push_soreness: "",
    pull_soreness: "",
    sleep_nutrition: "",
    recovery: "",
    motivation: "",
    technical_comfort: "",
    notes: "",
});

function validateTrac() {
    const fields = [
        "leg_soreness",
        "push_soreness",
        "pull_soreness",
        "sleep_nutrition",
        "recovery",
    ];

    for (const field of fields) {
        if (!data[field] || data[field] === "" || isNaN(data[field])) {
            // Si hay un error, asigna un mensaje de error apropiado al campo correspondiente
            errors[field] = `The ${field.replace("_", " ")} field is required.`;
        } else if (data[field] < 1 || data[field] > 5) {
            errors[field] = `The ${field.replace(
                "_",
                " "
            )} field must be between 1 and 5`;
        } else {
            // Si no hay error, borra cualquier mensaje de error previo
            errors[field] = "";
        }
    }

    // Retorna los errores encontrados
    return errors;
}

async function getTrac() {
    configStore.setLoading(true);
    try {
        const response = await axiosClient.get("trac/" + tracId);
        tracDate.value = response.data.date;

        for (const key in response.data) {
            data[key] = response.data[key];
        }
    } catch (error) {
        console.log(error);
    }
    configStore.setLoading(false);
}

async function saveTrac() {
    validateTrac();
    configStore.setLoading(true);

    //api
    try {
        if (editing.value) {
            await axiosClient.put("trac/" + tracId, {
                ...data,
            });
        } else {
            const response = await axiosClient.post("trac", {
                user_id: athleteId ?? authStore.id,
                date: tracDate.value,
                ...data,
            });

            if (authStore.is_coach) {
                coachStore.addTrac(response.data);
            } else {
                athleteStore.addTrac(response.data);
            }
        }

        configStore.setLoading(false);
        router.back();
    } catch (e) {
        configStore.setLoading(false);
        if (e.response.data.errors) {
            for (const key in e.response.data.errors) {
                errors[`${key}`] = e.response.data.errors[key][0];
            }
        } else {
            return useToast().error(
                "Server Error: Changes have not been saved.",
                { position: "top" }
            );
        }
    }
}

onMounted(() => {
    if (editing.value) {
        getTrac();
    }
});
</script>