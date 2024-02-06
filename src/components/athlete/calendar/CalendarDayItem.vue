<template>
    <li
        @contextmenu="onContextMenu($event)"
        class="calendar-day"
        :class="{
            'calendar-day--not-current': !day.isCurrentMonth,
            'calendar-day--today': isToday,
            'calendar-day--rest-day': (isRestday || newRestDay) && !newAvailableDay,
        }"
    >
        <span class="fw-bold" :class="isToday ? 'bg-primary text-white' : ''">
            {{ label }}</span
        >

        <p
            v-if="(isRestday || newRestDay) && !newAvailableDay"
            v-tooltip="'Rest day'"
            style="font-size: 2rem"
        >
            <font-awesome-icon icon="fa-solid fa-bed" />
        </p>

        <RouterLink
            v-if="hasWorkout"
            :to="`/athlete/workout/${workout.id}`"
            class="btn btn-primary"
        >
            <font-awesome-icon icon="fa-solid fa-dumbbell" />
            <span class="d-none d-md-inline">Workout</span>
        </RouterLink>
    </li>
</template>

<script setup>
import { computed, h, ref } from "vue";
import dayjs from "dayjs";
import { RouterLink } from "vue-router";
import ContextMenu from "@imengyu/vue3-context-menu";
import axiosClient from "../../../config/axios";

const props = defineProps([
    "day",
    "isCurrentMonth",
    "isToday",
    "isRestday",
    "athlete",
    "hasWorkout",
    "workout",
]);

const newRestDay = ref(false);
const newAvailableDay = ref(false);

const label = computed(() => {
    return dayjs(props.day.date).format("D");
});

function onContextMenu(e) {
    //prevent the browser's default menu
    e.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
        x: e.x,
        y: e.y,
        zIndex: 3,
        items: [
            ...((props.isRestday || newRestDay.value) && !newAvailableDay.value
                ? [
                      {
                          label: "Available Day",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/calendar-check-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          onClick: () => {
                              axiosClient.post("available-day", {
                                  user_id: props.athlete.id,
                                  date: props.day.date,
                              });

                              newRestDay.value = false;
                              newAvailableDay.value = true;
                          },
                      },
                  ]
                : [
                      {
                          label: "Rest Day",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/calendar-xmark-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          onClick: () => {
                              axiosClient.post("rest-day", {
                                  user_id: props.athlete.id,
                                  date: props.day.date,
                              });

                              newRestDay.value = true;
                              newAvailableDay.value = false;
                          },
                      },
                  ]),
        ],
    });
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

.calendar-day--rest-day {
    background-color: rgb(236, 114, 114) !important;
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
