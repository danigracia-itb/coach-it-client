<template>
    <div
        class="p-3 bg-form text-white full-screen d-flex justify-content-center align-items-center"
    >
        <form
            :class="{ 'form-error': showError }"
            class="form-quest p-5 px-5 border rounded-5 bg-white text-center"
        >
            <img
                class="auth-logo-img mx-auto"
                src="../../../public/assets/logo.png"
                alt=""
            />

            <!-- Page 1 -->
            <fieldset
                v-if="currentPage === 1 && !loading"
                class="form-page d-flex flex-column justify-content-between"
            >
                <div>
                    <div class="form-group mt-5">
                        <label for="date" class="text-center text-black"
                            >Date of Birth</label
                        >
                        <input
                            type="date"
                            id="date"
                            class="form-control"
                            :class="errors.date_birth ? 'is-invalid' : ''"
                            placeholder="Introduce your birthday"
                            required
                            v-model="date_birth"
                            :max="maxDate"
                        />

                        <div v-if="errors.date_birth" class="invalid-feedback">
                            {{ errors.date_birth }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label for="height" class="text-black"
                            >Introduce your Height (cm)</label
                        >
                        <input
                            type="number"
                            id="height"
                            class="form-control"
                            :class="errors.height ? 'is-invalid' : ''"
                            placeholder="Introduce your Height"
                            required
                            min="50"
                            v-model="height"
                        />
                        <div v-if="errors.height" class="invalid-feedback">
                            {{ errors.height }}
                        </div>
                    </div>
                </div>

                <div
                    class="mt-5 d-flex gap-2 align-items-center justify-content-center"
                >
                    <p
                        class="bg-light py-1 px-2 rounded text-black border border-2 mb-0"
                    >
                        {{ currentPage }}/{{ totalPages }}
                    </p>
                    <button
                        @click.prevent="validatePage(1)"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </button>
                </div>
            </fieldset>

            <!-- Page 2 -->
            <fieldset
                v-if="currentPage === 2 && !loading"
                class="form-page d-flex flex-column justify-content-between"
            >
                <div>
                    <div class="form-group mt-5">
                        <label for="timeTraining" class="text-black 16px"
                            >How long have you been training?</label
                        >
                        <select
                            id="timeTraining"
                            class="form-control"
                            :class="errors.time_training ? 'is-invalid' : ''"
                            required
                            v-model="time_training"
                        >
                            <option value="0 - 6 months">0 - 6 months</option>
                            <option value="6 months - 1 year">
                                6 months - 1 year
                            </option>
                            <option value="1 - 2 years">1 - 2 years</option>
                            <option value="+2 years">+2 years</option>
                        </select>
                        <div
                            v-if="errors.time_training"
                            class="invalid-feedback"
                        >
                            {{ errors.time_training }}
                        </div>
                    </div>

                    <div class="form-group mt-5">
                        <label class="text-black"
                            >Amount of time available for training</label
                        >
                        <input
                            type="time"
                            class="form-control"
                            :class="
                                errors.train_available_time ? 'is-invalid' : ''
                            "
                            placeholder="Enter time available"
                            requiered
                            v-model="train_available_time"
                        />
                        <div
                            v-if="errors.train_available_time"
                            class="invalid-feedback"
                        >
                            {{ errors.train_available_time }}
                        </div>
                    </div>

                    <div class="form-group mt-5 text-black">
                        <label class="text-black"
                            >Days available for training</label
                        ><br />
                        <table
                            class="table mt-3 text-center"
                            :class="
                                errors.train_available_days
                                    ? 'table-bordered border-danger'
                                    : ''
                            "
                        >
                            <thead>
                                <tr>
                                    <th class="fw-normal">Mon</th>
                                    <th class="fw-normal">Tue</th>
                                    <th class="fw-normal">Wed</th>
                                    <th class="fw-normal">Thu</th>
                                    <th class="fw-normal">Fri</th>
                                    <th class="fw-normal">Sat</th>
                                    <th class="fw-normal">Sun</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="monday"
                                            name="day"
                                            value="Monday"
                                            v-model="
                                                train_available_days.monday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="tuesday"
                                            name="day"
                                            value="Tuesday"
                                            v-model="
                                                train_available_days.tuesday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="wednesday"
                                            name="day"
                                            value="Wednesday"
                                            v-model="
                                                train_available_days.wednesday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="thursday"
                                            name="day"
                                            value="Thursday"
                                            v-model="
                                                train_available_days.thursday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="friday"
                                            name="day"
                                            value="Friday"
                                            v-model="
                                                train_available_days.friday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="saturday"
                                            name="day"
                                            value="Saturday"
                                            v-model="
                                                train_available_days.saturday
                                            "
                                        />
                                    </td>
                                    <td>
                                        <input
                                            type="checkbox"
                                            id="sunday"
                                            name="day"
                                            value="Sunday"
                                            v-model="
                                                train_available_days.sunday
                                            "
                                        />
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                        <p
                            v-if="errors.train_available_days"
                            class="invalid-feedback d-block"
                        >
                            {{ errors.train_available_days }}
                        </p>
                    </div>
                </div>

                <div
                    class="mt-5 d-flex gap-2 align-items-center justify-content-center"
                >
                    <button
                        @click.prevent="previousPage()"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-left" />
                    </button>
                    <p
                        class="bg-light py-1 px-2 rounded text-black border border-2 mb-0"
                    >
                        {{ currentPage }}/{{ totalPages }}
                    </p>
                    <button
                        @click.prevent="validatePage(2)"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </button>
                </div>
            </fieldset>

            <!-- Page 3 -->
            <fieldset
                v-if="currentPage === 3 && !loading"
                class="form-page d-flex flex-column justify-content-between"
            >
                <div>
                    <div class="form-group">
                        <label for="favoriteExercises" class="text-black"
                            >Exercises Wishlist</label
                        >
                        <textarea
                            id="favoriteExercises"
                            class="form-control"
                            :class="
                                errors.wishlist_exercises ? 'is-invalid' : ''
                            "
                            placeholder="Enter the exercises you love"
                            required
                            v-model="wishlist_exercises"
                        ></textarea>
                        <div
                            v-if="errors.wishlist_exercises"
                            class="invalid-feedback"
                        >
                            {{ errors.wishlist_exercises }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="hatedExercises" class="text-black"
                            >Exercises Banlist</label
                        >
                        <textarea
                            id="hatedExercises"
                            class="form-control"
                            :class="
                                errors.banlist_exercises ? 'is-invalid' : ''
                            "
                            placeholder="Enter the exercises you dislike"
                            required
                            v-model="banlist_exercises"
                        ></textarea>
                        <div
                            v-if="errors.banlist_exercises"
                            class="invalid-feedback"
                        >
                            {{ errors.banlist_exercises }}
                        </div>
                    </div>
                </div>

                <div
                    class="mt-5 d-flex gap-2 align-items-center justify-content-center"
                >
                    <button
                        @click.prevent="previousPage()"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-left" />
                    </button>
                    <p
                        class="bg-light py-1 px-2 rounded text-black border border-2 mb-0"
                    >
                        {{ currentPage }}/{{ totalPages }}
                    </p>
                    <button
                        @click.prevent="validatePage(3)"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-right" />
                    </button>
                </div>
            </fieldset>

            <!-- Page 4 -->
            <fieldset
                v-if="currentPage === 4 && !loading"
                class="form-page d-flex flex-column justify-content-between"
            >
                <div>
                    <div class="form-group">
                        <label for="shortTermGoals" class="text-black"
                            >Short-Term Goals</label
                        >
                        <textarea
                            id="shortTermGoals"
                            class="form-control"
                            :class="errors.short_term_goals ? 'is-invalid' : ''"
                            placeholder="Enter your short-term goals"
                            requiered
                            v-model="short_term_goals"
                        ></textarea>
                        <div
                            v-if="errors.short_term_goals"
                            class="invalid-feedback"
                        >
                            {{ errors.short_term_goals }}
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="longTermGoals" class="text-black"
                            >Long-Term Goals</label
                        >
                        <textarea
                            id="longTermGoals"
                            class="form-control"
                            :class="errors.long_term_goals ? 'is-invalid' : ''"
                            placeholder="Enter your long-term goals"
                            requiered
                            v-model="long_term_goals"
                        ></textarea>
                        <div
                            v-if="errors.long_term_goals"
                            class="invalid-feedback"
                        >
                            {{ errors.long_term_goals }}
                        </div>
                    </div>
                </div>

                <div
                    class="mt-5 d-flex gap-2 align-items-center justify-content-center"
                >
                    <button
                        @click.prevent="previousPage()"
                        class="btn btn-primary"
                    >
                        <font-awesome-icon icon="fa-solid fa-arrow-left" />
                    </button>
                    <p
                        class="bg-light py-1 px-2 rounded text-black border border-2 mb-0"
                    >
                        {{ currentPage }}/{{ totalPages }}
                    </p>
                    <button
                        @click.prevent="validatePage(4)"
                        class="btn btn-primary"
                    >
                        Send
                    </button>
                </div>
            </fieldset>

            <div class="form-page" v-if="loading">
                <Spinner />
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import axiosClient from "../../config/axios";
import Spinner from "../../components/utils/Spinner.vue";

const router = useRouter();
const route = useRoute();

const loading = ref(false);

const currentPage = ref(1);
const totalPages = 4;

const errors = reactive({
    date_birth: "",
    height: "",
    time_training: "",
    train_available_time: "",
    train_available_days: "",
    wishlist_exercises: "",
    banlist_exercises: "",
    short_term_goals: "",
    long_term_goals: "",
});

/* Primera página */
const date_birth = ref("");
const height = ref("");

const maxDate = computed(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
});

/* Segunda página */
const time_training = ref("");
const train_available_time = ref("");
const train_available_days = reactive({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
});

/* Tercera página */
const wishlist_exercises = ref("");
const banlist_exercises = ref("");

/* Cuarta página */
const short_term_goals = ref("");
const long_term_goals = ref("");

/* CONTROL DE ERRORES */
function validatePage(num) {
    switch (num) {
        case 1:
            if (!date_birth.value) {
                errors.date_birth = "Date field is mandatory.";
            } else {
                errors.date_birth = "";
            }

            if (!height.value) {
                errors.height = "Height field is mandatory.";
            } else {
                errors.height = "";
            }

            if (
                errors.date_birth == "" &&
                errors.height == ""
            ) {
                nextPage();
            }
            break;
        case 2:
            if (!time_training.value) {
                errors.time_training = "Time training field is mandatory.";
            } else {
                errors.time_training = "";
            }

            if (!train_available_time.value) {
                errors.train_available_time =
                    "Train available time field is mandatory.";
            } else {
                errors.train_available_time = "";
            }

            //Validate that there is minimum a day checked
            if (!validateDaysAvailable()) {
                errors.train_available_days =
                    "You must select at least one day.";
            } else {
                errors.train_available_days = "";
            }

            if (
                errors.time_training == "" &&
                errors.train_available_time == "" &&
                errors.train_available_days == ""
            ) {
                nextPage();
            }
            break;
        case 3:
            if (!wishlist_exercises.value) {
                errors.wishlist_exercises =
                    "Wishlist exercises field is mandatory.";
            } else {
                errors.wishlist_exercises = "";
            }

            if (!banlist_exercises.value) {
                errors.banlist_exercises =
                    "Banlist exercises field is mandatory.";
            } else {
                errors.banlist_exercises = "";
            }

            if (
                errors.wishlist_exercises == "" &&
                errors.banlist_exercises == ""
            ) {
                nextPage();
            }
            break;
        case 4:
            if (!short_term_goals.value) {
                errors.short_term_goals =
                    "Short term goals field is mandatory.";
            } else {
                errors.short_term_goals = "";
            }

            if (!long_term_goals.value) {
                errors.long_term_goals = "Long term goals field is mandatory.";
            } else {
                errors.long_term_goals = "";
            }

            if (errors.short_term_goals == "" && errors.long_term_goals == "") {
                //Send form to api
                sendForm();
            }
            break;
        default:
            break;
    }
}

//TODO: Send form to API
async function sendForm() {
    //Show loading spinner
    loading.value = true;

    try {
        //Call API
        await axiosClient.post("athlete/user-data", {
            user_id: route.query.id,
            date_birth: date_birth.value,
            height: height.value,
            time_training: time_training.value,
            train_available_time: train_available_time.value,
            wishlist_exercises: wishlist_exercises.value,
            banlist_exercises: banlist_exercises.value,
            short_term_goals: short_term_goals.value,
            long_term_goals: long_term_goals.value,
            available_days: train_available_days,
        });
        loading.value = false;
        router.push("/athlete");
    } catch (e) {
        //If there's any error
        loading.value = false;

        console.log(e);
    }
}

/*
Validates that there is a day checked
Returns True when there's no error
False when there's an error
*/
function validateDaysAvailable() {
    for (const [day, value] of Object.entries(train_available_days)) {
        if (value == true) {
            return true;
        }
    }
    return false;
}

function nextPage() {
    if (currentPage.value < totalPages) {
        currentPage.value += 1;
    }
}

function previousPage() {
    currentPage.value -= 1;
}
</script>

<style scoped>
.full-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden; 
}

.bg-form {
    background-image: url(../../assets/img/img-form.jpg);
    background-repeat: no-repeat;
    background-size: cover;
}

.label {
    margin-left: 1%;
}

.form-quest {
    max-width: 50rem;
    width: 100%;
    margin: 0 auto;
    padding: 2rem;
    box-sizing: border-box;
    height: 65rem;
    display: flex;
    flex-direction: column;
}

.form-group {
    min-height: 9rem;
}

fieldset {
    flex: 1;
}

.form-error {
    height: auto;
}
@media (max-width: 768px) {
    .form-quest {
        padding: 1rem;
    }
}

@media (max-width: 576px) {
    .form-quest {
        padding: 0.5rem;
    }
}
</style>

