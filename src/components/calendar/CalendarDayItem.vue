<template>
    <li
        @contextmenu="handleCalendarContextMenu($event)"
        class="calendar-day"
        :class="{
            'calendar-day--not-current': !day.isCurrentMonth,
            'calendar-day--today bg-dark': isToday,
            'calendar-day--rest-day':
                (isRestday || newRestDay) && !newAvailableDay,
        }"
        v-tooltip="
            (isRestday || newRestDay) && !newAvailableDay ? 'Rest day' : ''
        "
    >
        <span class="fw-bold" :class="isToday ? 'text-white' : ''">{{
            label
        }}</span>

        <button
            @click="handleCalendarContextMenu($event)"
            v-if="day.isCurrentMonth"
            class="add-btn btn btn-success"
        >
            <font-awesome-icon icon="fa-solid fa-plus" />
        </button>

        <!-- content -->
        <div
            class="d-flex flex-column gap-1 justify-content-center align-items-center pt-5 pt-md-0"
        >
            <!-- <p
                v-if="(isRestday || newRestDay) && !newAvailableDay"
                
                style="font-size: 2rem"
                class="align-self-flex-start"
                id="restday"
            >
                <font-awesome-icon icon="fa-solid fa-bed" />
            </p> -->

            <RouterLink
                v-if="hasWorkout && !workoutDeleted"
                :to="
                    authStore.is_coach
                        ? `/coach/athlete/${athlete.id}/workout/${workout.id}`
                        : `/athlete/workout/${workout.id}`
                "
                class="btn btn-primary d-flex gap-1 align-items-center"
            >
                <font-awesome-icon icon="fa-solid fa-dumbbell" />
                <span class="d-none d-md-inline">Workout</span>
            </RouterLink>

            <div
                v-if="hasBodyWeight"
                class="btn btn-success d-flex gap-1 align-items-center"
            >
                <font-awesome-icon icon="fa-solid fa-weight-scale" />
                <span class="d-none d-md-inline">{{ bodyWeight.value }}kg</span>
            </div>
        </div>
    </li>
</template>

<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { RouterLink, useRouter } from "vue-router";

import { calendarContextMenu } from "../../functions/contextMenus";

//stores
import useAuthStore from "../../stores/useAuthStore";
const authStore = useAuthStore();

const router = useRouter();

const props = defineProps([
    "isCoach",
    "day",
    "isCurrentMonth",
    "isToday",
    "isRestday",
    "athlete",
    "hasWorkout",
    "workout",
    "hasBodyWeight",
    "bodyWeight",
]);

const newRestDay = ref(false);
const newAvailableDay = ref(false);

const label = computed(() => {
    return dayjs(props.day.date).format("D");
});

const workoutDeleted = ref(false);

function handleCalendarContextMenu(e) {
    calendarContextMenu(e, props, newAvailableDay, newRestDay, workoutDeleted)
}

</script>

<style scoped>
.calendar-day {
    position: relative;
    min-height: 110px;
    font-size: 16px;
    background-color: #fff;
    padding: 5px;
    list-style: none;

    border: 1px solid black;

    display: flex;
    justify-content: center;
    align-items: center;

    padding: 1rem 0.25rem;
}

.calendar-day > span {
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;

    right: 1rem;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.2rem;
}

@media (min-width: 768px) {
    .calendar-day > span {
    width: var(--day-label-size);
    height: var(--day-label-size);
    }

}

.add-btn {
    opacity: 0;
    transition: all ease-in-out 0.4s;

    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 1rem;
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.5rem;
    font-weight: bold;
}

.calendar-day--not-current {
    background-color: lightgray;
    color: rgb(59, 59, 59);
}

.calendar-day--rest-day {
    background-color: rgb(236, 114, 114) !important;
}

.calendar-day:hover .add-btn {
    opacity: 1;
    transition: all ease-in-out 0.4s;
}



.dropdown-menu {
    width: 14rem;
    border: 1px solid lightgray;
    background-color: white;
    position: absolute;
    font-size: 1.4rem;
    padding: 0.5rem 0;
}

.dropdown-menu a {
    border-bottom: 1px solid lightgray;
}

.dropdown-menu a:last-of-type {
    border: none;
}

.dropdown-menu a:hover {
    background-color: rgb(199, 199, 199);
}
</style>
