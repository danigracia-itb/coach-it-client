<template>
    <div class="card mt-5 user-select-none">
        <CalendarHeader
            :current-date="today"
            :selected-date="selectedDate"
            @dateSelected="selectDate"
        />

        <CalendarWeekdays />

        <ol class="days-grid">
            <CalendarDayItem
                v-for="day in days"
                :key="day.date"
                :day="day"
                :is-today="day.date === today"
                :athlete="athlete"
                :isCoach="isCoach"

                :is-restday="isRestDay(day.date)"

                :has-workout="hasWorkout(day.date)"
                :workout="getWorkout(day.date)"
                
                :has-body-weight="hasBodyWeight(day.date)"
                :bodyWeight="getBodyWeight(day.date)"

                :has-trac="hasTrac(day.date)"
                :trac="getTrac(day.date)"
            />
        </ol>
    </div>
</template>

<script>
import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import weekOfYear from "dayjs/plugin/weekOfYear";
import CalendarDayItem from "./CalendarDayItem.vue";
import CalendarHeader from "./CalendarHeader.vue";
import CalendarWeekdays from "./CalendarWeekdays.vue";

dayjs.extend(weekday);
dayjs.extend(weekOfYear);

export default {
    name: "Calendar",

    components: {
        CalendarDayItem,
        CalendarHeader,
        CalendarWeekdays,
    },
    props: {
        athlete: {
            type: Object,
            required: true,
        },
        isCoach: {
            type: Boolean,
            required: true
        },
        calendar: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
            selectedDate: dayjs(),
        };
    },

    computed: {
        days() {
            return [
                ...this.previousMonthDays,
                ...this.currentMonthDays,
                ...this.nextMonthDays,
            ];
        },

        today() {
            return dayjs().format("YYYY-MM-DD");
        },

        month() {
            return Number(this.selectedDate.format("M"));
        },

        year() {
            return Number(this.selectedDate.format("YYYY"));
        },

        numberOfDaysInMonth() {
            return dayjs(this.selectedDate).daysInMonth();
        },

        currentMonthDays() {
            return [...Array(this.numberOfDaysInMonth)].map((day, index) => {
                return {
                    date: dayjs(
                        `${this.year}-${this.month}-${index + 1}`
                    ).format("YYYY-MM-DD"),
                    isCurrentMonth: true,
                };
            });
        },

        previousMonthDays() {
            const firstDayOfTheMonthWeekday = this.getWeekday(
                this.currentMonthDays[0].date
            );
            const previousMonth = dayjs(
                `${this.year}-${this.month}-01`
            ).subtract(1, "month");

            // Cover first day of the month being sunday (firstDayOfTheMonthWeekday === 0)
            const visibleNumberOfDaysFromPreviousMonth =
                firstDayOfTheMonthWeekday ? firstDayOfTheMonthWeekday - 1 : 6;

            const previousMonthLastMondayDayOfMonth = dayjs(
                this.currentMonthDays[0].date
            )
                .subtract(visibleNumberOfDaysFromPreviousMonth, "day")
                .date();

            return [...Array(visibleNumberOfDaysFromPreviousMonth)].map(
                (day, index) => {
                    return {
                        date: dayjs(
                            `${previousMonth.year()}-${
                                previousMonth.month() + 1
                            }-${previousMonthLastMondayDayOfMonth + index}`
                        ).format("YYYY-MM-DD"),
                        isCurrentMonth: false,
                    };
                }
            );
        },

        nextMonthDays() {
            const lastDayOfTheMonthWeekday = this.getWeekday(
                `${this.year}-${this.month}-${this.currentMonthDays.length}`
            );

            const nextMonth = dayjs(`${this.year}-${this.month}-01`).add(
                1,
                "month"
            );

            const visibleNumberOfDaysFromNextMonth = lastDayOfTheMonthWeekday
                ? 7 - lastDayOfTheMonthWeekday
                : lastDayOfTheMonthWeekday;

            return [...Array(visibleNumberOfDaysFromNextMonth)].map(
                (day, index) => {
                    return {
                        date: dayjs(
                            `${nextMonth.year()}-${nextMonth.month() + 1}-${
                                index + 1
                            }`
                        ).format("YYYY-MM-DD"),
                        isCurrentMonth: false,
                    };
                }
            );
        },
    },

    methods: {
        getWeekday(date) {
            return dayjs(date).weekday();
        },

        selectDate(newSelectedDate) {
            this.selectedDate = newSelectedDate;
        },
        isRestDay(date) {
            return this.calendar.restDays.some((day) => day.date === date);
        },
        getWorkout(date) {
            return this.calendar.workouts.find((workout) => workout.date === date);
        },
        getBodyWeight(date) {
            return this.calendar.bodyWeights.find((bodyWeights) => bodyWeights.date === date);
        },
        getTrac(date) {
            return this.calendar.tracs.find((trac) => trac.date === date);
        },
        hasWorkout(date) {
            return this.calendar.workouts.some((workout) => workout.date === date);
        },
        hasBodyWeight(date) {
            return this.calendar.bodyWeights.some((bodyWeights) => bodyWeights.date === date);
        },
        hasTrac(date) {
            return this.calendar.tracs.some((trac) => trac.date === date);
        }
    },
};
</script>

<style scoped>
.day-of-week {
    color: var(--grey-800);
    font-size: 18px;
    background-color: #fff;
    padding-bottom: 5px;
    padding-top: 10px;
}

.day-of-week,
.days-grid {
    border: 0;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
}

.day-of-week > * {
    text-align: right;
    padding-right: 5px;
}

.days-grid {
    height: 100%;
    position: relative;
    grid-column-gap: var(--grid-gap);
    grid-row-gap: var(--grid-gap);
    border-top: solid 1px var(--grey-200);
}
</style>
