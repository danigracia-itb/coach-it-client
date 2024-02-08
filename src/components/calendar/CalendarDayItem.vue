<template>
    <li
        @contextmenu="onContextMenu($event)"
        class="calendar-day"
        :class="{
            'calendar-day--not-current': !day.isCurrentMonth,
            'calendar-day--today': isToday,
            'calendar-day--rest-day':
                (isRestday || newRestDay) && !newAvailableDay,
        }"
        v-tooltip="
            (isRestday || newRestDay) && !newAvailableDay ? 'Rest day' : ''
        "
    >
        <span class="fw-bold" :class="isToday ? 'bg-primary text-white' : ''">{{
            label
        }}</span>

        <!-- content -->
        <div
            class="d-flex flex-column gap-1 justify-content-center align-items-center pt-5"
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

            <button
                @click="onContextMenu($event)"
                v-if="day.isCurrentMonth"
                class="add-btn btn btn-success"
            >
                <font-awesome-icon icon="fa-solid fa-plus" />
            </button>
        </div>
    </li>
</template>

<script setup>
import { ref, computed, h } from "vue";
import dayjs from "dayjs";
import { RouterLink } from "vue-router";
import ContextMenu from "@imengyu/vue3-context-menu";
import { useRouter } from "vue-router";
import axiosClient from "../../config/axios";

//helpers
import {
    copyWorkout,
    addBodyWeightPopUp,
    editBodyWeightPopUp,
} from "../../functions/alerts";

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
                              src: "../../../public/assets/icons/calendar-check-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          divided: true,
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
                              src: "../../../public/assets/icons/calendar-xmark-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          divided: true,
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
            ...(props.hasWorkout
                ? [
                      {
                          label: "Edit",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/pen-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),

                          divided: true,
                          onClick: () => {
                              router.push({
                                  path: authStore.is_coach
                                      ? `/coach/athlete/${props.athlete.id}/workout/${props.workout.id}`
                                      : `/athlete/workout/${workout.id}`,
                              });
                          },
                      },
                      {
                          label: "Copy",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/copy-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),

                          divided: true,
                          onClick: () => {
                              copyWorkout(
                                  props.workout.id,
                                  props.day.date,
                                  router
                              );
                          },
                      },
                      {
                          label: "Delete",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/trash-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          divided: true,
                          onClick: async () => {
                              workoutDeleted.value = true;
                              await axiosClient.delete(
                                  "workout/" + props.workout.id
                              );
                          },
                      },
                  ]
                : [
                      ...((props.isRestday || newRestDay.value) &&
                      !newAvailableDay.value
                          ? []
                          : [
                                {
                                    label: "Workout",
                                    icon: h("img", {
                                        src: "../../../../public/assets/icons/plus-solid.svg",
                                        style: {
                                            width: "15",
                                            height: "15",
                                            zIndex: 100,
                                        },
                                    }),
                                    divided: true,
                                    onClick: () => {
                                        router.push(
                                            authStore.is_coach
                                                ? `/coach/athlete/${props.athlete.id}/workout/create?date=${props.day.date}`
                                                : `creatathlete`
                                        );
                                    },
                                },
                            ]),
                  ]),

            ...(props.hasBodyWeight
                ? [
                      {
                          label: "Body Weight",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/pen-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          onClick: () => {
                              editBodyWeightPopUp(
                                  props.bodyWeight.value,
                                  props.bodyWeight.id,
                                  props.isCoach
                              );
                          },
                      },
                  ]
                : [
                      {
                          label: "Body Weight",
                          icon: h("img", {
                              src: "../../../../public/assets/icons/plus-solid.svg",
                              style: {
                                  width: "15",
                                  height: "15",
                                  zIndex: 100,
                              },
                          }),
                          onClick: () => {
                              addBodyWeightPopUp(
                                  props.day.date,
                                  props.athlete.id,
                                  props.isCoach
                              );
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
    width: var(--day-label-size);
    height: var(--day-label-size);
}

.calendar-day--not-current {
    background-color: lightgray;
    color: rgb(59, 59, 59);
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
