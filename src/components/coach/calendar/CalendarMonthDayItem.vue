<template>
    <li
        class="calendar-day"
        :class="{
            'calendar-day--not-current': !day.isCurrentMonth,
            'calendar-day--today': isToday,
        }"
    >
        <span class="fw-bold" :class="isToday ? 'bg-primary text-white' : ''">{{ label }}</span>

        <RouterLink v-if="day.isCurrentMonth && !hasWorkout" :to="`/coach/athlete/${athlete.id}/workout/create?date=${day.date}`" class="add-btn btn btn-success">
            <font-awesome-icon icon="fa-solid fa-plus" />
        </RouterLink>

        <RouterLink v-if="hasWorkout" :to="`/coach/athlete/${athlete.id}/workout/${day.date}`" class="btn btn-primary">
            <font-awesome-icon icon="fa-solid fa-dumbbell" />
            Workout
        </RouterLink>
    </li>
</template>

<script>
import dayjs from "dayjs";
import { RouterLink } from "vue-router";

export default {
    name: "CalendarMonthDayItem",
    components: {
        RouterLink,
    },

    props: {
        day: {
            type: Object,
            required: true,
        },

        isCurrentMonth: {
            type: Boolean,
            default: false,
        },

        isToday: {
            type: Boolean,
            default: false,
        },
        athlete: {
            type: Object,
            required: true,
        },
        hasWorkout: {
            type: Boolean,
            required: true
        }
    },

    computed: {
        label() {
            return dayjs(this.day.date).format("D");
        },
    },
};
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
</style>
