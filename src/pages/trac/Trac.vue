<template>
    <h1 class="mt-5 text-center">Add Trac</h1>
    <form class="mt-5">
        <!-- Soreness -->
        <fieldset class="mb-5">
            <legend class="text-uppercase">
                <h4 class="fw-bold">Soreness</h4>
            </legend>
            <div class="mb-3 row">
                <label
                    class="form-label col-md-3 col-form-label col-md-3 col-form-label col-md-3 col-form-label"
                    for="leg_soreness"
                    >Leg Soreness:</label
                >
                <div class="col-md-9">
                    <select
                        class="form-select"
                        name="leg_soreness"
                        id="leg_soreness"
                        required
                    >
                        <option value="" disabled selected>-- Select --</option>
                        <option
                            :value="key"
                            v-for="(option, key) in tracOptions.sorenessLevels"
                            :key="key"
                        >
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="mb-3 row">
                <label
                    class="form-label col-md-3 col-form-label col-md-3 col-form-label col-md-3 col-form-label"
                    for="push_soreness"
                    >Push Soreness:</label
                >
                <div class="col-md-9">
                    <select
                        class="form-select"
                        name="push_soreness"
                        id="push_soreness"
                        required
                    >
                        <option value="" disabled selected>-- Select --</option>
                        <option
                            :value="key"
                            v-for="(option, key) in tracOptions.sorenessLevels"
                            :key="key"
                        >
                            {{ option }}
                        </option>
                    </select>
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
                        class="form-select"
                        name="pull_soreness"
                        id="pull_soreness"
                        required
                    >
                        <option value="" disabled selected>-- Select --</option>
                        <option
                            :value="key"
                            v-for="(option, key) in tracOptions.sorenessLevels"
                            :key="key"
                        >
                            {{ option }}
                        </option>
                    </select>
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
                        class="form-select"
                        name="sleep_nutrition"
                        id="sleep_nutrition"
                        required
                    >
                        <option value="" disabled selected>-- Select --</option>
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
                </div>
            </div>

            <div class="row">
                <label class="form-label col-md-3 col-form-label" for="recovery"
                    >Parceived Recovery:</label
                >
                <div class="col-md-9">
                    <select
                        class="form-select"
                        name="recovery"
                        id="recovery"
                        required
                    >
                        <option value="" disabled selected>-- Select --</option>
                        <option
                            :value="key"
                            v-for="(option, key) in tracOptions.recoveryLevels"
                            :key="key"
                        >
                            {{ option }}
                        </option>
                    </select>
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
                        class="form-select"
                        name="motivation"
                        id="motivation"
                    >
                        <option value="" disabled selected>-- Select --</option>
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
                        class="form-select"
                        name="technical_comfort"
                        id="technical_comfort"
                    >
                        <option value="" disabled selected>-- Select --</option>
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
                </div>
            </div>
        </fieldset>

        <fieldset class="mb-5">
            <legend class="text-uppercase">
                <h4 class="fw-bold">Notes</h4>
            </legend>
            <div>
                <textarea
                    rows="4"
                    class="form-control"
                    name="notes"
                    id="notes"
                ></textarea>
            </div>
        </fieldset>

        <button type="submit" class="btn btn-success w-100">Add Trac</button>
    </form>
</template>

<script setup>
import { tracOptions } from "../../functions/const";
</script>