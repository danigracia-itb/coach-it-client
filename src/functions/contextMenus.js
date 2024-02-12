import ContextMenu from "@imengyu/vue3-context-menu";
import { h } from "vue";
import axiosClient from "../config/axios";
import router from '../router';
import useAuthStore from "../stores/useAuthStore";

//helpers
import {
    copyWorkout,
    addBodyWeightPopUp,
    editBodyWeightPopUp,
} from "./alerts";

function restDayMenu(authStore, props, newAvailableDay, newRestDay) {
    if ((props.isRestday || newRestDay.value) && !newAvailableDay.value) {
        return [
            {
                label: "Available Day",
                icon: h("img", {
                    src: "../../../assets/icons/calendar-check-solid.svg",
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
    } else {
        return [
            {
                label: "Rest Day",
                icon: h("img", {
                    src: "../../../assets/icons/calendar-xmark-solid.svg",
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
        ]
    }
}

function workoutMenu(authStore, props, workoutDeleted, newAvailableDay, newRestDay) {
    var children = []

    if (props.hasWorkout && !workoutDeleted.value) {
        children = [
            ...children,
            ...[
                {
                    label: "Edit",
                    icon: h("img", {
                        src: "/assets/icons/pen-solid.svg",
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
                                : `/athlete/workout/${props.workout.id}`,
                        });
                    },
                },
                {
                    label: "Copy",
                    icon: h("img", {
                        src: "/assets/icons/copy-solid.svg",
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
                        src: "/assets/icons/trash-solid.svg",
                        style: {
                            width: "15",
                            height: "15",
                            zIndex: 100,
                        },
                    }),
                    onClick: async () => {
                        workoutDeleted.value = true;
                        await axiosClient.delete(
                            "workout/" + props.workout.id
                        );
                    },
                },
            ]
        ]
        return [{
            label: "Workout",
            icon: h("img", {
                src: "/assets/icons/pen-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,

            children
        }]
    }
    else if (!((props.isRestday || newRestDay.value) && !newAvailableDay.value)) {
        children = [
            ...children,
            {
                label: "Workout",
                icon: h("img", {
                    src: "/assets/icons/plus-solid.svg",
                    style: {
                        width: "15",
                        height: "15",
                        zIndex: 100,
                    },
                }),
                onClick: () => {
                    router.push(
                        authStore.is_coach
                            ? `/coach/athlete/${props.athlete.id}/workout/create?date=${props.day.date}`
                            : `/athlete/workout/create?date=${props.day.date}`
                    );
                },
            },
        ]

        return [{
            label: "Workout",
            icon: h("img", {
                src: "/assets/icons/pen-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,

            children
        }]
    }
    else {
        return []
    }
}

function bodyWeightMenu(authStore, props) {

    var children = []

    if (props.hasBodyWeight) {
        children.push(
            {
                label: "Edit",
                icon: h("img", {
                    src: "/assets/icons/pen-solid.svg",
                    style: {
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
        )


    } else {
        children.push({
            label: "Add",
            icon: h("img", {
                src: "/assets/icons/plus-solid.svg",
                style: {
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
        )
    }

    return [
        {
            label: "Body Weight",
            icon: h("img", {
                src: "/assets/icons/weight-scale-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),
            children
        }
    ]
}

export function calendarContextMenu(e, props, newAvailableDay, newRestDay, workoutDeleted) {
    const authStore = useAuthStore()
    //prevent the browser's default menu
    e.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
        theme: "mac",
        x: e.x,
        y: e.y,
        zIndex: 3,
        items: [
            ...restDayMenu(authStore, props, newAvailableDay, newRestDay),
            ...workoutMenu(authStore, props, workoutDeleted, newAvailableDay, newRestDay),
            ...bodyWeightMenu(authStore, props)
        ],
    });
}