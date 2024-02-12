import ContextMenu from "@imengyu/vue3-context-menu";
import { h } from "vue";
import axiosClient from "../config/axios";
import router from '../router';

import useAuthStore from "../stores/useAuthStore";
import useCoachStore from "../stores/useCoachStore";
import useAthleteStore from "../stores/useAthleteStore";

//helpers
import {
    copyWorkout,
    addBodyWeightPopUp,
    editBodyWeightPopUp,
} from "./alerts";

function restDayMenu(authStore, coachStore, athleteStore, props, newAvailableDay, newRestDay) {
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

function workoutMenu(authStore, coachStore, athleteStore, props, newAvailableDay, newRestDay) {
    var children = []

    if (props.hasWorkout) {
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
                        if(authStore.is_coach) {
                            coachStore.deleteWorkout(props.workout)
                        } else {
                            athleteStore.deleteWorkout(props.workout)
                        }

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
                src: "/assets/icons/dumbbell-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,

            children
        }]
    }
    else if (!((props.isRestday || newRestDay.value) && !newAvailableDay.value)) {
        return [{
            label: "Workout",
            icon: h("img", {
                src: "/assets/icons/plus-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,

            onClick: () => {
                router.push(
                    authStore.is_coach
                        ? `/coach/athlete/${props.athlete.id}/workout/create?date=${props.day.date}`
                        : `/athlete/workout/create?date=${props.day.date}`
                );
            },
        }]
    }
    else {
        return []
    }
}

function tracMenu(authStore, coachStore, athleteStore, props) {
    var children = []

    if (props.hasTrac) {
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
                                ? `/coach/athlete/${props.athlete.id}/trac/${props.trac.id}`
                                : `/athlete/trac/${props.trac.id}`,
                        });
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
                        if(authStore.is_coach) {
                            coachStore.deleteTrac(props.trac)
                        } else {
                            athleteStore.deleteTrac(props.trac)
                        }

                        await axiosClient.delete(
                            "trac/" + props.trac.id
                        );
                    },
                },
            ]
        ]
        return [{
            label: "Trac",
            icon: h("img", {
                src: "/assets/icons/chart-bar-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,
            children
        }]
    }
    else {
        return [{
            label: "Trac",
            icon: h("img", {
                src: "/assets/icons/plus-solid.svg",
                style: {
                    zIndex: 100,
                },
            }),

            divided: true,

            onClick: () => {
                router.push(
                    authStore.is_coach
                        ? `/coach/athlete/${props.athlete.id}/trac/create?date=${props.day.date}`
                        : `/athlete/trac/create?date=${props.day.date}`
                );
            },
        }]
    }
}

function bodyWeightMenu(authStore, coachStore, athleteStore, props) {

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
    } else {
       return [{
            label: "Body Weight",
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
        }]
    }
}

export function calendarContextMenu(e, props, newAvailableDay, newRestDay) {
    const authStore = useAuthStore()
    const coachStore = useCoachStore()
    const athleteStore = useAthleteStore()

    //prevent the browser's default menu
    e.preventDefault();
    //show your menu
    ContextMenu.showContextMenu({
        theme: "mac",
        x: e.x,
        y: e.y,
        zIndex: 3,
        items: [
            ...restDayMenu(authStore, coachStore, athleteStore, props, newAvailableDay, newRestDay),
            ...workoutMenu(authStore, coachStore, athleteStore, props, newAvailableDay, newRestDay),
            ...tracMenu(authStore, coachStore, athleteStore, props),
            ...bodyWeightMenu(authStore, coachStore, athleteStore, props)
        ],
    });
}