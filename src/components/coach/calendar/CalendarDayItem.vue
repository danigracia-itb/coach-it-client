<template>
    <li @contextmenu="onContextMenu($event)" class="calendar-day" :class="{
        'calendar-day--not-current': !day.isCurrentMonth,
        'calendar-day--today': isToday,
    }">
        <span class="fw-bold" :class="isToday ? 'bg-primary text-white' : ''">{{
            label
        }}</span>

        <RouterLink :to="`/coach/athlete/${athlete.id}/workout/create?date=${day.date}`" v-if="day.isCurrentMonth && !hasWorkout"
            class="add-btn btn btn-success">
            <font-awesome-icon icon="fa-solid fa-plus" />
        </RouterLink>

        <RouterLink
            v-if="hasWorkout && !workoutDeleted"
            :to="`/coach/athlete/${athlete.id}/workout/${workout.id}`"
            class="btn btn-primary"
        >
            <font-awesome-icon icon="fa-solid fa-dumbbell" />
            Workout
        </RouterLink>
    </li>
</template>

<script setup>
import { ref, computed, h } from "vue";
import dayjs from "dayjs";
import { RouterLink } from "vue-router";
import ContextMenu from '@imengyu/vue3-context-menu'
import { useRouter } from "vue-router";
const router = useRouter()

const props = defineProps([
    "day",
    "isCurrentMonth",
    "isToday",
    "athlete",
    "hasWorkout",
    "workout",
]);

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
            ...props.hasWorkout ? [{
                label: "Edit",
                icon: h('img', {
                    src: "../../../../public/assets/icons/pen-solid.svg",
                    style: {
                        width: '15',
                        height: '15',
                        zIndex: 100,
                    },
                }),

                divided: true,
                onClick: () => {
                    router.push({ path: `/coach/athlete/${props.athlete.id}/workout/${props.workout.id}` })
                },
            },
            {
                label: "Copy",
                icon: h('img', {
                    src: "../../../../public/assets/icons/copy-solid.svg",
                    style: {
                        width: '15',
                        height: '15',
                        zIndex: 100,
                    },
                }),

                divided: true,
                onClick: () => {
                    copyWorkout(props.workout.id, props.day.date, router)
                },
            },
            {
                label: "Delete",
                icon: h('img', {
                    src: "../../../../public/assets/icons/trash-solid.svg",
                    style: {
                        width: '15',
                        height: '15',
                        zIndex: 100,
                    },
                }),

                onClick: async () => {
                    await axiosClient.delete('workout/' + props.workout.id)
                    router.go(0)
                },
            }] : [{
                label: "Add",
                icon: h('img', {
                    src: "../../../../public/assets/icons/plus-solid.svg",
                    style: {
                        width: '15',
                        height: '15',
                        zIndex: 100,
                    },
                }),
                onClick: () => {
                    router.push({ path: `/coach/athlete/${props.athlete.id}/workout/create?date=${props.day.date}` })
                },
            }]
        ]
    });
}

//add


//view
//edit
//delete

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

.calendar-day>span {
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

.calendar-day--today>span {
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
