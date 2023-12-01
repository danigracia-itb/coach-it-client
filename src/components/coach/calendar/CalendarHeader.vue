<template>
    <div class="p-3 bg-primary m-0">
        <h4 class="fw-bold calendar-month-header-selected-month text-center mt-2 text-white">
            {{ selectedMonth }}
        </h4>

        <div class="d-flex justify-content-between mt-2">
            <span @click="selectPrevious" class="btn btn-light">&lt;</span>
            <span @click="selectCurrent" class="btn btn-light">Today</span>
            <span @click="selectNext" class="btn btn-light">&gt;</span>
        </div>
    </div>
</template>

<script>
import dayjs from "dayjs";

export default {
    name: "CalendarModeSelector",

    props: {
        currentDate: {
            type: String,
            required: true,
        },

        selectedDate: {
            type: Object,
            required: true,
        },
    },

    computed: {
        selectedMonth() {
            return this.selectedDate.format("MMMM YYYY");
        },
    },

    methods: {
        selectPrevious() {
            let newSelectedDate = dayjs(this.selectedDate).subtract(1, "month");
            this.$emit("dateSelected", newSelectedDate);
        },

        selectCurrent() {
            let newSelectedDate = dayjs(this.currentDate);
            this.$emit("dateSelected", newSelectedDate);
        },

        selectNext() {
            let newSelectedDate = dayjs(this.selectedDate).add(1, "month");
            this.$emit("dateSelected", newSelectedDate);
        },
    },
};
</script>
