<template>
    <li
        class="calendar-day"
        :class="{
            'calendar-day--not-current': !day.isCurrentMonth,
            'calendar-day--today': isToday,
        }"
    >
        <span class="fw-bold" :class="isToday ? 'bg-primary text-white' : ''">{{
            label
        }}</span>

        <button
            v-if="day.isCurrentMonth && !hasWorkout"
            @mouseenter="showMenu"
            @mouseleave="showMenu"
            class="add-btn btn btn-success"
        >
            <font-awesome-icon icon="fa-solid fa-plus" />
            <div
                class="dropdown-menu"
                :class="menuShown ? 'd-block' : 'd-none'"
            >
                <RouterLink
                    :to="`/coach/athlete/${athlete.id}/workout/create?date=${day.date}`"
                    class="text-black text-decoration-none px-2 py-1 d-block"
                    >Add Workout</RouterLink
                >
                <RouterLink
                    :to="`#`"
                    class="text-black text-decoration-none px-2 py-1 d-block"
                    >Mark as Rest Day</RouterLink
                >
            </div>
        </button>

        <RouterLink
            v-if="hasWorkout"
            :to="`/coach/athlete/${athlete.id}/workout/${day.date}`"
            class="btn btn-primary"
        >
            <font-awesome-icon icon="fa-solid fa-dumbbell" />
            Workout
        </RouterLink>
    </li>
</template>

<script setup>
import { ref, computed } from "vue";
import dayjs from "dayjs";
import { RouterLink } from "vue-router";

const props = defineProps([
    "day",
    "isCurrentMonth",
    "isToday",
    "athlete",
    "hasWorkout",
]);
const menuShown = ref(false);

const label = computed(() => {
    return dayjs(props.day.date).format("D");
});

function showMenu() {
    menuShown.value = !menuShown.value;
}
</script>

<style scoped>
.calendar-day {
    position: relative;
    min-height: 100px;
    font-size: 16px;
    background-color: #fff;
    padding: 5px;
    list-style: none;

    border: 1px solid black;

    display: flex;
    justify-content: center;
    align-items: center;
}

.calendar-day > span {
    align-self: flex-start;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 2px;
    width: var(--day-label-size);
    height: var(--day-label-size);
}

.calendar-day--not-current {
    background-color: lightgray;
    color: rgb(59, 59, 59);
}

.calendar-day--today {
    padding-top: 4px;
}

.calendar-day--today > span {
    border-radius: 9999px;
    padding: 0.4rem 1.2rem;
}

.calendar-day:hover .add-btn {
    opacity: 1;
    transition: all ease-in-out 0.4s;
}
.add-btn {
    padding: 0.5rem 1rem;
    opacity: 0;
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
